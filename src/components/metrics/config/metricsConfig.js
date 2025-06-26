// Metric type definitions
export const METRIC_TYPES = {
  STANDARD: 'standard',
  SIMPLE: 'simple',
  KPI: 'kpi',
  TREND: 'trend',
  PLACEHOLDER: 'placeholder'
};

// Metric categories
export const METRIC_CATEGORIES = {
  SALES: 'sales',
  REVENUE: 'revenue',
  PERFORMANCE: 'performance',
  GROWTH: 'growth',
  ACTIVITY: 'activity'
};

// Default metrics for the overview header
export const DEFAULT_HEADER_METRICS = [
  {
    id: 'metric-1',
    type: METRIC_TYPES.PLACEHOLDER,
    title: 'Metrics Card 1',
    value: '000',
    category: METRIC_CATEGORIES.SALES,
    isPlaceholder: true
  },
  {
    id: 'metric-2',
    type: METRIC_TYPES.PLACEHOLDER,
    title: 'Metrics Card 2',
    value: '000',
    category: METRIC_CATEGORIES.REVENUE,
    isPlaceholder: true
  },
  {
    id: 'metric-3',
    type: METRIC_TYPES.PLACEHOLDER,
    title: 'Metrics Card 3',
    value: '000',
    category: METRIC_CATEGORIES.PERFORMANCE,
    isPlaceholder: true
  }
];

// Sample real metrics (for future use)
export const SAMPLE_METRICS = {
  SALES: {
    id: 'sales-revenue',
    type: METRIC_TYPES.KPI,
    title: 'Monthly Revenue',
    value: '$125K',
    target: '$150K',
    change: '+12.5%',
    changeType: 'positive',
    progress: 83,
    unit: '',
    category: METRIC_CATEGORIES.REVENUE
  },
  DEALS: {
    id: 'active-deals',
    type: METRIC_TYPES.SIMPLE,
    title: 'Active Deals',
    value: '47',
    change: '+8',
    changeType: 'positive',
    subtitle: 'In Pipeline',
    category: METRIC_CATEGORIES.SALES
  },
  CONVERSION: {
    id: 'conversion-rate',
    type: METRIC_TYPES.TREND,
    title: 'Conversion Rate',
    value: '68%',
    change: '+2.1%',
    changeType: 'positive',
    trend: 'up',
    category: METRIC_CATEGORIES.PERFORMANCE
  }
};

// Metric type metadata
export const METRIC_METADATA = {
  [METRIC_TYPES.STANDARD]: {
    name: 'Standard Metric',
    description: 'Full-featured metric card with icon, value, and change',
    component: 'MetricCard'
  },
  [METRIC_TYPES.SIMPLE]: {
    name: 'Simple Metric',
    description: 'Clean metric display with minimal information',
    component: 'SimpleMetric'
  },
  [METRIC_TYPES.KPI]: {
    name: 'KPI Metric',
    description: 'Key Performance Indicator with progress tracking',
    component: 'KPIMetric'
  },
  [METRIC_TYPES.TREND]: {
    name: 'Trend Metric',
    description: 'Metric with visual trend indicators',
    component: 'TrendMetric'
  }
}; 