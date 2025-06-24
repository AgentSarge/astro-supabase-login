import { motion } from 'framer-motion';

export default function MetricCard({ icon, title, value, change, changeType = 'positive', loading = false }) {
  const getChangeColor = () => {
    if (changeType === 'positive') return '#10b981'; // green
    if (changeType === 'negative') return '#ef4444'; // red
    return 'var(--text-secondary)'; // neutral
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      );
    }
    if (changeType === 'negative') {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
          <polyline points="17 18 23 18 23 12"></polyline>
        </svg>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minHeight: '120px'
      }}>
        {/* Loading skeleton */}
        <div style={{
          width: '40px',
          height: '40px',
          background: 'var(--bg-primary)',
          borderRadius: '8px',
          opacity: 0.5
        }} />
        <div style={{
          width: '60%',
          height: '16px',
          background: 'var(--bg-primary)',
          borderRadius: '4px',
          opacity: 0.5
        }} />
        <div style={{
          width: '80%',
          height: '24px',
          background: 'var(--bg-primary)',
          borderRadius: '4px',
          opacity: 0.5
        }} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '120px'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '40px',
        height: '40px',
        background: 'rgba(0, 112, 243, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0070f3'
      }}>
        {icon}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontWeight: 500,
        fontFamily: '"Geist", "Inter", sans-serif'
      }}>
        {title}
      </div>

      {/* Value and Change */}
      <div style={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {value}
        </div>
        
        {change && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: getChangeColor(),
            fontSize: '12px',
            fontWeight: 500
          }}>
            {getChangeIcon()}
            {change}
          </div>
        )}
      </div>
    </motion.div>
  );
} 