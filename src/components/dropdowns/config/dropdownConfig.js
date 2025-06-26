// Dropdown type definitions
export const DROPDOWN_TYPES = {
  NOTIFICATIONS: 'notifications',
  PROFILE: 'profile',
  FEEDBACK: 'feedback',
  AI_ASSISTANT: 'ai_assistant',
  HELP: 'help',
  CALENDAR: 'calendar'
};

// Common dropdown positions
export const DROPDOWN_POSITIONS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
};

// Common dropdown widths
export const DROPDOWN_WIDTHS = {
  SMALL: '200px',
  MEDIUM: '280px',
  LARGE: '380px',
  EXTRA_LARGE: '480px'
};

// Dropdown configurations
export const DROPDOWN_CONFIGS = {
  [DROPDOWN_TYPES.NOTIFICATIONS]: {
    width: DROPDOWN_WIDTHS.LARGE,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: true,
    maxItems: 50
  },
  [DROPDOWN_TYPES.PROFILE]: {
    width: DROPDOWN_WIDTHS.MEDIUM,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: false
  },
  [DROPDOWN_TYPES.FEEDBACK]: {
    width: DROPDOWN_WIDTHS.MEDIUM,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: false
  },
  [DROPDOWN_TYPES.AI_ASSISTANT]: {
    width: DROPDOWN_WIDTHS.EXTRA_LARGE,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: false
  },
  [DROPDOWN_TYPES.HELP]: {
    width: DROPDOWN_WIDTHS.MEDIUM,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: false
  },
  [DROPDOWN_TYPES.CALENDAR]: {
    width: DROPDOWN_WIDTHS.LARGE,
    position: DROPDOWN_POSITIONS.RIGHT,
    showBadge: false
  }
};

// Common dropdown animations
export const DROPDOWN_ANIMATIONS = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
  transition: { duration: 0.15 }
}; 