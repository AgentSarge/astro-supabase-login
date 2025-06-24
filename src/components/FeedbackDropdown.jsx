import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleOptionClick = (type) => {
    setIsOpen(false);
    
    if (type === 'idea') {
      console.log('Redirecting to Ideas page...');
      // TODO: Navigate to ideas page
      // window.location.href = '/ideas';
    } else if (type === 'issues') {
      console.log('Redirecting to Issues page...');
      // TODO: Navigate to issues page
      // window.location.href = '/issues';
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Feedback Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '8px 12px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 500
        }}
        whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Feedback
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
              width: '180px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
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
                Send Feedback
              </div>
            </div>

            {/* Options */}
            <div style={{ padding: '8px 0' }}>
              {/* Idea Option */}
              <motion.button
                onClick={() => handleOptionClick('idea')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 2l-9 9"/>
                  <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 500 }}>Idea</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Share a feature idea</div>
                </div>
              </motion.button>

              {/* Issues Option */}
              <motion.button
                onClick={() => handleOptionClick('issues')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 500 }}>Issues</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Report a problem</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 