import { 
  RoleSelector,
  LocationSelector,
  OfficeSelector
} from '../../selectors/index.js';
import { 
  ProfileDropdown,
  FeedbackDropdown,
  NotificationsDropdown,
  CalendarDropdown,
  HelpDropdown,
  AIAssistantDropdown
} from '../../dropdowns/index.js';
import { topNavbarConfig } from '../config/navigationConfig.js';

/**
 * Navbar Divider Component
 */
function NavbarDivider() {
  return (
    <div style={{
      width: '1px',
      height: '20px',
      background: 'var(--text-secondary)',
      margin: '0 8px'
    }} />
  );
}

/**
 * Top Navbar Component
 * Contains role selectors and action buttons
 */
export function TopNavbar({
  // Selection state
  selectedRole,
  selectedLocation,
  selectedOffice,
  
  // User data
  userRole,
  user,
  
  // Handlers
  onRoleChange,
  onLocationChange,
  onOfficeChange,
  onSignOut,
  
  // Styling
  className = '',
  style = {}
}) {
  return (
    <div
      className={className}
      style={{
        height: `${topNavbarConfig.height}px`,
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: topNavbarConfig.padding,
        position: 'relative',
        zIndex: 100,
        pointerEvents: 'auto',
        ...style
      }}
    >
      {/* Left Section: Role, Location & Office Selectors */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <RoleSelector 
          userRole={userRole} 
          onRoleChange={onRoleChange}
        />
        
        <LocationSelector 
          selectedRole={selectedRole}
          userRole={userRole}
          onLocationChange={onLocationChange}
        />
        
        {/* Office Selector - Only show for Regional/VP view when a state is selected */}
        {(selectedRole === 'Regional' || selectedRole === 'VP') && 
         (selectedLocation === 'South Carolina' || selectedLocation === 'Virginia') && (
          <OfficeSelector 
            selectedState={selectedLocation}
            onOfficeChange={onOfficeChange}
          />
        )}
      </div>
      
      {/* Right Section: Action Buttons & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Feedback Dropdown */}
        <FeedbackDropdown />

        <NavbarDivider />

        {/* Calendar Dropdown */}
        <CalendarDropdown />

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Help Dropdown */}
        <HelpDropdown />

        {/* AI Assistant Dropdown */}
        <AIAssistantDropdown />

        <NavbarDivider />

        {/* Profile Dropdown */}
        <ProfileDropdown user={user} onSignOut={onSignOut} />
      </div>
    </div>
  );
} 