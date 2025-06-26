/**
 * Layout configuration constants
 * Centralized spacing, breakpoints, and layout settings
 */

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1440,
  large: 1920
};

// Spacing scale
export const SPACING = {
  xs: { mobile: '4px', tablet: '6px', desktop: '8px' },
  sm: { mobile: '8px', tablet: '12px', desktop: '16px' },
  md: { mobile: '16px', tablet: '20px', desktop: '24px' },
  lg: { mobile: '24px', tablet: '32px', desktop: '48px' },
  xl: { mobile: '32px', tablet: '48px', desktop: '64px' },
  xxl: { mobile: '48px', tablet: '64px', desktop: '96px' }
};

// Layout constants
export const LAYOUT_CONSTANTS = {
  // Container max-widths
  containerSizes: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
    full: '100%'
  },
  
  // Common grid configurations
  gridColumns: {
    widgets: { mobile: 1, tablet: 2, desktop: 4 },
    content: { mobile: 1, tablet: 1, desktop: 2 },
    cards: { mobile: 1, tablet: 2, desktop: 3 }
  },
  
  // Animation defaults
  animations: {
    duration: 0.4,
    easing: 'easeOut',
    stagger: 0.1
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    notification: 1070
  }
};

// Layout section configurations
export const SECTION_CONFIGS = {
  header: {
    padding: 'md',
    background: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-color)'
  },
  
  widgets: {
    padding: 'lg',
    background: 'var(--bg-primary)',
    maxWidth: '1600px',
    gridColumns: LAYOUT_CONSTANTS.gridColumns.widgets,
    gridGap: 'sm'
  },
  
  content: {
    padding: 'lg',
    background: 'var(--bg-primary)',
    flex: 1,
    overflow: 'hidden',
    gridColumns: LAYOUT_CONSTANTS.gridColumns.content,
    gridGap: 'md'
  }
};

// Responsive utilities
export const getResponsiveConfig = (config, breakpoint) => {
  if (typeof config !== 'object') return config;
  
  // Return the value for the current breakpoint or fallback
  return config[breakpoint] || config.desktop || config.default || Object.values(config)[0];
};

export const getSpacingValue = (size, breakpoint = 'desktop') => {
  const spacing = SPACING[size];
  if (!spacing) return size;
  
  return getResponsiveConfig(spacing, breakpoint);
}; 