import { useState, useEffect } from 'react';
import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useSidebar } from '../hooks/useSidebar.js';
import { Sidebar } from './Sidebar.jsx';
import { TopNavbar } from './TopNavbar.jsx';

// Import layouts
import { DashboardLayout, RecordingsLayout } from '../../layouts/index.js';

/**
 * Loading Component
 */
function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      background: 'var(--bg-primary)'
    }}>
      {message}
    </div>
  );
}

/**
 * Main Navigation Component
 * Orchestrates authentication, sidebar, and top navbar
 */
export function Navigation({ children, className = '', style = {} }) {
  // Authentication state
  const { 
    session, 
    userProfile, 
    loading: authLoading, 
    userRole, 
    signOut, 
    isAuthenticated,
    user
  } = useAuth();

  // Sidebar state
  const {
    isCollapsed,
    isHovered,
    showTooltip,
    toggleCollapse,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipShow,
    handleTooltipHide
  } = useSidebar();

  // Selection state (role, location, office)
  const [selectedRole, setSelectedRole] = useState('Closer');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');

  // Update selectedRole when userProfile loads
  useEffect(() => {
    if (userRole) {
      setSelectedRole(userRole);
    }
  }, [userRole]);

  // Handle selection changes
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    // Reset location and office when role changes
    setSelectedLocation('');
    setSelectedOffice('');
    console.log('Role changed to:', role);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    // Reset office when location changes
    setSelectedOffice('');
    console.log('Location changed to:', location);
  };

  const handleOfficeChange = (office) => {
    setSelectedOffice(office);
    console.log('Office changed to:', office);
  };

  // Handle menu item clicks
  const [activeMenuItem, setActiveMenuItem] = useState('overview');

  const handleMenuItemClick = (item) => {
    console.log('Menu item clicked:', item);
    setActiveMenuItem(item.id);
    // Handle navigation logic here
  };

  // Show loading screen while authenticating
  if (authLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Show redirect message if not authenticated
  if (!isAuthenticated) {
    return <LoadingScreen message="Redirecting to login..." />;
  }

  // Ensure we have valid values
  const safeSelectedRole = selectedRole || userRole || 'Closer';
  const safeSelectedLocation = selectedLocation || '';
  const safeSelectedOffice = selectedOffice || '';

  return (
    <div 
      className={className}
      style={{ 
        height: '100vh', 
        display: 'flex', 
        background: 'var(--bg-primary)',
        ...style 
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        isHovered={isHovered}
        userRole={userRole}
        activeMenuItem={activeMenuItem}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onToggleCollapse={toggleCollapse}
        onMenuItemClick={handleMenuItemClick}
        showTooltip={showTooltip}
        onTooltipShow={handleTooltipShow}
        onTooltipHide={handleTooltipHide}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <TopNavbar
          selectedRole={safeSelectedRole}
          selectedLocation={safeSelectedLocation}
          selectedOffice={safeSelectedOffice}
          userRole={userRole}
          user={user}
          onRoleChange={handleRoleChange}
          onLocationChange={handleLocationChange}
          onOfficeChange={handleOfficeChange}
          onSignOut={signOut}
        />

        {/* Main Content */}
        <div style={{
          flex: 1,
          background: 'var(--bg-primary)',
          overflow: 'auto'
        }}>
          {/* Conditionally render content based on active menu item */}
          {activeMenuItem === 'recordings' ? (
            <RecordingsLayout 
              selectedRole={safeSelectedRole} 
              selectedLocation={safeSelectedLocation} 
              selectedOffice={safeSelectedOffice} 
            />
          ) : (
            /* Pass selection state to children */
            React.isValidElement(children) ? 
              React.cloneElement(children, { 
                selectedRole: safeSelectedRole, 
                selectedLocation: safeSelectedLocation, 
                selectedOffice: safeSelectedOffice 
              }) :
              children
          )}
        </div>
      </div>
    </div>
  );
} 