# Widgets Directory Structure

This directory contains all widget-related components organized for scalability and maintainability.

## Directory Structure

```
widgets/
├── cards/              # Widget card containers
│   └── WidgetCard.jsx  # Main widget card component
├── types/              # Specific widget implementations
│   ├── ChartWidget.jsx # Chart/graph widgets
│   ├── MetricWidget.jsx # KPI/metric display widgets
│   └── [future widgets...]
├── config/             # Widget configurations
│   └── widgetConfig.js # Widget type definitions and defaults
├── index.js           # Main exports file
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
import { WidgetCard, DEFAULT_WIDGETS } from './widgets/index.js';
```

### Adding New Widget Types

1. **Create the widget component** in `types/`:
```javascript
// types/MyWidget.jsx
export default function MyWidget({ title, data }) {
  return <div>{/* widget content */}</div>;
}
```

2. **Export it** in `index.js`:
```javascript
export { default as MyWidget } from './types/MyWidget.jsx';
```

3. **Add configuration** in `config/widgetConfig.js`:
```javascript
export const WIDGET_TYPES = {
  // ... existing types
  MY_WIDGET: 'my_widget'
};
```

## Widget Card Props

- `id`: Unique identifier
- `title`: Widget title
- `content`: Widget content component
- `icon`: Optional icon
- `size`: 'normal' or 'large'
- `onClick`: Click handler
- `isPlaceholder`: Whether to show placeholder content

## Future Enhancements

- Widget drag & drop
- Widget configuration modal
- Widget marketplace/gallery
- Custom widget builder
- Widget state persistence 