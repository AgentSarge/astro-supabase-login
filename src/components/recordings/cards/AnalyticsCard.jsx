import { motion } from 'framer-motion';

export default function AnalyticsCard({ 
  title,
  subtitle,
  metrics = [],
  insights = [],
  onViewDetails,
  className = '',
  style = {} 
}) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
      style={{
        background: 'var(--bg-primary)',
        padding: '48px 80px 40px 80px',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '200px',
        ...style
      }}
    >
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '8px',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            margin: 0,
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {subtitle}
          </p>
        </div>
        
        <button 
          onClick={handleViewDetails}
          style={{
            background: 'transparent',
            color: 'var(--accent-color)',
            border: '1px solid var(--accent-color)',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: '"Geist", "Inter", sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"></path>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
          </svg>
          View Detailed Analytics
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {/* Icon */}
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--accent-color)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            
            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontFamily: '"Geist", "Inter", sans-serif',
                marginBottom: '4px'
              }}>
                {metric.label}
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif',
                marginBottom: '4px'
              }}>
                {metric.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: metric.changeType === 'positive' ? '#10b981' : '#ef4444',
                fontFamily: '"Geist", "Inter", sans-serif'
              }}>
                {metric.changeType === 'positive' ? '↗' : '↘'} {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights Section */}
      {insights.length > 0 && (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '16px',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            Key Insights
          </h3>
          <div style={{
            display: 'grid',
            gap: '12px'
          }}>
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '8px 0'
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent-color)',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  fontFamily: '"Geist", "Inter", sans-serif',
                  lineHeight: '1.5'
                }}>
                  {insight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 