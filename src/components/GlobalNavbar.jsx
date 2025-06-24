import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown.jsx';
import FeedbackDropdown from './FeedbackDropdown.jsx';
import NotificationsDropdown from './NotificationsDropdown.jsx';
import CalendarDropdown from './CalendarDropdown.jsx';
import HelpDropdown from './HelpDropdown.jsx';
import AIAssistantDropdown from './AIAssistantDropdown.jsx';
import RoleSelector from './RoleSelector.jsx';
import LocationSelector from './LocationSelector.jsx';
import OfficeSelector from './OfficeSelector.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import { ThemeProvider, useTheme } from './ThemeProvider.jsx';
import supabase from './supabaseClient.js';

function GlobalNavbarContent() {
  const { currentTheme } = useTheme();
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Closer');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setLoading(false);
      // If not authenticated, redirect to home
      if (!session) {
        console.log('No session, redirecting to home');
        window.location.href = '/';
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      if (!session && event === 'SIGNED_OUT') {
        console.log('User signed out, redirecting to home');
        window.location.href = '/';
      }
    });
    
        return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.email) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
          } else {
            setUserProfile(data);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  // Update selectedRole when userProfile loads
  useEffect(() => {
    if (userProfile?.role) {
      // Transform the role to match the format expected by RoleSelector
      const transformRole = (role) => {
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
      
      const transformedRole = transformRole(userProfile.role);
      setSelectedRole(transformedRole);
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    try {
      console.log('Starting sign out process...');
      setLoading(true);
      
      // Clear local session first
      setSession(null);
      
      // Try to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      // Even if there's an error (like session missing), still redirect
      if (error) {
        console.warn('Sign out error (but continuing):', error.message);
      } else {
        console.log('Sign out successful');
      }
      
      // Always redirect regardless of error
      console.log('Redirecting to home...');
      window.location.href = '/';
      
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      // Force redirect even on error
      setSession(null);
      window.location.href = '/';
    }
  };

  // Function to get the appropriate logo based on theme
  const getLogo = () => {
    // Determine if we should use the light or dark logo
    const isLightTheme = currentTheme === 'light';
    const isSystemAndLight = currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (isLightTheme || isSystemAndLight) {
      return '/BLK_txt_Logo.jpg'; // Black text logo for light themes
    } else {
      return '/white_txt_logo.jpg'; // White text logo for dark themes
    }
  };

  // Function to render role-specific menu items - currently just returns empty for Overview only
  const renderRoleSpecificMenu = () => {
    // For now, we only show Overview, so no additional menu items
    return [];
  };

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--bg-primary)'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--bg-primary)'
      }}>
        Redirecting to login...
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarCollapsed ? 60 : 240 }}
        animate={{ width: (sidebarCollapsed && !sidebarHovered) ? 60 : 240 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Sidebar Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Logo Section */}
          <div style={{ 
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: (sidebarCollapsed && !sidebarHovered) ? 'center' : 'flex-start',
            padding: (sidebarCollapsed && !sidebarHovered) ? '0' : '0 1rem'
          }}>
            {!(sidebarCollapsed && !sidebarHovered) ? (
              <img 
                src={getLogo()}
                alt="ION Solar"
                style={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <img 
                src="/collapsed_w_txt.png" 
                alt="ION"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
            )}
          </div>
          
          {/* Divider line */}
          <div style={{
            height: '1px',
            background: 'var(--border-color)',
            margin: '0'
          }}></div>
          
          {/* Navigation Menu */}
          <nav style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px',
            padding: '1rem 0'
          }}>
            {/* Overview - Universal for all roles */}
            <div style={{
              padding: (sidebarCollapsed && !sidebarHovered) ? '12px' : '12px 16px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
              cursor: 'pointer',
              borderRadius: '6px',
              margin: '0 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.15s ease',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--bg-surface)';
              e.target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.opacity = '1';
            }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              {!(sidebarCollapsed && !sidebarHovered) && (
                <span>Overview</span>
              )}
            </div>

            {/* Role-specific menu items */}
            {renderRoleSpecificMenu()}
          </nav>
        </div>

        {/* Sidebar Footer (moved from header) */}
        <div style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: (sidebarCollapsed && !sidebarHovered) ? 'center' : 'space-between',
          padding: (sidebarCollapsed && !sidebarHovered) ? '0' : '0 1rem',
          borderTop: '1px solid var(--border-color)',
          position: 'relative'
        }}>
          {!(sidebarCollapsed && !sidebarHovered) && (
            <span style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '10px', 
              fontWeight: 600,
              fontFamily: '"Geist Mono", "JetBrains Mono", "Fira Code", "Source Code Pro", "Menlo", monospace',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              SalesTag
            </span>
          )}
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              position: 'relative'
            }}
            whileHover={{ backgroundColor: 'var(--bg-surface)' }}
          >
            {(sidebarCollapsed && !sidebarHovered) ? '→' : '←'}
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '8px',
                    padding: '6px 10px',
                    background: '#2a2a2a',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    border: '1px solid #444',
                    zIndex: 1000,
                    fontFamily: '"Geist", "Inter", sans-serif'
                  }}
                >
                  {sidebarCollapsed ? 'Expand on hover' : 'Collapse sidebar'}
                  {/* Tooltip arrow */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid #2a2a2a'
                  }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <div style={{
          height: '60px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          {/* Role, Location & Office Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RoleSelector 
              userRole={userProfile?.role || 'Closer'} 
              onRoleChange={(role) => {
                setSelectedRole(role);
                // Reset location and office when role changes
                setSelectedLocation('');
                setSelectedOffice('');
                console.log('Role changed to:', role);
              }}
            />
            <LocationSelector 
              selectedRole={selectedRole}
              userRole={userProfile?.role || 'Closer'}
              onLocationChange={(location) => {
                setSelectedLocation(location);
                // Reset office when location changes
                setSelectedOffice('');
                console.log('Location changed to:', location);
              }}
            />
            {/* Office Selector - Only show for Regional/VP view when a state is selected */}
            {(selectedRole === 'Regional' || selectedRole === 'VP') && (selectedLocation === 'South Carolina' || selectedLocation === 'Virginia') && (
              <OfficeSelector 
                selectedState={selectedLocation}
                onOfficeChange={(office) => {
                  setSelectedOffice(office);
                  console.log('Office changed to:', office);
                }}
              />
            )}
          </div>
          
          {/* Navigation Pills & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Feedback Dropdown - Now functional */}
            <FeedbackDropdown />

            {/* Divider */}
            <div style={{
              width: '1px',
              height: '20px',
              background: 'var(--text-secondary)',
              margin: '0 8px'
            }} />

            {/* Calendar Dropdown - Now functional */}
            <CalendarDropdown />

            {/* Notifications - Now functional */}
            <NotificationsDropdown />

            {/* Help Dropdown - Now functional */}
            <HelpDropdown />

            {/* AI Assistant Dropdown - Now functional */}
            <AIAssistantDropdown />

            {/* Divider */}
            <div style={{
              width: '1px',
              height: '20px',
              background: 'var(--text-secondary)',
              margin: '0 8px'
            }} />

            {/* Profile Dropdown */}
            <ProfileDropdown user={session.user} onSignOut={handleSignOut} />
          </div>
        </div>

        {/* Main Content - Dynamic Dashboard */}
        <div style={{
          flex: 1,
          background: 'var(--bg-primary)',
          overflow: 'hidden'
        }}>
          <DashboardLayout 
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
          />
        </div>
      </div>
    </div>
  );
}

export default function GlobalNavbar() {
  return (
    <ThemeProvider>
      <GlobalNavbarContent />
    </ThemeProvider>
  );
} 