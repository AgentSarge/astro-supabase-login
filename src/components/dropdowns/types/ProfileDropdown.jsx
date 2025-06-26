import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../ThemeProvider.jsx';
import supabase from '../../supabaseClient.js';

export default function ProfileDropdown({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  
  // Fetch theme context
  let currentTheme = 'dark';
  let themes = {
    dark: { name: 'Dark' },
    light: { name: 'Light' },
    classicDark: { name: 'Classic Dark' },
    monokai: { name: 'Monokai' },
    monokaiDimmed: { name: 'Monokai Dimmed' },
    dracula: { name: 'Dracula' },
    oneDark: { name: 'One Dark' },
    nord: { name: 'Nord' },
    highContrast: { name: 'High Contrast' },
    red: { name: 'Red' }
  };
  let changeTheme = () => {};

  try {
    const themeContext = useTheme();
    currentTheme = themeContext.currentTheme;
    themes = themeContext.themes;
    changeTheme = themeContext.changeTheme;
  } catch (error) {
    console.warn('Theme context not available, using defaults');
  }

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          console.warn('Could not fetch profile:', error.message);
          setProfile(null);
        } else {
          console.log('Profile data:', data);
          setProfile(data);
        }
      } catch (err) {
        console.warn('Error fetching profile:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for profile icon
  const getInitials = (name, email) => {
    if (name && name.trim()) {
      // Use full name if available
      const nameParts = name.trim().split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      } else {
        return nameParts[0].substring(0, 2).toUpperCase();
      }
    }
    // Fallback to email
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (profile?.full_name && profile.full_name.trim()) {
      return profile.full_name;
    }
    return user.email.split('@')[0];
  };

  const handleLogout = async () => {
    console.log('ProfileDropdown: Logout clicked');
    setIsOpen(false);
    
    try {
      // Try the parent's onSignOut first
      if (onSignOut) {
        console.log('ProfileDropdown: Calling parent onSignOut');
        await onSignOut();
      } else {
        // Fallback: direct Supabase logout
        console.log('ProfileDropdown: No parent onSignOut, using direct logout');
        
        // Try to sign out, but don't fail if session is missing
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.warn('Direct logout error (continuing anyway):', error.message);
          } else {
            console.log('Direct logout successful');
          }
        } catch (logoutError) {
          console.warn('Logout failed, but continuing:', logoutError.message);
        }
        
        // Always redirect
        console.log('Redirecting to home...');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error, forcing redirect:', error);
      // Force redirect no matter what
      window.location.href = '/';
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Profile Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#0070f3',
          border: 'none',
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? '...' : getInitials(profile?.full_name, user.email)}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '45px',
              right: '0',
              width: '240px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              overflow: 'hidden'
            }}
          >
            {/* User Info */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #333'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'white',
                marginBottom: '4px'
              }}>
                {loading ? 'Loading...' : getDisplayName()}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999',
                opacity: 0.9
              }}>
                {user.email}
              </div>
              {profile?.role && (
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '4px',
                  textTransform: 'capitalize'
                }}>
                  {profile.role}
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div style={{ padding: '8px 0' }}>
              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  // Add account preferences action here
                }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Account preferences
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  // Add feature previews action here
                }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 2v6h6V2"/>
                  <path d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2"/>
                  <path d="M9 16v-4h6v4"/>
                  <path d="M12 16v2"/>
                </svg>
                Feature previews
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  // Add command menu action here
                }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
                Command menu
              </motion.button>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: '#333',
                margin: '8px 0'
              }} />

              {/* Theme Section */}
              <div style={{
                padding: '8px 20px 12px 20px',
                fontSize: '12px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 500
              }}>
                Theme
              </div>

              {/* Theme Options */}
              {Object.entries(themes)
                .filter(([themeKey]) => themeKey !== 'system')
                .map(([themeKey, theme]) => (
                  <motion.button
                    key={themeKey}
                    onClick={() => {
                      changeTheme(themeKey);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 20px',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      position: 'relative'
                    }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: currentTheme === themeKey ? (themes[themeKey].colors?.accent || '#0070f3') : 'transparent',
                      border: currentTheme === themeKey ? 'none' : '1px solid #666',
                      marginLeft: '4px'
                    }} />
                    {theme.name}
                  </motion.button>
                ))}

              {/* Divider */}
              <div style={{
                height: '1px',
                background: '#333',
                margin: '8px 0'
              }} />

              {/* Sign Out */}
              <motion.button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                Log out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 