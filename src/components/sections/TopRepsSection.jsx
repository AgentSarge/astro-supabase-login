import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Sample top reps data
const getTopRepsData = () => {
  return [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Setter',
      avatar: 'SJ',
      stats: {
        revenue: '$180K',
        deals: '24',
        rate: '82%'
      },
      status: 'online'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Setter',
      avatar: 'MC',
      stats: {
        revenue: '$165K',
        deals: '31',
        rate: '78%'
      },
      status: 'online'
    },
    {
      id: 3,
      name: 'Jessica Rodriguez',
      role: 'Closer',
      avatar: 'JR',
      stats: {
        revenue: '$142K',
        deals: '19',
        rate: '85%'
      },
      status: 'away'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Manager',
      avatar: 'DK',
      stats: {
        revenue: '$138K',
        deals: '22',
        rate: '79%'
      },
      status: 'offline'
    }
  ];
};

const RepCard = ({ rep, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleMessage = () => {
    console.log(`Message ${rep.name}`);
    // TODO: Implement messaging functionality
  };

  const handleStats = () => {
    console.log(`View stats for ${rep.name}`);
    // TODO: Implement stats view functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        minHeight: '200px',
        position: 'relative',
        overflow: 'hidden'
      }}
      whileHover={{ 
        borderColor: 'rgba(0, 112, 243, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        y: -2
      }}
    >
      {/* Role Pill Tag */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: rep.role === 'Manager' ? '#8b5cf6' : rep.role === 'Closer' ? '#ef4444' : '#10b981',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: '"Geist", "Inter", sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {rep.role}
      </div>

      {/* Avatar */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: 'white',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {rep.avatar}
        </div>
        
        {/* Status indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: getStatusColor(rep.status),
          border: '2px solid var(--bg-surface)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }} />
      </div>

      {/* Name */}
      <div style={{
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {rep.name}
        </h3>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        gap: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {rep.stats.revenue}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Revenue
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {rep.stats.deals}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Deals
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {rep.stats.rate}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Close Rate
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        width: '100%',
        marginTop: 'auto'
      }}>
        <motion.button
          onClick={handleMessage}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            fontFamily: '"Geist", "Inter", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          whileHover={{ 
            background: 'var(--bg-surface)',
            borderColor: 'rgba(0, 112, 243, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Message
        </motion.button>

        <motion.button
          onClick={handleStats}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: '#0070f3',
            border: '1px solid #0070f3',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'white',
            fontFamily: '"Geist", "Inter", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          whileHover={{ 
            background: '#0056b3',
            borderColor: '#0056b3'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          </svg>
          Stats
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function TopRepsSection({ selectedRole, selectedLocation, selectedOffice }) {
  const repsData = getTopRepsData();
  const [selectedPeriod, setSelectedPeriod] = useState('this month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const dropdownRef = useRef(null);
  const manageRef = useRef(null);

  const timePeriods = [
    'this month',
    'last month', 
    'this quarter',
    'last quarter',
    'this year'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (manageRef.current && !manageRef.current.contains(event.target)) {
        setIsManageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get section title based on role
  const getSectionTitle = () => {
    if (selectedRole === 'Closer' || selectedRole === 'Setter') {
      return 'Rep Tracker';
    }
    return 'Top Reps';
  };

  // Get subtitle based on role
  const getSubtitle = () => {
    if (selectedRole === 'Closer' || selectedRole === 'Setter') {
      return `Track your top ${selectedRole.toLowerCase()}s ${selectedPeriod}`;
    }
    return `Your highest performing team members ${selectedPeriod}`;
  };

  // Get time periods based on role
  const getTimePeriods = () => {
    if (selectedRole === 'Closer' || selectedRole === 'Setter') {
      return ['this week', 'this month', 'this quarter', 'this year'];
    }
    return ['this month', 'last month', 'this quarter', 'last quarter', 'this year'];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-primary)',
        padding: '48px 80px',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Section Header - Left aligned like Overview */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
          marginLeft: '60px',
          marginRight: '60px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              margin: 0
            }}>
              {getSectionTitle()}
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              margin: 0
            }}>
              {getSubtitle()}
            </p>
          </div>

          {/* Right Side Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Manage Following Button (for individual roles only) */}
            {(selectedRole === 'Closer' || selectedRole === 'Setter') && (
              <div ref={manageRef} style={{ position: 'relative' }}>
                <motion.button
                  onClick={() => setIsManageOpen(!isManageOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  whileHover={{
                    borderColor: 'rgba(0, 112, 243, 0.3)',
                    background: 'var(--bg-primary)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </motion.button>

                {/* Manage Dropdown */}
                {isManageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      background: '#2a2a2a',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      zIndex: 1000,
                      minWidth: '180px',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      padding: '8px 12px',
                      fontSize: '11px',
                      color: '#999',
                      fontFamily: '"Geist", "Inter", sans-serif',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #333'
                    }}>
                      Manage Following
                    </div>
                    {['Add Rep to Track', 'Remove Rep', 'Edit Tracking List', 'Reset to Defaults'].map((action) => (
                      <motion.div
                        key={action}
                        onClick={() => {
                          console.log(action);
                          setIsManageOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          fontSize: '12px',
                          color: 'white',
                          fontFamily: '"Geist", "Inter", sans-serif',
                          cursor: 'pointer'
                        }}
                        whileHover={{
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {action}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Time Period Selector */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize'
              }}
              whileHover={{
                borderColor: 'rgba(0, 112, 243, 0.3)',
                background: 'var(--bg-primary)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedPeriod}
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </motion.button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  background: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  zIndex: 1000,
                  minWidth: '140px',
                  overflow: 'hidden'
                }}
              >
                {getTimePeriods().map((period) => (
                  <motion.div
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: selectedPeriod === period ? '#0070f3' : 'white',
                      fontFamily: '"Geist", "Inter", sans-serif',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      background: selectedPeriod === period ? 'rgba(0, 112, 243, 0.1)' : 'transparent'
                    }}
                    whileHover={{
                      background: selectedPeriod === period ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {period}
                  </motion.div>
                ))}
              </motion.div>
            )}
            </div>
          </div>
        </div>

        {/* Reps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {repsData.map((rep, index) => (
            <RepCard key={rep.id} rep={rep} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 