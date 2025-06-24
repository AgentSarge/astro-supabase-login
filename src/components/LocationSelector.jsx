import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LocationSelector = ({ selectedRole, userRole, onLocationChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const dropdownRef = useRef(null);

  // Determine user's office based on their role/profile
  const getUserOffice = (userRole) => {
    const roleStr = userRole?.toLowerCase() || '';
    // For now, assume office managers are tied to specific offices
    // Will Sargent (office manager) = Charleston office (but he's now VP for testing)
    if (roleStr.includes('office') || roleStr.includes('manager')) {
      return 'Charleston Office'; // Default for office managers
    }
    return 'Columbia Office'; // Default fallback
  };

  // Get available locations based on selected role
  const getAvailableLocations = (role, userRole) => {
    switch (role) {
      case 'Closer':
        return [
          {
            name: 'All Territories',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'All your assigned territories'
          },
          {
            name: 'Downtown Columbia',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ),
            description: 'Downtown Columbia area'
          },
          {
            name: 'West Columbia',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ),
            description: 'West Columbia neighborhoods'
          },
          {
            name: 'Forest Acres',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ),
            description: 'Forest Acres territory'
          },
          {
            name: 'Irmo',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ),
            description: 'Irmo area territory'
          }
        ];
      
      case 'Setter':
        return [
          {
            name: 'All Territories',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'All your assigned territories'
          },
          {
            name: 'North Charleston',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            ),
            description: 'North Charleston territory'
          },
          {
            name: 'Mount Pleasant',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            ),
            description: 'Mount Pleasant area'
          },
          {
            name: 'Summerville',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            ),
            description: 'Summerville territory'
          },
          {
            name: 'Goose Creek',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            ),
            description: 'Goose Creek area'
          }
        ];
      
      case 'Office':
        // Office view only shows the user's specific office
        const userOffice = getUserOffice(userRole);
        return [
          {
            name: userOffice,
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
            description: `${userOffice} operations`
          }
        ];
      
      case 'District':
        return [
          {
            name: 'All District Offices',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Columbia & Charleston combined'
          },
          {
            name: 'Columbia Office',
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
            description: 'Columbia office only'
          },
          {
            name: 'Charleston Office',
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
            description: 'Charleston office only'
          }
        ];
      
      case 'Regional':
        return [
          {
            name: 'South Carolina',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Columbia & Charleston offices'
          },
          {
            name: 'Virginia',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Virginia region offices'
          }
        ];
      
      case 'VP':
        return [
          {
            name: 'All Operations',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Executive overview of all operations'
          },
          {
            name: 'South Carolina',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Columbia & Charleston offices'
          },
          {
            name: 'Virginia',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3,6 9,1 15,6 21,1 21,14 15,9 9,14 3,9"/>
              </svg>
            ),
            description: 'Virginia region offices'
          }
        ];
      
      default:
        return [];
    }
  };

  const availableLocations = getAvailableLocations(selectedRole, userRole);

  // Set default location when role changes
  useEffect(() => {
    if (availableLocations.length > 0) {
      const defaultLocation = availableLocations[0].name;
      setSelectedLocation(defaultLocation);
      if (onLocationChange) {
        onLocationChange(defaultLocation);
      }
    }
  }, [selectedRole, availableLocations.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    setIsOpen(false);
    if (onLocationChange) {
      onLocationChange(location.name);
    }
    console.log(`Selected location: ${location.name} - ${location.description}`);
  };

  if (availableLocations.length === 0) {
    return null;
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Location Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          borderRadius: '4px'
        }}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        whileTap={{ scale: 0.98 }}
      >
        {selectedLocation}
        
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              minWidth: '240px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div style={{
              padding: '12px 16px 8px',
              borderBottom: '1px solid var(--border-color)',
              fontSize: '11px',
              fontWeight: 600,
                              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {(selectedRole === 'Closer' || selectedRole === 'Setter') ? 'Territory Selection' : 'Location Selection'}
            </div>

            {/* Menu Items */}
            <div style={{ padding: '8px 0' }}>
              {availableLocations.map((location) => (
                <motion.button
                  key={location.name}
                  onClick={() => handleLocationSelect(location)}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: selectedLocation === location.name ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  whileHover={{ backgroundColor: selectedLocation === location.name ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
                >
                  {location.icon}
                  <div>
                    <div style={{ fontWeight: 500 }}>{location.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                      {location.description}
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
};

export default LocationSelector; 