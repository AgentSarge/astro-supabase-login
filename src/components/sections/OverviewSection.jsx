import { motion } from 'framer-motion';
import { useState } from 'react';
import { MetricCard } from '../metrics/index.js';

// Function to get role-specific data
const getRoleData = (role, location, office) => {
  // This will be dynamic based on selections - for now using sample data
  const baseData = {
    VP: {
      title: 'Executive Overview',
      badge: 'VP',
      badgeColor: '#8b5cf6',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
          title: 'Total Revenue',
          value: '$2.3M',
          change: '+12.5%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          ),
          title: 'Active Deals',
          value: '142',
          change: '+8',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Conversion Rate',
          value: '68%',
          change: '+2.1%',
          changeType: 'positive'
        }
      ]
    },
    Regional: {
      title: 'Regional Overview',
      badge: 'Regional',
      badgeColor: '#06b6d4',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
          title: `${location} Revenue`,
          value: location === 'Virginia' ? '$890K' : '$1.1M',
          change: location === 'Virginia' ? '+9.2%' : '+15.3%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18"></path>
              <path d="M5 21V7l8-4v18"></path>
              <path d="M19 21V11l-6-4"></path>
            </svg>
          ),
          title: 'Offices',
          value: location === 'Virginia' ? '2' : '2',
          change: 'Active',
          changeType: 'neutral'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          ),
          title: 'Team Members',
          value: location === 'Virginia' ? '28' : '34',
          change: '+3',
          changeType: 'positive'
        }
      ]
    },
    District: {
      title: 'District Overview',
      badge: 'District',
      badgeColor: '#10b981',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
          title: 'District Revenue',
          value: '$1.1M',
          change: '+18.2%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <calendar width="20" height="20"></calendar>
            </svg>
          ),
          title: 'Monthly Closes',
          value: '47',
          change: '+12',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11H1l6-6 6 6zm0 0l6 6 6-6"></path>
            </svg>
          ),
          title: 'Pipeline Value',
          value: '$450K',
          change: '+5.7%',
          changeType: 'positive'
        }
      ]
    },
    Office: {
      title: 'Office Overview',
      badge: 'Office',
      badgeColor: '#f59e0b',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
          title: 'Office Revenue',
          value: '$580K',
          change: '+22.1%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          ),
          title: 'Team Size',
          value: '12',
          change: '+2',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Close Rate',
          value: '72%',
          change: '+4.2%',
          changeType: 'positive'
        }
      ]
    },
    Closer: {
      title: 'Closer Dashboard',
      badge: 'Closer',
      badgeColor: '#ef4444',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11H1l6-6 6 6zm0 0l6 6 6-6"></path>
            </svg>
          ),
          title: 'Active Deals',
          value: '8',
          change: '+2',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
          title: 'Commission',
          value: '$12.5K',
          change: '+8.3%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Close Rate',
          value: '85%',
          change: '+12%',
          changeType: 'positive'
        }
      ]
    },
    Setter: {
      title: 'Setter Dashboard',
      badge: 'Setter',
      badgeColor: '#8b5cf6',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          ),
          title: 'Calls Made',
          value: '47',
          change: '+12',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11H1l6-6 6 6zm0 0l6 6 6-6"></path>
            </svg>
          ),
          title: 'Appointments Set',
          value: '12',
          change: '+3',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Conversion Rate',
          value: '25%',
          change: '+2.1%',
          changeType: 'positive'
        }
      ]
    }
  };

  return baseData[role] || baseData.VP;
};

export default function OverviewSection({ selectedRole, selectedLocation, selectedOffice }) {
  const data = getRoleData(selectedRole, selectedLocation, selectedOffice);
  const [isMetricsShaking, setIsMetricsShaking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-primary)',
        padding: '48px 80px 40px 80px',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '140px'
      }}
    >
      {/* Header Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: '20px'
      }}>
        {/* Left Side: Title and Date */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginLeft: '60px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {/* Title */}
            <h1 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
              fontFamily: '"Geist", "Inter", sans-serif'
            }}>
              Overview
            </h1>

            {/* Current Date */}
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontFamily: '"Geist", "Inter", sans-serif'
            }}>
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
          </div>

          {/* Office Badge */}
          {selectedOffice && (
            <div style={{
              background: 'rgba(0, 112, 243, 0.1)',
              color: '#0070f3',
              border: '1px solid rgba(0, 112, 243, 0.2)',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: '"Geist", "Inter", sans-serif',
              marginTop: '4px'
            }}>
              {selectedOffice}
            </div>
          )}
        </div>

        {/* Right Side: Metrics with Tooltip */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '48px'
        }}>
          {/* Settings Icon with Tooltip */}
          <div style={{
            position: 'fixed',
            top: '150px',
            right: '8px',
            zIndex: 10
          }}>
            <div 
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                // Show tooltip and start shaking
                const tooltip = e.currentTarget.querySelector('.metrics-tooltip');
                if (tooltip) {
                  tooltip.style.opacity = '1';
                }
                setIsMetricsShaking(true);
              }}
              onMouseLeave={(e) => {
                // Hide tooltip and stop shaking
                const tooltip = e.currentTarget.querySelector('.metrics-tooltip');
                if (tooltip) {
                  tooltip.style.opacity = '0';
                }
                setIsMetricsShaking(false);
              }}
            >
              {/* Plus Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              
              {/* Tooltip */}
              <div 
                className="metrics-tooltip"
                style={{
                  position: 'absolute',
                  right: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginRight: '8px',
                  padding: '6px 10px',
                  background: '#2a2a2a',
                  color: 'white',
                  fontSize: '12px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  border: '1px solid #444',
                  opacity: 0,
                  transition: 'opacity 0.15s ease',
                  pointerEvents: 'none',
                  fontFamily: '"Geist", "Inter", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 3h5v5M4 20L20 4M21 16v5h-5M4 4l5 5"></path>
                </svg>
                Alter Metrics
                {/* Tooltip arrow */}
                <div style={{
                  position: 'absolute',
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: '4px solid #2a2a2a'
                }} />
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          {[1, 2, 3].map((cardNumber) => (
            <motion.div 
              key={cardNumber}
              animate={isMetricsShaking ? {
                x: [0, -1, 1, -1, 1, 0],
                y: [0, -1, 1, -1, 1, 0],
                rotate: [0, -0.3, 0.3, -0.3, 0.3, 0]
              } : {}}
              transition={{
                duration: 0.15 + cardNumber * 0.01,
                repeat: isMetricsShaking ? Infinity : 0,
                repeatType: "loop"
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Title */}
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                fontFamily: '"Geist", "Inter", sans-serif'
              }}>
                Metrics Card {cardNumber}
              </div>

              {/* Value Placeholder */}
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif'
              }}>
                000
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 