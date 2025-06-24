import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown.jsx';
import { ThemeProvider } from './ThemeProvider.jsx';
import supabase from './supabaseClient.js';

function GlobalNavbarContent() {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
        animate={{ width: sidebarCollapsed ? 60 : 240 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          padding: sidebarCollapsed ? '0' : '0 1rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {!sidebarCollapsed && (
            <span style={{ 
              color: 'var(--text-primary)', 
              fontSize: '18px', 
              fontWeight: 600 
            }}>
              App
            </span>
          )}
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px'
            }}
            whileHover={{ backgroundColor: 'var(--bg-surface)' }}
          >
            {sidebarCollapsed ? '→' : '←'}
          </motion.button>
        </div>

        {/* Sidebar Content */}
        <div style={{ flex: 1, padding: '1rem 0' }}>
          {/* Navigation items would go here */}
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
          
          <ProfileDropdown user={session.user} onSignOut={handleSignOut} />
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