import { Navigation } from './navigation/index.js';
import { DashboardLayout } from './layouts/index.js';
import { ThemeProvider } from './ThemeProvider.jsx';

/**
 * Global Navbar Component
 * Refactored to use the new Navigation architecture
 * All existing functionality preserved with improved organization
 */
function GlobalNavbarContent() {
  return (
    <Navigation>
      <DashboardLayout />
    </Navigation>
  );
}

export default function GlobalNavbar() {
  return (
    <ThemeProvider>
      <GlobalNavbarContent />
    </ThemeProvider>
  );
} 