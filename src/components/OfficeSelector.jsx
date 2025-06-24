import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OfficeSelector = ({ selectedState, onOfficeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('');
  const dropdownRef = useRef(null);

  // Get available offices based on selected state
  const getAvailableOffices = (state) => {
    switch (state) {
      case 'South Carolina':
        return [
          {
            name: 'All SC Offices',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
              </svg>
            ),
            description: 'Overview of all South Carolina offices'
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
            description: 'Columbia, SC office'
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
            description: 'Charleston, SC office'
          }
        ];
      
      case 'Virginia':
        return [
          {
            name: 'All VA Offices',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
              </svg>
            ),
            description: 'Overview of all Virginia offices'
          },
          {
            name: 'Richmond Office',
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
            description: 'Richmond, VA office'
          },
          {
            name: 'Virginia Beach Office',
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
            description: 'Virginia Beach, VA office'
          }
        ];
      
      default:
        return [];
    }
  };

  const availableOffices = getAvailableOffices(selectedState);

  // Set default office when state changes
  useEffect(() => {
    if (availableOffices.length > 0) {
      const defaultOffice = availableOffices[0].name;
      setSelectedOffice(defaultOffice);
      if (onOfficeChange) {
        onOfficeChange(defaultOffice);
      }
    } else {
      setSelectedOffice('');
      if (onOfficeChange) {
        onOfficeChange('');
      }
    }
  }, [selectedState, availableOffices.length]);

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

  const handleOfficeSelect = (office) => {
    setSelectedOffice(office.name);
    setIsOpen(false);
    if (onOfficeChange) {
      onOfficeChange(office.name);
    }
    console.log(`Selected office: ${office.name} - ${office.description}`);
  };

  if (availableOffices.length === 0 || !selectedState) {
    return null;
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Office Selector Button */}
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
        {selectedOffice}
        
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
              minWidth: '200px',
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
              Office Selection
            </div>

            {/* Menu Items */}
            <div style={{ padding: '8px 0' }}>
              {availableOffices.map((office) => (
                <motion.button
                  key={office.name}
                  onClick={() => handleOfficeSelect(office)}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: selectedOffice === office.name ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  whileHover={{ backgroundColor: selectedOffice === office.name ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
                >
                  {office.icon}
                  <div>
                    <div style={{ fontWeight: 500 }}>{office.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                      {office.description}
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

export default OfficeSelector; 