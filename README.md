# PLM-MES Integration Map

An interactive visualization tool for exploring integration scenarios between Product Lifecycle Management (PLM) and Manufacturing Execution System (MES) platforms.

## Features

- **Interactive Workflow Visualization**: Click on workflow titles to highlight entire integration scenarios
- **Record-Level Exploration**: Click individual records to see their specific integration paths
- **Three Key Integration Scenarios**:
  - **BOM Transfer**: Automated transfer of BOMs and Items from PLM to MES upon ECO approval
  - **Automated CAPA**: Automatic creation of Corrective Actions in PLM when waste is detected in MES
  - **ECO Disposition Cost**: Real-time cost analysis by pulling inventory data from MES to PLM

## Workflows Explained

### 1. BOM Transfer (Blue)
```
ECO (PLM) → BOM (PLM) → Items (PLM) → [Integration] → BOM (MES) + Items (MES)
```
When an Engineering Change Order is approved in PLM, the associated Bill of Materials and Items are automatically transferred to MES for manufacturing execution.

### 2. Automated CAPA (Green)
```
Production Event (MES) → Waste Detection → [Integration] → CAPA (PLM)
```
When waste is logged on a Production Event in MES and exceeds thresholds, a Corrective Action (CAPA) is automatically spawned in PLM.

### 3. ECO Disposition Cost (Orange)
```
ECO Review (PLM) ↔ [Integration] ↔ Inventory & Cost Data (MES)
```
When an ECO enters Review status in PLM, the system pulls current inventory and cost data from MES to calculate disposition costs.

## Usage

1. **Explore Workflows**: Click on the colored workflow buttons at the top to highlight entire integration scenarios
2. **Examine Records**: Click on individual record cards to see their specific integration connections
3. **View Details**: The detail panel at the bottom provides comprehensive information about selected workflows or records
4. **Clear Selection**: Click on empty space to reset the view

## GitHub Pages Deployment

This project is designed to work seamlessly with GitHub Pages. Simply:

1. Upload all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as the source
4. Access your interactive map at `https://yourusername.github.io/repository-name`

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Interactive functionality
└── README.md       # This documentation
```

## Technologies Used

- **HTML5**: Semantic structure and SVG graphics
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Interactive functionality without external dependencies
- **SVG**: Scalable vector graphics for integration path visualization

## Browser Compatibility

This application works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

The integration scenarios can be easily modified by editing the `workflows` and `recordDetails` objects in `script.js`. Each workflow includes:

- Records involved in the integration
- Integration paths between systems
- Process flow descriptions
- Color themes

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions about PLM-MES integration scenarios, please open an issue in the repository. 