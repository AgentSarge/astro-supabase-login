/**
 * Selectors Module - Centralized exports
 * 
 * Provides a unified interface for all selector components,
 * shared utilities, and configuration.
 */

// Shared components
export { default as SelectorBase } from './components/SelectorBase.jsx';

// Specific selector types
export { default as RoleSelector } from './types/RoleSelector.jsx';
export { default as LocationSelector } from './types/LocationSelector.jsx';
export { default as OfficeSelector } from './types/OfficeSelector.jsx';

// Shared hooks
export { useSelector } from './hooks/useSelector.js';

// Configuration and utilities
export {
  transformRole,
  getAvailableRoles,
  getAvailableLocations,
  getAvailableOffices,
  getUserOffice,
  ROLES,
  LOCATIONS,
  OFFICES,
  ICONS
} from './config/selectorConfig.jsx'; 