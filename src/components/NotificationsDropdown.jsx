import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New lead assigned',
      message: 'John Smith has been assigned to your territory',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Deal closed',
      message: 'Congratulations! Deal with Acme Corp closed for $15,000',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Follow-up reminder',
      message: 'Don\'t forget to follow up with Sarah Johnson',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'System update',
      message: 'SalesTag has been updated with new features',
      time: '1 day ago',
      read: true
    }
  ]);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Notifications Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
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
          justifyContent: 'center',
          position: 'relative'
        }}
        whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {/* Notification badge */}
        {unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: '#ff4757',
            borderRadius: '50%',
            border: '2px solid var(--bg-surface)'
          }} />
        )}
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
              width: '380px',
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
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'white'
                }}>
                  Notifications
                </h3>
                <p style={{
                  margin: '2px 0 0 0',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  {unreadCount} unread
                </p>
              </div>
              {unreadCount > 0 && (
                <motion.button
                  onClick={markAllAsRead}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#0070f3',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                  whileHover={{ backgroundColor: 'rgba(0, 112, 243, 0.1)' }}
                >
                  Mark all read
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 16px' }}>
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <p style={{ margin: 0, fontSize: '14px' }}>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #333',
                      cursor: 'pointer',
                      backgroundColor: notification.read ? 'transparent' : 'rgba(0, 112, 243, 0.05)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    {/* Icon */}
                    <div style={{ marginTop: '2px' }}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'white',
                        marginBottom: '4px'
                      }}>
                        {notification.title}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#999',
                        marginBottom: '6px',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#666'
                      }}>
                        {notification.time}
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#0070f3',
                        borderRadius: '50%',
                        marginTop: '6px'
                      }} />
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid #333',
              textAlign: 'center'
            }}>
              <motion.button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0070f3',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
                whileHover={{ backgroundColor: 'rgba(0, 112, 243, 0.1)' }}
              >
                View all notifications
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 