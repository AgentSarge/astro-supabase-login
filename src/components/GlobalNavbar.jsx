import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown.jsx';
import FeedbackDropdown from './FeedbackDropdown.jsx';
import NotificationsDropdown from './NotificationsDropdown.jsx';
import { ThemeProvider } from './ThemeProvider.jsx';
import supabase from './supabaseClient.js';

function GlobalNavbarContent() {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(true);

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
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Dashboard
          </div>
          
          {/* Navigation Pills & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Feedback Dropdown - Now functional */}
            <FeedbackDropdown />

            {/* Calendar */}
            <motion.button
              onClick={() => {
                // TODO: Add calendar functionality
                console.log('Calendar clicked');
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </motion.button>

            {/* Notifications - Now functional */}
            <NotificationsDropdown />

            {/* Help */}
            <motion.button
              onClick={() => {
                // TODO: Add help functionality
                console.log('Help clicked');
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <point cx="12" cy="17" stroke="currentColor" strokeWidth="3"/>
              </svg>
            </motion.button>

            {/* Settings */}
            <motion.button
              onClick={() => {
                // TODO: Add settings functionality
                console.log('Settings clicked');
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l-2.5 2.5M6.5 8.5L4 12l2.5 2.5"/>
              </svg>
            </motion.button>

            {/* Divider */}
            <div style={{
              width: '1px',
              height: '24px',
              background: 'var(--border-color)',
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