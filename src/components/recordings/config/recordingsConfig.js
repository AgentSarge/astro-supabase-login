// Recording types
export const RECORDING_TYPES = {
  CALL: 'Call',
  MEETING: 'Meeting',
  TRAINING: 'Training',
  REVIEW: 'Review',
  PRACTICE: 'Practice'
};

// Analytics metric types
export const ANALYTICS_METRIC_TYPES = {
  CLOCK: 'clock',
  USERS: 'users',
  TIME: 'time',
  GRADUATION: 'graduation',
  STAR: 'star',
  BUILDING: 'building',
  TRENDING_UP: 'trending-up',
  CHECK: 'check',
  PHONE: 'phone',
  TARGET: 'target',
  HEART: 'heart'
};

// Training category types
export const TRAINING_CATEGORY_TYPES = {
  CROWN: 'crown',
  USERS: 'users',
  STAR: 'star',
  TRENDING_UP: 'trending-up',
  TARGET: 'target',
  BUILDING: 'building',
  BOOK: 'book',
  MESSAGE_CIRCLE: 'message-circle',
  PLAY: 'play',
  TOOL: 'tool',
  HEART: 'heart',
  USER: 'user',
  SEARCH: 'search',
  PHONE: 'phone',
  CALENDAR: 'calendar'
};

// Default recent recordings data by role
export const DEFAULT_RECENT_RECORDINGS = {
  VP: {
    title: 'Organization Recordings',
    recordings: [
      {
        id: 1,
        title: 'Q4 Strategy Meeting',
        type: RECORDING_TYPES.MEETING,
        duration: '1:45:30',
        date: '2024-01-15',
        participants: ['Will Sargent', 'Regional Managers'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Regional Performance Review',
        type: RECORDING_TYPES.REVIEW,
        duration: '52:15',
        date: '2024-01-14',
        participants: ['Leadership Team'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Company Training Session',
        type: RECORDING_TYPES.TRAINING,
        duration: '38:45',
        date: '2024-01-13',
        participants: ['All Regions'],
        status: 'completed'
      }
    ]
  },
  Regional: {
    title: 'Regional Recordings',
    recordings: [
      {
        id: 1,
        title: 'District Manager Sync',
        type: RECORDING_TYPES.MEETING,
        duration: '45:30',
        date: '2024-01-15',
        participants: ['District Managers'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Sales Training Workshop',
        type: RECORDING_TYPES.TRAINING,
        duration: '1:12:20',
        date: '2024-01-14',
        participants: ['Regional Team'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Performance Review Call',
        type: RECORDING_TYPES.REVIEW,
        duration: '28:15',
        date: '2024-01-13',
        participants: ['Top Performers'],
        status: 'completed'
      }
    ]
  },
  District: {
    title: 'District Recordings',
    recordings: [
      {
        id: 1,
        title: 'Office Manager Meeting',
        type: RECORDING_TYPES.MEETING,
        duration: '35:20',
        date: '2024-01-15',
        participants: ['Office Managers'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Objection Handling Training',
        type: RECORDING_TYPES.TRAINING,
        duration: '48:45',
        date: '2024-01-14',
        participants: ['Sales Team'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Client Success Call',
        type: RECORDING_TYPES.CALL,
        duration: '22:30',
        date: '2024-01-13',
        participants: ['Best Practices'],
        status: 'completed'
      }
    ]
  },
  Office: {
    title: 'Team Recordings',
    recordings: [
      {
        id: 1,
        title: 'Team Morning Huddle',
        type: RECORDING_TYPES.MEETING,
        duration: '15:45',
        date: '2024-01-15',
        participants: ['Office Team'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Role Play Session',
        type: RECORDING_TYPES.TRAINING,
        duration: '32:20',
        date: '2024-01-14',
        participants: ['Closers & Setters'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Client Demo Call',
        type: RECORDING_TYPES.CALL,
        duration: '41:15',
        date: '2024-01-13',
        participants: ['Sarah Chen'],
        status: 'completed'
      }
    ]
  },
  Closer: {
    title: 'My Sales Recordings',
    recordings: [
      {
        id: 1,
        title: 'Client Consultation - Smith Family',
        type: RECORDING_TYPES.CALL,
        duration: '45:30',
        date: '2024-01-15',
        participants: ['Potential Client'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Follow-up Call - Johnson Project',
        type: RECORDING_TYPES.CALL,
        duration: '23:15',
        date: '2024-01-14',
        participants: ['Existing Client'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Closing Techniques Practice',
        type: RECORDING_TYPES.TRAINING,
        duration: '18:45',
        date: '2024-01-13',
        participants: ['Self Practice'],
        status: 'completed'
      }
    ]
  },
  Setter: {
    title: 'My Setting Recordings',
    recordings: [
      {
        id: 1,
        title: 'Lead Qualification Call',
        type: RECORDING_TYPES.CALL,
        duration: '12:30',
        date: '2024-01-15',
        participants: ['Prospect'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Appointment Setting Training',
        type: RECORDING_TYPES.TRAINING,
        duration: '25:15',
        date: '2024-01-14',
        participants: ['Team Training'],
        status: 'completed'
      },
      {
        id: 3,
        title: 'Cold Call Practice',
        type: RECORDING_TYPES.PRACTICE,
        duration: '15:45',
        date: '2024-01-13',
        participants: ['Mock Calls'],
        status: 'completed'
      }
    ]
  }
};

// Default analytics data by role
export const DEFAULT_ANALYTICS_DATA = {
  VP: {
    title: 'Organization Recording Analytics',
    subtitle: 'Company-wide recording insights and trends',
    metrics: [
      {
        label: 'Total Recording Hours',
        value: '2,847h',
        change: '+18.5%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Active Users',
        value: '127',
        change: '+12',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.USERS
      },
      {
        label: 'Avg Session Length',
        value: '42m',
        change: '+8.2%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TIME
      },
      {
        label: 'Training Completion',
        value: '89%',
        change: '+5.3%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.GRADUATION
      }
    ],
    insights: [
      'Sales call recordings have increased by 24% this quarter',
      'Training session engagement is at an all-time high',
      'Regional performance reviews show consistent improvement'
    ]
  },
  Regional: {
    title: 'Regional Recording Analytics',
    subtitle: 'Regional recording insights and performance',
    metrics: [
      {
        label: 'Region Recording Hours',
        value: '1,247h',
        change: '+22.1%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Team Members Active',
        value: '34',
        change: '+6',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.USERS
      },
      {
        label: 'Avg Call Quality Score',
        value: '8.4/10',
        change: '+0.8',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.STAR
      },
      {
        label: 'Training Attendance',
        value: '92%',
        change: '+4.2%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.GRADUATION
      }
    ],
    insights: [
      'District A shows 35% improvement in call quality',
      'Training session completion rates exceed company average',
      'Weekly team meetings have 98% attendance rate'
    ]
  },
  District: {
    title: 'District Recording Analytics',
    subtitle: 'District-level recording insights and metrics',
    metrics: [
      {
        label: 'District Recording Hours',
        value: '687h',
        change: '+19.3%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Office Participation',
        value: '18/20',
        change: '+2',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.BUILDING
      },
      {
        label: 'Avg Score Improvement',
        value: '+15%',
        change: '+3.2%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TRENDING_UP
      },
      {
        label: 'Best Practice Adoption',
        value: '76%',
        change: '+8.1%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CHECK
      }
    ],
    insights: [
      'Office managers report 25% improvement in team performance',
      'Recorded training sessions reduce onboarding time by 30%',
      'Call coaching sessions show measurable results'
    ]
  },
  Office: {
    title: 'Office Recording Analytics',
    subtitle: 'Office-level recording insights and team performance',
    metrics: [
      {
        label: 'Office Recording Hours',
        value: '245h',
        change: '+26.7%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Team Participation',
        value: '12/12',
        change: '100%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.USERS
      },
      {
        label: 'Skills Development',
        value: '+22%',
        change: '+4.5%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TRENDING_UP
      },
      {
        label: 'Client Satisfaction',
        value: '9.1/10',
        change: '+0.7',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.HEART
      }
    ],
    insights: [
      'Team huddles are consistently well-attended',
      'Role-play sessions improve closing rates by 18%',
      'Client feedback scores consistently above 9.0'
    ]
  },
  Closer: {
    title: 'My Recording Analytics',
    subtitle: 'Personal performance insights and growth tracking',
    metrics: [
      {
        label: 'My Recording Hours',
        value: '47h',
        change: '+31.2%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Calls Recorded',
        value: '89',
        change: '+15',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.PHONE
      },
      {
        label: 'Avg Call Score',
        value: '8.9/10',
        change: '+1.2',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.STAR
      },
      {
        label: 'Close Rate',
        value: '73%',
        change: '+8.3%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TARGET
      }
    ],
    insights: [
      'Your call quality scores are in the top 10% company-wide',
      'Objection handling has improved significantly this month',
      'Client rapport building shows consistent improvement'
    ]
  },
  Setter: {
    title: 'My Recording Analytics',
    subtitle: 'Personal appointment setting insights and metrics',
    metrics: [
      {
        label: 'My Recording Hours',
        value: '32h',
        change: '+28.4%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.CLOCK
      },
      {
        label: 'Calls Recorded',
        value: '156',
        change: '+24',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.PHONE
      },
      {
        label: 'Conversion Rate',
        value: '18.5%',
        change: '+3.2%',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TRENDING_UP
      },
      {
        label: 'Avg Call Length',
        value: '8.3m',
        change: '+1.1m',
        changeType: 'positive',
        icon: ANALYTICS_METRIC_TYPES.TIME
      }
    ],
    insights: [
      'Your qualification questions are becoming more effective',
      'Appointment setting rate is above team average',
      'Follow-up timing has improved significantly'
    ]
  }
};

// Default training data by role
export const DEFAULT_TRAINING_DATA = {
  VP: {
    title: 'Leadership Training & Coaching',
    subtitle: 'Executive development and organizational training resources',
    categories: [
      {
        title: 'Executive Coaching',
        description: 'Leadership development and strategic planning sessions',
        count: '8 sessions',
        icon: TRAINING_CATEGORY_TYPES.CROWN,
        color: '#8b5cf6'
      },
      {
        title: 'Manager Training',
        description: 'Training programs for regional and district managers',
        count: '15 modules',
        icon: TRAINING_CATEGORY_TYPES.USERS,
        color: '#06b6d4'
      },
      {
        title: 'Best Practices',
        description: 'Company-wide best practice recordings and guidelines',
        count: '23 resources',
        icon: TRAINING_CATEGORY_TYPES.STAR,
        color: '#10b981'
      }
    ]
  },
  Regional: {
    title: 'Regional Training & Development',
    subtitle: 'Training resources and coaching sessions for your region',
    categories: [
      {
        title: 'Team Leadership',
        description: 'District manager coaching and team development',
        count: '12 sessions',
        icon: TRAINING_CATEGORY_TYPES.USERS,
        color: '#06b6d4'
      },
      {
        title: 'Sales Training',
        description: 'Regional sales methodology and technique training',
        count: '18 modules',
        icon: TRAINING_CATEGORY_TYPES.TRENDING_UP,
        color: '#10b981'
      },
      {
        title: 'Performance Coaching',
        description: 'Individual and team performance improvement sessions',
        count: '9 recordings',
        icon: TRAINING_CATEGORY_TYPES.TARGET,
        color: '#f59e0b'
      }
    ]
  },
  District: {
    title: 'District Training & Coaching',
    subtitle: 'Training resources and coaching for your district teams',
    categories: [
      {
        title: 'Office Management',
        description: 'Office manager training and development sessions',
        count: '14 sessions',
        icon: TRAINING_CATEGORY_TYPES.BUILDING,
        color: '#10b981'
      },
      {
        title: 'Skills Development',
        description: 'Team skill building and technique improvement',
        count: '21 modules',
        icon: TRAINING_CATEGORY_TYPES.BOOK,
        color: '#06b6d4'
      },
      {
        title: 'Coaching Sessions',
        description: 'One-on-one and group coaching recordings',
        count: '16 recordings',
        icon: TRAINING_CATEGORY_TYPES.MESSAGE_CIRCLE,
        color: '#8b5cf6'
      }
    ]
  },
  Office: {
    title: 'Team Training & Coaching',
    subtitle: 'Training and development resources for your office team',
    categories: [
      {
        title: 'Role Play Sessions',
        description: 'Practice sessions and skill development exercises',
        count: '25 sessions',
        icon: TRAINING_CATEGORY_TYPES.PLAY,
        color: '#ef4444'
      },
      {
        title: 'Team Building',
        description: 'Team cohesion and communication training',
        count: '8 workshops',
        icon: TRAINING_CATEGORY_TYPES.USERS,
        color: '#10b981'
      },
      {
        title: 'Skill Workshops',
        description: 'Technical and soft skill development workshops',
        count: '19 modules',
        icon: TRAINING_CATEGORY_TYPES.TOOL,
        color: '#f59e0b'
      }
    ]
  },
  Closer: {
    title: 'Closer Training & Development',
    subtitle: 'Personal development and closing technique training',
    categories: [
      {
        title: 'Closing Techniques',
        description: 'Advanced closing strategies and objection handling',
        count: '32 sessions',
        icon: TRAINING_CATEGORY_TYPES.TARGET,
        color: '#ef4444'
      },
      {
        title: 'Client Relations',
        description: 'Building rapport and managing client relationships',
        count: '18 modules',
        icon: TRAINING_CATEGORY_TYPES.HEART,
        color: '#10b981'
      },
      {
        title: 'Personal Coaching',
        description: 'One-on-one coaching sessions and feedback',
        count: '12 recordings',
        icon: TRAINING_CATEGORY_TYPES.USER,
        color: '#8b5cf6'
      }
    ]
  },
  Setter: {
    title: 'Setter Training & Development',
    subtitle: 'Appointment setting skills and lead qualification training',
    categories: [
      {
        title: 'Lead Qualification',
        description: 'Effective questioning and prospect qualification',
        count: '28 sessions',
        icon: TRAINING_CATEGORY_TYPES.SEARCH,
        color: '#06b6d4'
      },
      {
        title: 'Cold Calling Mastery',
        description: 'Cold calling techniques and conversation starters',
        count: '24 modules',
        icon: TRAINING_CATEGORY_TYPES.PHONE,
        color: '#10b981'
      },
      {
        title: 'Appointment Setting',
        description: 'Scheduling strategies and follow-up techniques',
        count: '16 workshops',
        icon: TRAINING_CATEGORY_TYPES.CALENDAR,
        color: '#f59e0b'
      }
    ]
  }
};

// Helper functions
export const getRecordingDataByRole = (role, location, office) => {
  const baseData = DEFAULT_RECENT_RECORDINGS[role] || DEFAULT_RECENT_RECORDINGS.VP;
  
  // Customize title based on location/office if applicable
  if (role === 'Regional' && location) {
    return {
      ...baseData,
      title: `${location} Recordings`
    };
  }
  
  if (role === 'Office' && office) {
    return {
      ...baseData,
      title: `${office} Team Recordings`
    };
  }
  
  return baseData;
};

export const getAnalyticsDataByRole = (role, location, office) => {
  const baseData = DEFAULT_ANALYTICS_DATA[role] || DEFAULT_ANALYTICS_DATA.VP;
  
  // Customize title based on location/office if applicable
  if (role === 'Regional' && location) {
    return {
      ...baseData,
      title: `${location} Recording Analytics`
    };
  }
  
  if (role === 'Office' && office) {
    return {
      ...baseData,
      title: `${office} Recording Analytics`
    };
  }
  
  return baseData;
};

export const getTrainingDataByRole = (role, location, office) => {
  return DEFAULT_TRAINING_DATA[role] || DEFAULT_TRAINING_DATA.VP;
}; 