/**
 * Layouts Module - Centralized exports
 * 
 * Provides a unified interface for all layout components,
 * primitives, hooks, and configuration.
 */

// Layout components
export { default as DashboardLayout } from './components/DashboardLayout.jsx';
export { default as RecordingsLayout } from './components/RecordingsLayout.jsx';

// Layout primitives
export { default as Container } from './primitives/Container.jsx';
export { default as Grid, GridItem } from './primitives/Grid.jsx';
export { default as Stack, HStack, VStack } from './primitives/Stack.jsx';

// Layout hooks
export { useLayout, useLayoutAnimation } from './hooks/useLayout.js';

// Configuration and utilities
export {
  BREAKPOINTS,
  SPACING,
  LAYOUT_CONSTANTS,
  SECTION_CONFIGS,
  getResponsiveConfig,
  getSpacingValue
} from './config/layoutConfig.js'; 