import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    console.log('Selected date:', date.toLocaleDateString());
    // TODO: Add calendar functionality here
    // Could emit event, update context, etc.
  };

  const quickActions = [
    { label: 'Today', action: () => handleDateClick(new Date()) },
    { label: 'Tomorrow', action: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      handleDateClick(tomorrow);
    }},
    { label: 'Next Week', action: () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      handleDateClick(nextWeek);
    }}
  ];

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Calendar Button */}
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
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
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <p style={{
                  margin: '2px 0 0 0',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  {selectedDate.toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <motion.button
                  onClick={() => navigateMonth(-1)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    width: '28px',
                    height: '28px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => navigateMonth(1)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    width: '28px',
                    height: '28px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div style={{ padding: '16px 20px' }}>
              {/* Day Headers */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '4px',
                marginBottom: '8px'
              }}>
                {dayNames.map(day => (
                  <div key={day} style={{
                    padding: '4px',
                    fontSize: '11px',
                    color: '#666',
                    textAlign: 'center',
                    fontWeight: 500
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '2px'
              }}>
                {getDaysInMonth(currentDate).map((date, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={!date}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      borderRadius: '4px',
                      background: !date ? 'transparent' : 
                                 isSelected(date) ? '#0070f3' :
                                 isToday(date) ? 'rgba(0, 112, 243, 0.2)' : 
                                 'transparent',
                      color: !date ? 'transparent' :
                             isSelected(date) ? 'white' :
                             isToday(date) ? '#0070f3' : 
                             '#999',
                      fontSize: '12px',
                      cursor: date ? 'pointer' : 'default',
                      fontWeight: isToday(date) || isSelected(date) ? 600 : 400
                    }}
                    whileHover={date ? { backgroundColor: isSelected(date) ? '#0070f3' : 'rgba(255, 255, 255, 0.1)' } : {}}
                    whileTap={date ? { scale: 0.9 } : {}}
                  >
                    {date ? date.getDate() : ''}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid #333'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Quick Select
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {quickActions.map(({ label, action }) => (
                  <motion.button
                    key={label}
                    onClick={action}
                    style={{
                      background: 'transparent',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      color: '#999',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 