# Layouts Directory Structure

This directory contains all layout-related components organized for scalability, responsiveness, and maintainability.

## Directory Structure

```
layouts/
├── components/          # Specific layout implementations
│   ├── DashboardLayout.jsx
│   ├── WidgetsSection.jsx
│   └── ContentSection.jsx
├── primitives/          # Reusable layout primitives
│   ├── Container.jsx       # Consistent spacing and max-width
│   ├── Grid.jsx           # Responsive grid layouts
│   └── Stack.jsx          # Flex-based vertical/horizontal layouts
├── hooks/              # Layout-related hooks
│   └── useLayout.js       # Responsive behavior and utilities
├── config/             # Layout configurations
│   └── layoutConfig.js    # Breakpoints, spacing, constants
├── index.js           # Main exports file
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
import { 
  DashboardLayout,
  Container,
  Grid,
  Stack,
  useLayout 
} from './layouts/index.js';
```

## Layout Components (All Functionality Preserved)

### 1. **DashboardLayout**
- ✅ Three-row layout structure preserved
- ✅ Props passing to OverviewHeader maintained
- ✅ Responsive behavior enhanced
- ✅ All visual styling intact

```javascript
<DashboardLayout 
  selectedRole={selectedRole}
  selectedLocation={selectedLocation}
  selectedOffice={selectedOffice}
/>
```

### 2. **WidgetsSection**
- ✅ Widget grid layout preserved
- ✅ Shake animations maintained
- ✅ Tooltip functionality intact
- ✅ Plus icon positioning preserved
- ✅ Enhanced responsive grid behavior

### 3. **ContentSection**
- ✅ Two-column content grid preserved
- ✅ BlankCard integration maintained
- ✅ Flex-grow behavior intact
- ✅ Enhanced responsive layout

## Layout Primitives

### Container
Provides consistent spacing and max-width:
```javascript
<Container maxWidth="1000px" padding="lg" center animate>
  {children}
</Container>
```

**Features:**
- Responsive padding based on screen size
- Configurable max-width and centering
- Optional animations
- Background and styling support

### Grid
Responsive grid layouts with auto-adaptation:
```javascript
<Grid columns={4} gap="md" minItemWidth="200px">
  {items.map(item => <GridItem key={item.id}>{item}</GridItem>)}
</Grid>
```

**Features:**
- Responsive column adaptation (4 → 2 → 1)
- Auto-fit with minimum item width
- Consistent gap spacing
- Animation support

### Stack (VStack, HStack)
Flex-based layouts for consistent spacing:
```javascript
<VStack gap="md" align="center">
  <HStack gap="sm" justify="space-between">
    {children}
  </HStack>
</VStack>
```

**Features:**
- Vertical and horizontal stacking
- Consistent gap spacing
- Flexible alignment and justification
- Wrap support

## Layout Hooks

### useLayout
Comprehensive responsive layout utilities:
```javascript
const { 
  breakpoints, 
  getSpacing, 
  getGridColumns,
  getResponsiveValue 
} = useLayout();
```

**Features:**
- Real-time responsive breakpoint detection
- Responsive value calculation
- Spacing utilities
- Grid column adaptation

### useLayoutAnimation
Consistent animation patterns:
```javascript
const animation = useLayoutAnimation(0.2);
// Returns: { initial, animate, transition }
```

## Configuration System

### Responsive Breakpoints
```javascript
BREAKPOINTS = {
  mobile: 640,
  tablet: 1024, 
  desktop: 1440,
  large: 1920
}
```

### Spacing Scale
```javascript
SPACING = {
  xs: { mobile: '4px', tablet: '6px', desktop: '8px' },
  sm: { mobile: '8px', tablet: '12px', desktop: '16px' },
  md: { mobile: '16px', tablet: '20px', desktop: '24px' },
  lg: { mobile: '24px', tablet: '32px', desktop: '48px' },
  xl: { mobile: '32px', tablet: '48px', desktop: '64px' }
}
```

### Section Configurations
Pre-configured settings for common layout sections:
```javascript
SECTION_CONFIGS = {
  widgets: {
    padding: 'lg',
    maxWidth: '1000px',
    gridColumns: { mobile: 1, tablet: 2, desktop: 4 }
  },
  content: {
    padding: 'lg',
    gridColumns: { mobile: 1, desktop: 2 },
    flex: 1
  }
}
```

## Key Benefits

### ✅ **All Original Functionality Preserved**
- Layout structure and behavior unchanged
- Animation timing and effects maintained
- Widget interactions and tooltips intact
- Content grid and spacing preserved

### ✅ **Enhanced Responsive Design**
- Mobile-first responsive grid adaptation
- Consistent spacing across all screen sizes
- Intelligent column collapsing
- Touch-friendly mobile interactions

### ✅ **Improved Architecture**
- Reusable layout primitives
- Consistent spacing system
- Centralized responsive logic
- Better code organization

### ✅ **Developer Experience**
- Declarative layout composition
- Consistent API across components
- Easy responsive customization
- Better debugging and maintenance

## Responsive Behavior

### Grid Adaptations
- **Desktop (4 columns)**: `[1] [2] [3] [4]`
- **Tablet (2 columns)**: `[1] [2]` / `[3] [4]`
- **Mobile (1 column)**: `[1]` / `[2]` / `[3]` / `[4]`

### Spacing Adaptations
- **Desktop**: Generous spacing for large screens
- **Tablet**: Medium spacing for touch interfaces
- **Mobile**: Compact spacing for small screens

### Animation Adaptations
- Consistent timing across all screen sizes
- Optimized for performance on mobile devices
- Reduced motion support (future enhancement)

## Integration with Existing Components

The layout system seamlessly integrates with existing components:
- **Widgets**: Enhanced grid responsiveness
- **Metrics**: Consistent spacing and alignment
- **Dropdowns**: Proper z-index management
- **Selectors**: Responsive positioning

All existing functionality works exactly as before, just with better responsive behavior and more maintainable code structure! 