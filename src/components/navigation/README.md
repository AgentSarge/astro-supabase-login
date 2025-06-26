# Navigation Module

Professional navigation system for the ION Solar dashboard with authentication, sidebar, and top navbar components.

## 🏗️ Architecture

```
navigation/
├── components/          # Main navigation components
│   ├── Navigation.jsx   # Main orchestrator component
│   ├── Sidebar.jsx      # Collapsible sidebar with menu
│   ├── TopNavbar.jsx    # Top navigation bar
│   ├── NavigationLogo.jsx # Theme-aware logo component
│   ├── NavigationMenu.jsx # Role-based menu system
│   └── SidebarFooter.jsx # Branding and controls
├── hooks/              # Navigation-specific hooks
│   ├── useAuth.js      # Authentication state management
│   └── useSidebar.js   # Sidebar state and behavior
├── primitives/         # Reusable UI primitives
│   ├── NavIcon.jsx     # Consistent icon rendering
│   └── Tooltip.jsx     # Tooltip component with animations
├── config/             # Configuration and utilities
│   └── navigationConfig.js # Centralized navigation config
└── README.md          # This documentation
```

## 🚀 Quick Start

### Basic Usage

```jsx
import { Navigation } from './components/navigation';
import { DashboardLayout } from './components/layouts';

function App() {
  return (
    <Navigation>
      <DashboardLayout 
        selectedRole="VP"
        selectedLocation="South Carolina"
        selectedOffice=""
      />
    </Navigation>
  );
}
```

### With Theme Provider

```jsx
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/navigation';

function App() {
  return (
    <ThemeProvider>
      <Navigation>
        {/* Your app content */}
      </Navigation>
    </ThemeProvider>
  );
}
```

## 🔧 Components

### Navigation (Main Component)

The primary navigation orchestrator that handles authentication, sidebar, and top navbar.

**Props:**
- `children` - Content to render in the main area
- `className` - Additional CSS classes
- `style` - Inline styles

**Features:**
- ✅ Automatic authentication handling
- ✅ Role-based navigation
- ✅ Responsive sidebar behavior
- ✅ Integrated state management

### Sidebar

Collapsible sidebar with logo, menu, and footer.

**Features:**
- ✅ Hover-to-expand when collapsed
- ✅ Keyboard shortcuts (Ctrl/Cmd + B)
- ✅ Persistent state (localStorage)
- ✅ Role-based menu items
- ✅ Theme-aware logo switching

### TopNavbar

Top navigation bar with selectors and action buttons.

**Features:**
- ✅ Role/Location/Office selectors
- ✅ Action button dropdowns
- ✅ Profile management
- ✅ Consistent spacing and layout

## 🎯 Hooks

### useAuth()

Comprehensive authentication state management.

```jsx
const { 
  session,
  userProfile,
  loading,
  userRole,
  signOut,
  isAuthenticated,
  user
} = useAuth();
```

**Returns:**
- `session` - Current Supabase session
- `userProfile` - User profile data from database
- `loading` - Authentication loading state
- `userRole` - Transformed user role (VP, Regional, etc.)
- `signOut` - Sign out function
- `isAuthenticated` - Boolean authentication status
- `user` - Current user object

### useSidebar()

Sidebar state and behavior management.

```jsx
const {
  isCollapsed,
  isHovered,
  showTooltip,
  toggleCollapse,
  handleMouseEnter,
  handleMouseLeave
} = useSidebar();
```

**Features:**
- ✅ Collapse/expand state
- ✅ Hover behavior
- ✅ Tooltip management
- ✅ Keyboard shortcuts
- ✅ Persistent state

## 🎨 Primitives

### NavIcon

Consistent icon rendering for navigation items.

```jsx
import { NavIcon, navIcons } from './navigation';

<NavIcon icon={navIcons.overview} />
```

### Tooltip

Animated tooltip component with positioning.

```jsx
import { Tooltip, useTooltip } from './navigation';

const { isVisible, show, hide } = useTooltip();

<Tooltip content="Collapse sidebar" isVisible={isVisible} position="top">
  <button onMouseEnter={show} onMouseLeave={hide}>
    Toggle
  </button>
</Tooltip>
```

## ⚙️ Configuration

### Navigation Config

Centralized configuration in `config/navigationConfig.js`:

```javascript
import { navigationUtils, logoConfig, sidebarConfig } from './navigation';

// Get logo based on theme
const logo = navigationUtils.getLogo('dark', false);

// Check user permissions
const canViewMetrics = navigationUtils.hasPermission('VP', 'view_all_metrics');

// Get menu items for role
const menuItems = navigationUtils.getMenuItemsForRole('Regional');
```

### Available Configurations

- **logoConfig** - Logo paths and dimensions
- **menuItems** - Navigation menu configuration
- **roleMenuConfig** - Role-based permissions and menu items
- **sidebarConfig** - Sidebar dimensions and animations
- **topNavbarConfig** - Top navbar layout settings
- **brandingConfig** - Company branding elements
- **keyboardShortcuts** - Keyboard shortcut definitions

## 🔐 Authentication Flow

1. **Initialization** - `useAuth` checks for existing session
2. **Profile Loading** - Fetches user profile from Supabase
3. **Role Transformation** - Converts database role to UI role
4. **Permission Checking** - Validates user permissions
5. **Navigation Rendering** - Shows appropriate menu items

## 📱 Responsive Behavior

### Sidebar
- **Desktop (>1024px)** - Full functionality with hover expand
- **Tablet (768-1024px)** - Auto-collapse with hover expand
- **Mobile (<768px)** - Overlay mode (future enhancement)

### Top Navbar
- **All Sizes** - Responsive selector layout
- **Mobile** - Condensed action buttons (future enhancement)

## 🎹 Keyboard Shortcuts

- **Ctrl/Cmd + B** - Toggle sidebar collapse
- **Escape** - Close any open dropdowns (inherited from dropdown module)

## 🔧 Customization

### Adding New Menu Items

```javascript
// In navigationConfig.js
export const menuItems = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: navIcons.analytics,
    roles: ['VP', 'Regional'],
    href: '/analytics'
  }
];
```

### Custom Role Permissions

```javascript
// In navigationConfig.js
export const roleMenuConfig = {
  CustomRole: {
    additionalItems: ['custom-menu-item'],
    permissions: ['custom_permission']
  }
};
```

### Theme Integration

The navigation system automatically integrates with the theme system:

- **Logo switching** - Automatic light/dark logo selection
- **CSS variables** - Uses theme CSS variables for colors
- **System theme** - Responds to system theme changes

## 🧪 Testing

### Component Testing

```jsx
import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';
import { ThemeProvider } from '../ThemeProvider';

test('renders navigation with authentication', () => {
  render(
    <ThemeProvider>
      <Navigation>
        <div>Dashboard Content</div>
      </Navigation>
    </ThemeProvider>
  );
  
  expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
});
```

### Hook Testing

```jsx
import { renderHook } from '@testing-library/react';
import { useSidebar } from './navigation';

test('sidebar toggles correctly', () => {
  const { result } = renderHook(() => useSidebar());
  
  expect(result.current.isCollapsed).toBe(false);
  
  act(() => {
    result.current.toggleCollapse();
  });
  
  expect(result.current.isCollapsed).toBe(true);
});
```

## 🚀 Future Enhancements

### Planned Features
- [ ] Mobile-optimized navigation
- [ ] Breadcrumb navigation
- [ ] Search functionality
- [ ] Recent items menu
- [ ] Customizable menu order
- [ ] Navigation analytics
- [ ] Accessibility improvements (ARIA labels)
- [ ] Animation preferences
- [ ] Multi-level menu support
- [ ] Navigation history

### Performance Optimizations
- [ ] Lazy loading of menu items
- [ ] Virtual scrolling for large menus
- [ ] Memoization of expensive calculations
- [ ] Bundle size optimization

## 📚 Related Modules

- **dropdowns/** - Action button dropdowns used in TopNavbar
- **selectors/** - Role/Location/Office selectors used in TopNavbar
- **layouts/** - Layout components rendered in main content area
- **ThemeProvider** - Theme system integration

## 🐛 Troubleshooting

### Common Issues

**Authentication not working:**
- Check Supabase configuration
- Verify environment variables
- Check browser console for errors

**Sidebar not collapsing:**
- Check localStorage permissions
- Verify CSS variables are loaded
- Check for JavaScript errors

**Logo not switching themes:**
- Verify logo files exist in public folder
- Check theme provider integration
- Verify CSS variables for theme detection

**Menu items not showing:**
- Check user role configuration
- Verify menu item role permissions
- Check navigationConfig.js setup

### Debug Mode

Enable debug logging:

```javascript
// In your app initialization
window.navigationDebug = true;
```

This will enable detailed console logging for authentication, role changes, and navigation events. 