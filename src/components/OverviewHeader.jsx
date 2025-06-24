import { motion } from 'framer-motion';
import MetricCard from './MetricCard.jsx';
import BlankCard from './BlankCard.jsx';

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
          title: 'This Month',
          value: '$45K',
          change: '+18%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Close Rate',
          value: '75%',
          change: '+5%',
          changeType: 'positive'
        }
      ]
    },
    Setter: {
      title: 'Setter Dashboard',
      badge: 'Setter',
      badgeColor: '#6366f1',
      metrics: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          ),
          title: 'Appointments Set',
          value: '23',
          change: '+6',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          ),
          title: 'Show Rate',
          value: '78%',
          change: '+3.2%',
          changeType: 'positive'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          ),
          title: 'Conversion',
          value: '42%',
          change: '+1.8%',
          changeType: 'positive'
        }
      ]
    }
  };

  return baseData[role] || baseData.Closer;
};

export default function OverviewHeader({ selectedRole, selectedLocation, selectedOffice }) {
  const data = getRoleData(selectedRole, selectedLocation, selectedOffice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '20px',
        background: 'var(--bg-primary)'
      }}
    >
      {/* Top Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'var(--bg-primary)',
          padding: '32px 48px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Side: Title and Date */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
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

        {/* Right Side: Metrics */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '48px'
        }}>
          {data.metrics.slice(0, 3).map((metric, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              {/* Title */}
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                fontFamily: '"Geist", "Inter", sans-serif'
              }}>
                {metric.title}
              </div>

              {/* Value */}
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif'
              }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Four Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <BlankCard number="1" />
        <BlankCard number="2" />
        <BlankCard number="3" />
        <BlankCard number="4" />
      </div>

      {/* Two Larger Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <BlankCard number="1.2" size="large" />
        <BlankCard number="2.1" size="large" />
      </div>
    </motion.div>
  );
} 