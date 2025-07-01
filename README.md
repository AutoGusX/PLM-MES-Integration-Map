# PLM-MES Integration Map

An interactive visualization tool for exploring integration scenarios between Product Lifecycle Management (PLM) and Manufacturing Execution System (MES) platforms. **Enhanced with real-time data flow animations and Autodesk branding.**

## Features

- **🎨 Autodesk Branded**: Professional interface featuring the official Autodesk logo
- **⚡ Live Data Flow Animation**: Electron-like animations show real-time data movement between systems
- **📊 Interactive Workflow Visualization**: Click on workflow titles to highlight entire integration scenarios
- **🔍 Record-Level Exploration**: Click individual records to see their specific integration paths
- **🔄 Always-Visible Integration Paths**: Integration arrows are always present, becoming animated when selected
- **Three Key Integration Scenarios**:
  - **BOM Transfer**: Automated transfer of BOMs and Items from PLM to MES upon ECO approval
  - **Automated CAPA**: Automatic creation of Corrective Actions in PLM when waste is detected in MES
  - **ECO Disposition Cost**: Real-time cost analysis by pulling inventory data from MES to PLM

## What's New in This Version

### ✨ Enhanced Visual Experience
- **Autodesk Logo Integration**: Professional branding in the header
- **Animated Data Flow**: Electron-style dots move along integration paths when workflows are active
- **Always-Visible Paths**: Integration arrows are now constantly visible (subtle opacity) with full animation on selection
- **Enhanced Glowing Effects**: Active electrons have dynamic glow animations

### 🔬 Animation Details
- Multiple electrons per path with staggered timing
- Variable speed animations (2s-2.5s duration) for realistic data flow
- Glowing particle effects that pulse and animate
- Smooth transitions between active and inactive states

## Workflows Explained

### 1. BOM Transfer (Blue) 🔵
```
ECO (PLM) → BOM (PLM) → Items (PLM) → [Integration] → BOM (MES) + Items (MES)
```
When an Engineering Change Order is approved in PLM, the associated Bill of Materials and Items are automatically transferred to MES for manufacturing execution. **Watch the data packets flow from PLM to MES!**

### 2. Automated CAPA (Green) 🟢
```
Production Event (MES) → Waste Detection → [Integration] → CAPA (PLM)
```
When waste is logged on a Production Event in MES and exceeds thresholds, a Corrective Action (CAPA) is automatically spawned in PLM. **See the reverse data flow from MES to PLM!**

### 3. ECO Disposition Cost (Orange) 🟠
```
ECO Review (PLM) ↔ [Integration] ↔ Inventory & Cost Data (MES)
```
When an ECO enters Review status in PLM, the system pulls current inventory and cost data from MES to calculate disposition costs. **Observe the bidirectional data exchange!**

## Usage

1. **Explore Workflows**: Click on the colored workflow buttons at the top to highlight entire integration scenarios and activate electron animations
2. **Examine Records**: Click on individual record cards to see their specific integration connections with data flow
3. **Watch the Animation**: Observe electron-like data packets moving along the integration paths in real-time
4. **View Details**: The detail panel at the bottom provides comprehensive information about selected workflows or records
5. **Clear Selection**: Click on empty space to reset the view and stop animations

## GitHub Pages Deployment

This project is designed to work seamlessly with GitHub Pages. Simply:

1. Upload all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as the source
4. Access your interactive map at `https://yourusername.github.io/repository-name`

**Note**: The Autodesk logo is loaded from Autodesk's official CDN and will display correctly when hosted online.

## File Structure

```
├── index.html      # Main HTML structure with SVG animations
├── styles.css      # Enhanced styling with electron animations
├── script.js       # Interactive functionality with animation control
└── README.md       # This documentation
```

## Technologies Used

- **HTML5**: Semantic structure and advanced SVG graphics with animations
- **CSS3**: Modern styling with gradients, keyframe animations, and responsive design
- **Vanilla JavaScript**: Interactive functionality without external dependencies
- **SVG Animations**: Scalable vector graphics with `animateMotion` for electron effects
- **CSS Animations**: Smooth transitions and glowing effects

## Animation Technical Details

- **SVG `animateMotion`**: Moves electron dots along curved paths
- **CSS Keyframes**: Creates pulsing glow effects for active electrons
- **Staggered Timing**: Multiple electrons with different start times and durations
- **Dynamic Opacity**: Smooth fade-in/out transitions for workflow activation

## Browser Compatibility

This application works in all modern browsers including:
- Chrome 60+ (full animation support)
- Firefox 55+ (full animation support)
- Safari 12+ (full animation support)
- Edge 79+ (full animation support)

## Customization

The integration scenarios and animations can be easily modified by editing the `workflows` and `recordDetails` objects in `script.js`. Each workflow includes:

- Records involved in the integration
- Integration paths between systems
- Process flow descriptions
- Color themes
- Animation timing parameters

## Performance Notes

- Animations are optimized for 60fps performance
- Electron particles use hardware acceleration where available
- Smooth degradation on lower-performance devices

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions about PLM-MES integration scenarios, please open an issue in the repository. 