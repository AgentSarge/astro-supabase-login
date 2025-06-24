import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown.jsx';
import FeedbackDropdown from './FeedbackDropdown.jsx';
import NotificationsDropdown from './NotificationsDropdown.jsx';
import CalendarDropdown from './CalendarDropdown.jsx';
import HelpDropdown from './HelpDropdown.jsx';
import AIAssistantDropdown from './AIAssistantDropdown.jsx';
import { ThemeProvider } from './ThemeProvider.jsx';
import supabase from './supabaseClient.js';

function GlobalNavbarContent() {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const dashboardDropdownRef = useRef(null);

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

  // Close dashboard dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dashboardDropdownRef.current && !dashboardDropdownRef.current.contains(event.target)) {
        setDashboardDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div style={{ flex: 1, padding: '1rem 0' }}>
          {/* Navigation items would go here */}
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
              fontFamily: '"JetBrains Mono", "Fira Code", "Source Code Pro", "Menlo", "Ubuntu Mono", "Courier New", monospace',
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
                    fontFamily: 'Inter, sans-serif'
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
          {/* Dashboard Dropdown */}
          <div ref={dashboardDropdownRef} style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                             style={{
                 background: 'transparent',
                 border: 'none',
                 color: 'white',
                 fontSize: '14px',
                 fontFamily: '"JetBrains Mono", "Fira Code", "Source Code Pro", "Menlo", "Ubuntu Mono", "Courier New", monospace',
                 fontWeight: 500,
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '6px',
                 padding: '4px 8px',
                 borderRadius: '4px'
               }}
              whileHover={{ backgroundColor: 'var(--bg-primary)' }}
              transition={{ duration: 0.05 }}
            >
              Dashboard
              
              {/* Up/Down Chevrons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
                  <path d="M2 5L6 1L10 5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
                  <path d="M2 1L6 5L10 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Forward Slash */}
              <span style={{ color: 'var(--text-secondary)', opacity: 0.5, marginLeft: '4px' }}>/</span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dashboardDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: '80px',
                    width: '200px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '0px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #333'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'white'
                    }}>
                      Navigation
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: '8px 0' }}>
                    <motion.button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        console.log('Navigate to Dashboard');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                      </svg>
                      Dashboard
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        console.log('Navigate to Analytics');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                      </svg>
                      Analytics
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        console.log('Navigate to Reports');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                      Reports
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        console.log('Navigate to Settings');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l-2.5 2.5M6.5 8.5L4 12l2.5 2.5"/>
                      </svg>
                      Settings
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

        {/* Main Content (Empty) */}
        <div style={{
          flex: 1,
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              opacity: 0.3
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>✨</div>
            <div style={{ fontSize: '14px', fontWeight: 300 }}>Blank Canvas</div>
          </motion.div>
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