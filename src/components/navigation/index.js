// Navigation Module Exports
// Professional navigation system with authentication, sidebar, and top navbar

// Main Components
export { Navigation } from './components/Navigation.jsx';
export { Sidebar } from './components/Sidebar.jsx';
export { TopNavbar } from './components/TopNavbar.jsx';
export { NavigationLogo } from './components/NavigationLogo.jsx';
export { NavigationMenu } from './components/NavigationMenu.jsx';
export { SidebarFooter } from './components/SidebarFooter.jsx';

// Hooks
export { useAuth } from './hooks/useAuth.js';
export { useSidebar } from './hooks/useSidebar.js';

// Primitives
export { NavIcon, navIcons } from './primitives/NavIcon.jsx';
export { Tooltip, useTooltip } from './primitives/Tooltip.jsx';

// Configuration
export { 
  logoConfig,
  menuItems,
  roleMenuConfig,
  sidebarConfig,
  topNavbarConfig,
  brandingConfig,
  keyboardShortcuts,
  navigationUtils
} from './config/navigationConfig.js'; 