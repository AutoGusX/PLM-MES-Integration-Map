// Workflow definitions with records and integration paths
const workflows = {
    'bom-transfer': {
        name: 'BOM Transfer',
        description: 'When an ECO is approved in PLM, the BOM and Items are automatically transferred to MES for manufacturing execution.',
        color: '#2196F3',
        records: ['eco', 'bom-plm', 'items-plm', 'bom-mes', 'items-mes'],
        paths: [
            { from: 'eco', to: 'bom-plm', description: 'ECO manages BOMs' },
            { from: 'bom-plm', to: 'items-plm', description: 'BOMs contain Items' },
            { from: 'bom-plm', to: 'bom-mes', description: 'BOM transfer to MES' },
            { from: 'items-plm', to: 'items-mes', description: 'Items transfer to MES' }
        ],
        process: [
            'ECO is created in PLM',
            'BOM is associated with ECO',
            'Items are defined in BOM',
            'ECO is approved',
            'BOM and Items are released to MES'
        ]
    },
    'automated-capa': {
        name: 'Automated CAPA',
        description: 'When waste is logged on a Production Event in MES, a CAPA is automatically created in PLM for corrective action.',
        color: '#4CAF50',
        records: ['production-event', 'capa'],
        paths: [
            { from: 'production-event', to: 'capa', description: 'Waste triggers CAPA creation' }
        ],
        process: [
            'Production Event occurs in MES',
            'Waste is logged on the event',
            'System detects waste threshold exceeded',
            'CAPA is automatically spawned in PLM',
            'Corrective action workflow begins'
        ]
    },
    'eco-disposition': {
        name: 'ECO Disposition Cost',
        description: 'When an ECO enters Review status in PLM, inventory and cost data is pulled from MES to calculate disposition costs.',
        color: '#FF9800',
        records: ['eco-review', 'inventory-cost'],
        paths: [
            { from: 'eco-review', to: 'inventory-cost', description: 'Request inventory data' },
            { from: 'inventory-cost', to: 'eco-review', description: 'Return cost calculation' }
        ],
        process: [
            'ECO is set to Review status in PLM',
            'System queries MES for affected item inventory',
            'Current costs are retrieved from MES',
            'Disposition cost is calculated',
            'Cost data is displayed in PLM ECO'
        ]
    }
};

// Record details
const recordDetails = {
    'eco': {
        title: 'Engineering Change Order (ECO)',
        system: 'PLM',
        description: 'Manages engineering changes to products, including BOM modifications and approvals.',
        workflows: ['bom-transfer', 'eco-disposition']
    },
    'bom-plm': {
        title: 'Bill of Materials (PLM)',
        system: 'PLM',
        description: 'Product structure definition containing all components and their relationships.',
        workflows: ['bom-transfer']
    },
    'items-plm': {
        title: 'Items (PLM)',
        system: 'PLM',
        description: 'Product components with specifications, properties, and design data.',
        workflows: ['bom-transfer']
    },
    'bom-mes': {
        title: 'Manufacturing BOM (MES)',
        system: 'MES',
        description: 'Production-ready BOM with manufacturing instructions and routing.',
        workflows: ['bom-transfer']
    },
    'items-mes': {
        title: 'Manufacturing Items (MES)',
        system: 'MES',
        description: 'Items with manufacturing data, inventory levels, and production parameters.',
        workflows: ['bom-transfer']
    },
    'production-event': {
        title: 'Production Event',
        system: 'MES',
        description: 'Manufacturing activity record including waste tracking and quality data.',
        workflows: ['automated-capa']
    },
    'capa': {
        title: 'Corrective Action (CAPA)',
        system: 'PLM',
        description: 'Quality management process for addressing production issues and waste.',
        workflows: ['automated-capa']
    },
    'eco-review': {
        title: 'ECO Review',
        system: 'PLM',
        description: 'ECO in review status requiring cost analysis before approval.',
        workflows: ['eco-disposition']
    },
    'inventory-cost': {
        title: 'Inventory & Cost Data',
        system: 'MES',
        description: 'Real-time inventory quantities and current cost information.',
        workflows: ['eco-disposition']
    }
};

// Global state
let currentWorkflow = null;
let currentRecord = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
    updateDetailPanel();
});

function initializeEventHandlers() {
    // Workflow button handlers
    document.querySelectorAll('.workflow-button').forEach(button => {
        button.addEventListener('click', function() {
            const workflow = this.getAttribute('data-workflow');
            toggleWorkflow(workflow);
        });
    });

    // Record click handlers
    document.querySelectorAll('.record').forEach(record => {
        record.addEventListener('click', function() {
            const recordId = this.getAttribute('data-record');
            const workflow = this.getAttribute('data-workflow');
            selectRecord(recordId, workflow);
        });
    });

    // Clear selection when clicking empty areas
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.record') && !e.target.closest('.workflow-button')) {
            clearSelection();
        }
    });
}

function toggleWorkflow(workflowId) {
    if (currentWorkflow === workflowId) {
        // Deselect current workflow
        clearSelection();
    } else {
        // Select new workflow
        selectWorkflow(workflowId);
    }
}

function selectWorkflow(workflowId) {
    clearSelection();
    currentWorkflow = workflowId;
    
    const workflow = workflows[workflowId];
    if (!workflow) return;

    // Add active class to workflow button
    document.querySelector(`[data-workflow="${workflowId}"]`).classList.add('active');
    
    // Add workflow-active class to container
    document.querySelector('.integration-map').classList.add('workflow-active');
    
    // Activate workflow records
    workflow.records.forEach(recordId => {
        const recordElement = document.querySelector(`[data-record="${recordId}"]`);
        if (recordElement) {
            recordElement.classList.add('active');
        }
    });
    
    // Activate workflow paths
    document.querySelectorAll(`.integration-path[data-workflow="${workflowId}"]`).forEach(path => {
        path.classList.add('active');
        // Add animation with delay
        setTimeout(() => {
            path.classList.add('animate-in');
        }, 100);
    });
    
    // Activate electrons for this workflow
    document.querySelectorAll(`.electron.${workflowId}`).forEach(electron => {
        electron.classList.add('active');
    });
    
    updateDetailPanel(workflow);
}

function selectRecord(recordId, workflowId) {
    clearSelection();
    currentRecord = recordId;
    currentWorkflow = workflowId;
    
    const record = recordDetails[recordId];
    const workflow = workflows[workflowId];
    
    if (!record || !workflow) return;

    // Highlight the selected record
    const recordElement = document.querySelector(`[data-record="${recordId}"]`);
    if (recordElement) {
        recordElement.classList.add('active', 'highlight');
    }
    
    // Find and highlight integration paths involving this record
    const relatedPaths = workflow.paths.filter(path => 
        path.from === recordId || path.to === recordId
    );
    
    relatedPaths.forEach(pathDef => {
        // Highlight related records
        const fromElement = document.querySelector(`[data-record="${pathDef.from}"]`);
        const toElement = document.querySelector(`[data-record="${pathDef.to}"]`);
        
        if (fromElement && fromElement !== recordElement) {
            fromElement.classList.add('active');
        }
        if (toElement && toElement !== recordElement) {
            toElement.classList.add('active');
        }
    });
    
    // Activate the integration paths
    document.querySelectorAll(`.integration-path[data-workflow="${workflowId}"]`).forEach(path => {
        path.classList.add('active');
    });
    
    // Activate electrons for this workflow
    document.querySelectorAll(`.electron.${workflowId}`).forEach(electron => {
        electron.classList.add('active');
    });
    
    updateDetailPanel(workflow, record, relatedPaths);
}

function clearSelection() {
    currentWorkflow = null;
    currentRecord = null;
    
    // Remove all active states
    document.querySelectorAll('.workflow-button, .record, .integration-path, .electron').forEach(element => {
        element.classList.remove('active', 'highlight', 'animate-in');
    });
    
    // Remove workflow-active class
    document.querySelector('.integration-map').classList.remove('workflow-active');
    
    updateDetailPanel();
}

function updateDetailPanel(workflow, record, relatedPaths) {
    const panel = document.getElementById('detail-panel');
    
    if (record) {
        // Show record details
        panel.innerHTML = `
            <h3>${record.title}</h3>
            <div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
                <span style="background: ${workflow.color}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">
                    ${record.system} System
                </span>
                <span style="background: white; color: #666; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; border: 1px solid #ddd;">
                    ${workflow.name}
                </span>
            </div>
            <p style="margin-bottom: 20px; font-size: 1.1rem;">${record.description}</p>
            ${relatedPaths && relatedPaths.length > 0 ? `
                <div style="text-align: left; background: white; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                    <h4 style="margin-bottom: 15px; color: ${workflow.color};">Integration Connections:</h4>
                    ${relatedPaths.map(path => `
                        <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid ${workflow.color}; border: 1px solid #eee;">
                            <strong>${recordDetails[path.from]?.title || path.from}</strong> → 
                            <strong>${recordDetails[path.to]?.title || path.to}</strong>
                            <br><small style="color: #666;">${path.description}</small>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
    } else if (workflow) {
        // Show workflow details
        panel.innerHTML = `
            <h3 style="color: ${workflow.color};">${workflow.name}</h3>
            <p style="margin-bottom: 25px; font-size: 1.1rem;">${workflow.description}</p>
            <div style="text-align: left; background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #ddd;">
                <h4 style="margin-bottom: 15px; color: ${workflow.color};">Process Flow:</h4>
                <ol style="padding-left: 20px;">
                    ${workflow.process.map(step => `<li style="margin-bottom: 8px; color: #555;">${step}</li>`).join('')}
                </ol>
            </div>
            <div style="text-align: left; background: white; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                <h4 style="margin-bottom: 15px; color: ${workflow.color};">Involved Records:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${workflow.records.map(recordId => {
                        const rec = recordDetails[recordId];
                        return rec ? `
                            <span style="background: ${workflow.color}; color: white; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem;">
                                ${rec.title}
                            </span>
                        ` : '';
                    }).join('')}
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: rgba(${workflow.color.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1); border-radius: 10px; border-left: 4px solid ${workflow.color};">
                <p style="color: #555; font-style: italic; margin: 0;">
                    <strong>💫 Integration in Action:</strong> Watch the animated data flow as information travels between PLM and MES systems in real-time.
                </p>
            </div>
        `;
    } else {
        // Show default state
        panel.innerHTML = `
            <h3>PLM-MES Integration Explorer</h3>
            <p style="margin-bottom: 25px;">Click on the colored workflow buttons above or individual records to explore the integration scenarios and watch data flow animations.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; text-align: left;">
                ${Object.entries(workflows).map(([id, workflow]) => `
                    <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid ${workflow.color}; border: 1px solid #ddd;">
                        <h4 style="color: ${workflow.color}; margin-bottom: 10px;">${workflow.name}</h4>
                        <p style="font-size: 0.95rem; color: #666;">${workflow.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Add smooth scrolling and enhanced interactions
function addEnhancedInteractions() {
    // Add hover effects for better UX
    document.querySelectorAll('.record').forEach(record => {
        record.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(3px)';
                this.style.opacity = '0.8';
            }
        });
        
        record.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.opacity = '';
            }
        });
    });
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', addEnhancedInteractions); 