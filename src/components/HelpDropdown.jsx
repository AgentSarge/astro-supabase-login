import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpDropdown() {
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

  const helpItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      title: 'Documentation',
      description: 'Complete guides and tutorials',
      action: () => {
        console.log('Opening documentation...');
        // TODO: Navigate to documentation
        // window.open('/docs', '_blank');
      }
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 2l-9 9"/>
          <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
        </svg>
      ),
      title: 'Getting Started',
      description: 'Quick setup and onboarding',
      action: () => {
        console.log('Opening getting started guide...');
        // TODO: Navigate to getting started
        // window.open('/getting-started', '_blank');
      }
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <point cx="12" cy="17" stroke="currentColor" strokeWidth="3"/>
        </svg>
      ),
      title: 'FAQ',
      description: 'Frequently asked questions',
      action: () => {
        console.log('Opening FAQ...');
        // TODO: Navigate to FAQ
        // window.open('/faq', '_blank');
      }
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M13 8H7"/>
          <path d="M17 12H7"/>
        </svg>
      ),
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => {
        console.log('Opening support chat...');
        // TODO: Open support chat/email
        // window.open('mailto:support@salestag.com');
      }
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: 'Schedule Call',
      description: 'Book a demo or consultation',
      action: () => {
        console.log('Opening calendar booking...');
        // TODO: Open calendar booking
        // window.open('/book-demo', '_blank');
      }
    }
  ];

  const quickLinks = [
    { label: 'Keyboard Shortcuts', action: () => console.log('Show shortcuts') },
    { label: 'Video Tutorials', action: () => console.log('Open tutorials') },
    { label: 'Release Notes', action: () => console.log('Show updates') }
  ];

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Help Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          width: '32px',
          height: '32px',
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
              width: '280px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #333'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: 'white'
              }}>
                Help & Support
              </h3>
              <p style={{
                margin: '2px 0 0 0',
                fontSize: '12px',
                color: '#999'
              }}>
                Get help and learn more about SalesTag
              </p>
            </div>

            {/* Help Items */}
            <div style={{ padding: '8px 0' }}>
              {helpItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    item.action();
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
                  <div style={{ minWidth: '16px' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {item.description}
                    </div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: '#333',
              margin: '8px 0'
            }} />

            {/* Quick Links */}
            <div style={{ padding: '8px 20px 16px 20px' }}>
              <div style={{
                fontSize: '11px',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {quickLinks.map(({ label, action }) => (
                  <motion.button
                    key={label}
                    onClick={() => {
                      setIsOpen(false);
                      action();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0070f3',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '4px 0'
                    }}
                    whileHover={{ color: '#0051cc' }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid #333',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#666',
                textAlign: 'center'
              }}>
                Need more help?{' '}
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    console.log('Opening support center...');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0070f3',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  whileHover={{ color: '#0051cc' }}
                >
                  Visit Support Center
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 