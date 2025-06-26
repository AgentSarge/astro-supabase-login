/**
 * Configuration for all selector components
 * Centralized data management for roles, locations, and offices
 */

// Role transformation utility
export const transformRole = (role) => {
  if (!role) return 'Closer';
  const roleStr = role.toLowerCase();
  
  // Special override for testing: Will Sargent is now VP
  if (roleStr.includes('office') && roleStr.includes('manager')) return 'VP';
  
  if (roleStr.includes('vp') || roleStr.includes('vice president')) return 'VP';
  if (roleStr.includes('regional')) return 'Regional';
  if (roleStr.includes('district')) return 'District';
  if (roleStr.includes('setter')) return 'Setter';
  if (roleStr.includes('closer')) return 'Closer';
  // Default to capitalizing first letter for any other role
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

// Icons for different selector types
export const ICONS = {
  // Role icons
  closer: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  setter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M3 10h18"/>
      <path d="M8 14h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M12 18h.01"/>
    </svg>
  ),
  office: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18"/>
      <path d="M5 21V7l8-4v18"/>
      <path d="M19 21V11l-6-4"/>
      <path d="M9 9v.01"/>
      <path d="M9 12v.01"/>
      <path d="M9 15v.01"/>
      <path d="M9 18v.01"/>
    </svg>
  ),
  district: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
    </svg>
  ),
  regional: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
    </svg>
  ),
  vp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  // Location/territory icons
  territory: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  allTerritories: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
    </svg>
  )
};

// Role definitions with hierarchy
export const ROLES = [
  {
    name: 'Closer',
    icon: ICONS.closer,
    description: 'Personal deals and closing',
    level: 1
  },
  {
    name: 'Setter',
    icon: ICONS.setter,
    description: 'Appointment setting and leads',
    level: 1
  },
  {
    name: 'Office',
    icon: ICONS.office,
    description: 'Office-level view',
    level: 2
  },
  {
    name: 'District',
    icon: ICONS.district,
    description: 'Multiple offices (Columbia, Charleston)',
    level: 3
  },
  {
    name: 'Regional',
    icon: ICONS.regional,
    description: 'All regions (Virginia, South Carolina)',
    level: 4
  },
  {
    name: 'VP',
    icon: ICONS.vp,
    description: 'Executive view - all operations',
    level: 5
  }
];

// Location data by role
export const LOCATIONS = {
  Closer: [
    {
      name: 'All Territories',
      icon: ICONS.allTerritories,
      description: 'All your assigned territories'
    },
    {
      name: 'Downtown Columbia',
      icon: ICONS.territory,
      description: 'Downtown Columbia area'
    },
    {
      name: 'West Columbia',
      icon: ICONS.territory,
      description: 'West Columbia neighborhoods'
    },
    {
      name: 'Forest Acres',
      icon: ICONS.territory,
      description: 'Forest Acres territory'
    },
    {
      name: 'Irmo',
      icon: ICONS.territory,
      description: 'Irmo area territory'
    }
  ],
  Setter: [
    {
      name: 'All Territories',
      icon: ICONS.allTerritories,
      description: 'All your assigned territories'
    },
    {
      name: 'North Charleston',
      icon: ICONS.setter,
      description: 'North Charleston territory'
    },
    {
      name: 'Mount Pleasant',
      icon: ICONS.setter,
      description: 'Mount Pleasant area'
    },
    {
      name: 'Summerville',
      icon: ICONS.setter,
      description: 'Summerville territory'
    },
    {
      name: 'Goose Creek',
      icon: ICONS.setter,
      description: 'Goose Creek area'
    }
  ],
  District: [
    {
      name: 'All District Offices',
      icon: ICONS.district,
      description: 'Columbia & Charleston combined'
    },
    {
      name: 'Columbia Office',
      icon: ICONS.office,
      description: 'Columbia office only'
    },
    {
      name: 'Charleston Office',
      icon: ICONS.office,
      description: 'Charleston office only'
    }
  ],
  Regional: [
    {
      name: 'South Carolina',
      icon: ICONS.regional,
      description: 'All South Carolina operations'
    },
    {
      name: 'Virginia',
      icon: ICONS.regional,
      description: 'All Virginia operations'
    }
  ],
  VP: [
    {
      name: 'All Operations',
      icon: ICONS.vp,
      description: 'Complete company overview'
    },
    {
      name: 'South Carolina',
      icon: ICONS.regional,
      description: 'All South Carolina operations'
    },
    {
      name: 'Virginia',
      icon: ICONS.regional,
      description: 'All Virginia operations'
    }
  ]
};

// Office data by state/region
export const OFFICES = {
  'South Carolina': [
    {
      name: 'All SC Offices',
      icon: ICONS.regional,
      description: 'Overview of all South Carolina offices'
    },
    {
      name: 'Columbia Office',
      icon: ICONS.office,
      description: 'Columbia, SC office'
    },
    {
      name: 'Charleston Office',
      icon: ICONS.office,
      description: 'Charleston, SC office'
    }
  ],
  Virginia: [
    {
      name: 'All VA Offices',
      icon: ICONS.regional,
      description: 'Overview of all Virginia offices'
    },
    {
      name: 'Richmond Office',
      icon: ICONS.office,
      description: 'Richmond, VA office'
    },
    {
      name: 'Virginia Beach Office',
      icon: ICONS.office,
      description: 'Virginia Beach, VA office'
    }
  ]
};

// Utility functions
export const getAvailableRoles = (userRole) => {
  const transformedRole = transformRole(userRole);
  const userLevel = ROLES.find(role => role.name === transformedRole)?.level || 1;
  
  // Return roles at or below user's level
  return ROLES.filter(role => role.level <= userLevel);
};

export const getAvailableLocations = (selectedRole, userRole) => {
  // For Office role, return user's specific office
  if (selectedRole === 'Office') {
    const userOffice = getUserOffice(userRole);
    return [{
      name: userOffice,
      icon: ICONS.office,
      description: `${userOffice} operations`
    }];
  }
  
  return LOCATIONS[selectedRole] || [];
};

export const getAvailableOffices = (selectedLocation) => {
  return OFFICES[selectedLocation] || [];
};

export const getUserOffice = (userRole) => {
  const roleStr = userRole?.toLowerCase() || '';
  // For now, assume office managers are tied to specific offices
  // Will Sargent (office manager) = Charleston office (but he's now VP for testing)
  if (roleStr.includes('office') || roleStr.includes('manager')) {
    return 'Charleston Office'; // Default for office managers
  }
  return 'Columbia Office'; // Default fallback
}; 