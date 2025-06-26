/**
 * Navigation Configuration
 * Centralized configuration for navigation elements, logos, and menu items
 */

// Logo configuration
export const logoConfig = {
  expanded: {
    light: '/black_txt_logo.svg',
    dark: '/white_txt_logo.svg'
  },
  collapsed: '/collapsed_w_txt.png',
  dimensions: {
    expanded: { height: '32px', width: 'auto' },
    collapsed: { width: '32px', height: '32px' }
  }
};

// Navigation menu items configuration
export const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: {
      type: 'svg',
      viewBox: '0 0 24 24',
      paths: [
        { d: 'M18 20V10', stroke: true },
        { d: 'M12 20V4', stroke: true },
        { d: 'M6 20V14', stroke: true }
      ]
    },
    roles: ['VP', 'Regional', 'District', 'Office', 'Closer', 'Setter'], // Available to all roles
    href: '/dashboard'
  },
  {
    id: 'recordings',
    label: 'Recordings',
    icon: {
      type: 'svg',
      viewBox: '0 0 24 24',
      paths: [
        { d: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', stroke: true },
        { d: 'M19 10v1a7 7 0 0 1-14 0v-1', stroke: true },
        { d: 'M12 18v4', stroke: true },
        { d: 'M8 22h8', stroke: true }
      ]
    },
    roles: ['VP', 'Regional', 'District', 'Office', 'Closer', 'Setter'], // Available to all roles
    href: '/recordings'
  }
  // Future menu items can be added here
];

// Role-specific menu configuration
export const roleMenuConfig = {
  VP: {
    additionalItems: [], // Currently only Overview
    permissions: ['view_all_regions', 'view_all_metrics']
  },
  Regional: {
    additionalItems: [],
    permissions: ['view_region_metrics', 'manage_districts']
  },
  District: {
    additionalItems: [],
    permissions: ['view_district_metrics', 'manage_offices']
  },
  Office: {
    additionalItems: [],
    permissions: ['view_office_metrics', 'manage_team']
  },
  Closer: {
    additionalItems: [],
    permissions: ['view_personal_metrics']
  },
  Setter: {
    additionalItems: [],
    permissions: ['view_personal_metrics']
  }
};

// Sidebar dimensions and animation settings
export const sidebarConfig = {
  dimensions: {
    expanded: 240,
    collapsed: 60
  },
  animation: {
    duration: 0.3,
    ease: 'easeInOut'
  },
  breakpoints: {
    mobile: 768, // Auto-collapse on mobile
    tablet: 1024
  }
};

// Top navbar configuration
export const topNavbarConfig = {
  height: 60,
  padding: '0 2rem',
  sections: {
    left: ['selectors'], // Role, Location, Office selectors
    right: ['actions', 'profile'] // Dropdowns and profile
  }
};

// Branding configuration
export const brandingConfig = {
  productName: 'SalesTag',
  companyName: 'ION Solar',
  footer: {
    text: 'SalesTag',
    font: {
      family: '"Geist Mono", "JetBrains Mono", "Fira Code", "Source Code Pro", "Menlo", monospace',
      size: '10px',
      weight: 600,
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }
  }
};

// Keyboard shortcuts
export const keyboardShortcuts = {
  toggleSidebar: {
    key: 'b',
    modifiers: ['ctrl', 'meta'], // Ctrl on Windows/Linux, Cmd on Mac
    description: 'Toggle sidebar'
  }
  // Future shortcuts can be added here
};

// Navigation utilities
export const navigationUtils = {
  /**
   * Get logo source based on theme and sidebar state
   */
  getLogo: (theme, isCollapsed, isSystemLight = false) => {
    if (isCollapsed) {
      return logoConfig.collapsed;
    }
    
    const isLightTheme = theme === 'light' || (theme === 'system' && isSystemLight);
    return isLightTheme ? logoConfig.expanded.light : logoConfig.expanded.dark;
  },

  /**
   * Filter menu items by user role
   */
  getMenuItemsForRole: (userRole) => {
    return menuItems.filter(item => 
      item.roles.includes(userRole) || item.roles.includes('all')
    );
  },

  /**
   * Get role-specific permissions
   */
  getRolePermissions: (userRole) => {
    return roleMenuConfig[userRole]?.permissions || [];
  },

  /**
   * Check if user has specific permission
   */
  hasPermission: (userRole, permission) => {
    const permissions = navigationUtils.getRolePermissions(userRole);
    return permissions.includes(permission);
  }
}; 