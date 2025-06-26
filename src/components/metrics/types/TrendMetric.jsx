import { motion } from 'framer-motion';

export default function TrendMetric({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  trend = 'flat' // 'up', 'down', 'flat'
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  };

  const getTrendIcon = () => {
    const color = getChangeColor();
    
    if (trend === 'up') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      );
    }
    
    if (trend === 'down') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
          <polyline points="17 18 23 18 23 12"></polyline>
        </svg>
      );
    }
    
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="1" y1="12" x2="23" y2="12"></line>
      </svg>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: '8px'
    }}>
      {/* Icon */}
      {icon && (
        <div style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2px',
          opacity: 0.7
        }}>
          {icon}
        </div>
      )}
      
      {/* Title */}
      <div style={{
        fontSize: '11px',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        textAlign: 'center'
      }}>
        {title}
      </div>
      
      {/* Value */}
      <div style={{
        fontSize: '20px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: 1
      }}>
        {value}
      </div>
      
      {/* Trend and Change */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        {getTrendIcon()}
        {change && (
          <div style={{
            fontSize: '10px',
            fontWeight: 500,
            color: getChangeColor(),
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
} 