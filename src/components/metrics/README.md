# Metrics Directory Structure

This directory contains all metrics-related components organized for scalability and maintainability.

## Directory Structure

```
metrics/
├── cards/              # Metric card containers
│   └── MetricCard.jsx  # Main metric card component (original)
├── types/              # Specific metric implementations
│   ├── SimpleMetric.jsx    # Clean, minimal metrics
│   ├── KPIMetric.jsx       # KPI with progress tracking
│   └── TrendMetric.jsx     # Metrics with trend indicators
├── config/             # Metric configurations
│   └── metricsConfig.js    # Metric type definitions and defaults
├── index.js           # Main exports file
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
import { MetricCard, DEFAULT_HEADER_METRICS } from './metrics/index.js';
```

### Metric Types

#### 1. **Standard MetricCard** (Original)
Full-featured metric card with icon, hover effects, and loading states.
```javascript
<MetricCard
  icon={<DollarIcon />}
  title="Revenue"
  value="$125K"
  change="+12.5%"
  changeType="positive"
/>
```

#### 2. **SimpleMetric** 
Clean, minimal metric display.
```javascript
<SimpleMetric
  title="Active Users"
  value="1,234"
  change="+5.2%"
  subtitle="This month"
/>
```

#### 3. **KPIMetric**
Key Performance Indicator with progress tracking.
```javascript
<KPIMetric
  title="Sales Target"
  value="83"
  unit="%"
  target="100%"
  progress={83}
  change="+8%"
/>
```

#### 4. **TrendMetric**
Metric with visual trend indicators.
```javascript
<TrendMetric
  title="Conversion Rate"
  value="68%"
  change="+2.1%"
  trend="up"
  changeType="positive"
/>
```

## Configuration

### Metric Types
```javascript
export const METRIC_TYPES = {
  STANDARD: 'standard',    // Full MetricCard
  SIMPLE: 'simple',        // SimpleMetric
  KPI: 'kpi',             // KPIMetric
  TREND: 'trend',         // TrendMetric
  PLACEHOLDER: 'placeholder'
};
```

### Default Header Metrics
```javascript
export const DEFAULT_HEADER_METRICS = [
  {
    id: 'metric-1',
    type: METRIC_TYPES.PLACEHOLDER,
    title: 'Metrics Card 1',
    value: '000'
  }
  // ... more metrics
];
```

## Adding New Metric Types

1. **Create the metric component** in `types/`:
```javascript
// types/CustomMetric.jsx
export default function CustomMetric({ title, data }) {
  return <div>{/* custom metric content */}</div>;
}
```

2. **Export it** in `index.js`:
```javascript
export { default as CustomMetric } from './types/CustomMetric.jsx';
```

3. **Add configuration** in `config/metricsConfig.js`:
```javascript
export const METRIC_TYPES = {
  // ... existing types
  CUSTOM: 'custom'
};
```

## Integration

### In OverviewHeader
```javascript
import { DEFAULT_HEADER_METRICS, SimpleMetric } from './metrics/index.js';

// Use configured metrics
const metrics = DEFAULT_HEADER_METRICS;

// Render with specific type
<SimpleMetric
  title={metric.title}
  value={metric.value}
  change={metric.change}
/>
```

## Future Enhancements

- Metric configuration modal
- Real-time data integration
- Custom metric builder
- Metric templates and presets
- Advanced chart integrations 