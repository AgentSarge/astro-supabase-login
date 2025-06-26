import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Sample top offices data
const getTopOfficesData = () => {
  return [
    {
      id: 1,
      name: 'Charleston',
      location: 'South Carolina',
      avatar: '🏢',
      stats: {
        revenue: '$2.4M',
        team: '24',
        growth: '+18%'
      },
      status: 'active'
    },
    {
      id: 2,
      name: 'Richmond',
      location: 'Virginia',
      avatar: '🏢',
      stats: {
        revenue: '$2.1M',
        team: '19',
        growth: '+15%'
      },
      status: 'active'
    },
    {
      id: 3,
      name: 'Columbia',
      location: 'South Carolina',
      avatar: '🏢',
      stats: {
        revenue: '$1.8M',
        team: '16',
        growth: '+12%'
      },
      status: 'active'
    },
    {
      id: 4,
      name: 'Norfolk',
      location: 'Virginia',
      avatar: '🏢',
      stats: {
        revenue: '$1.6M',
        team: '14',
        growth: '+8%'
      },
      status: 'active'
    }
  ];
};

const OfficeCard = ({ office, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleManage = () => {
    console.log(`Manage ${office.name}`);
    // TODO: Implement office management functionality
  };

  const handleReports = () => {
    console.log(`View reports for ${office.name}`);
    // TODO: Implement office reports functionality
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
      {/* Office Type Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: '#0070f3',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: '"Geist", "Inter", sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Office
      </div>

      {/* Office Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: 'white',
          fontFamily: '"Geist", "Inter", sans-serif',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
        }}>
          {office.avatar}
        </div>
      </div>

      {/* Office Name and Location */}
      <div style={{
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: '4px',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {office.name}
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          margin: 0,
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {office.location}
        </p>
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
            {office.stats.revenue}
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
            {office.stats.team}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Team Size
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#10b981',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {office.stats.growth}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Growth
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
          onClick={handleManage}
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
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Manage
        </motion.button>

        <motion.button
          onClick={handleReports}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: '#f59e0b',
            border: '1px solid #f59e0b',
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
            background: '#d97706',
            borderColor: '#d97706'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          </svg>
          Reports
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function TopOfficesSection({ selectedRole, selectedLocation, selectedOffice }) {
  const officesData = getTopOfficesData();
  const [selectedPeriod, setSelectedPeriod] = useState('this month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const timePeriods = [
    'this month',
    'last month', 
    'this quarter',
    'last quarter',
    'this year'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              Top Offices
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              margin: 0
            }}>
              Your highest performing office locations {selectedPeriod}
            </p>
          </div>

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
                {timePeriods.map((period) => (
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

        {/* Offices Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {officesData.map((office, index) => (
            <OfficeCard key={office.id} office={office} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 