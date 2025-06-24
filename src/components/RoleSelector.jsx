import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoleSelector({ userRole = 'Closer', onRoleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Transform role names to display format
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
  
  const [selectedRole, setSelectedRole] = useState(transformRole(userRole));
  const dropdownRef = useRef(null);

  // Get available roles based on user's actual role
  const getAvailableRoles = (userRole) => {
    const transformedRole = transformRole(userRole);
    
    // Role hierarchy: VP > Regional > District > Office > Setter/Closer
    const allRoles = [
      {
        name: 'Closer',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
        description: 'Personal deals and closing'
      },
      {
        name: 'Setter',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M3 10h18"/>
            <path d="M8 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
          </svg>
        ),
        description: 'Appointment setting and leads'
      },
      {
        name: 'Office',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18"/>
            <path d="M5 21V7l8-4v18"/>
            <path d="M19 21V11l-6-4"/>
            <path d="M9 9v.01"/>
            <path d="M9 12v.01"/>
            <path d="M9 15v.01"/>
            <path d="M9 18v.01"/>
          </svg>
        ),
        description: 'Office-level view'
      },
      {
        name: 'District',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
          </svg>
        ),
        description: 'Multiple offices (Columbia, Charleston)'
      },
      {
        name: 'Regional',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
          </svg>
        ),
        description: 'All regions (Virginia, South Carolina)'
      },
      {
        name: 'VP',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        description: 'Executive view - all operations'
      }
    ];

    // Return available roles based on user's role
    switch (transformedRole) {
      case 'VP':
        return allRoles; // VP can see all views including their own
      case 'Regional':
        return allRoles.filter(role => ['Closer', 'Setter', 'Office', 'District', 'Regional'].includes(role.name)); // Can see all except VP
      case 'District':
        return allRoles.filter(role => ['Closer', 'Setter', 'Office', 'District'].includes(role.name));
      case 'Office':
        return allRoles.filter(role => ['Closer', 'Setter', 'Office'].includes(role.name));
      case 'Setter':
        return allRoles.filter(role => ['Setter', 'Closer'].includes(role.name)); // Can switch between setter and closer views
      case 'Closer':
      default:
        return allRoles.filter(role => ['Closer', 'Setter'].includes(role.name)); // Can switch between closer and setter views
    }
  };

  const availableRoles = getAvailableRoles(userRole);

  // Update selected role when userRole prop changes
  useEffect(() => {
    setSelectedRole(transformRole(userRole));
  }, [userRole]);

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

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
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
        {selectedRole}
        
        {/* Up/Down Chevrons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M2 5L6 1L10 5" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M2 1L6 5L10 1" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Forward Slash */}
        <span style={{ color: 'var(--text-secondary)', opacity: 0.5, marginLeft: '4px' }}>/</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              width: '200px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)'
              }}>
                Role Selection
              </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '8px 0' }}>
              {availableRoles.map((role) => (
                <motion.button
                  key={role.name}
                  onClick={() => {
                    setSelectedRole(role.name);
                    setIsOpen(false);
                    if (onRoleChange) {
                      onRoleChange(role.name);
                    }
                    console.log(`Selected role: ${role.name} - ${role.description}`);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: selectedRole === role.name ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  whileHover={{ backgroundColor: selectedRole === role.name ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
                >
                  {role.icon}
                  <div>
                    <div style={{ fontWeight: 500 }}>{role.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                      {role.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 