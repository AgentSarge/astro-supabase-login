// Widget type definitions
export const WIDGET_TYPES = {
  PLACEHOLDER: 'placeholder',
  CHART: 'chart',
  METRIC: 'metric',
  WEATHER: 'weather',
  CALENDAR: 'calendar'
};

// Default widget configurations - Placeholder Widgets
export const DEFAULT_WIDGETS = [
  {
    id: 'widget-1',
    type: WIDGET_TYPES.PLACEHOLDER,
    title: 'Widget 1',
    value: '000',
    subtitle: 'Placeholder',
    status: 'active',
    isPlaceholder: true,
    chart: 'bar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    )
  },
  {
    id: 'widget-2',
    type: WIDGET_TYPES.PLACEHOLDER,
    title: 'Widget 2',
    value: '000',
    subtitle: 'Placeholder',
    status: 'active',
    isPlaceholder: true,
    chart: 'bar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    )
  },
  {
    id: 'widget-3',
    type: WIDGET_TYPES.PLACEHOLDER,
    title: 'Widget 3',
    value: '000',
    subtitle: 'Placeholder',
    status: 'active',
    isPlaceholder: true,
    chart: 'bar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    )
  },
  {
    id: 'widget-4',
    type: WIDGET_TYPES.PLACEHOLDER,
    title: 'Widget 4',
    value: '000',
    subtitle: 'Placeholder',
    status: 'active',
    isPlaceholder: true,
    chart: 'bar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    )
  }
]; 