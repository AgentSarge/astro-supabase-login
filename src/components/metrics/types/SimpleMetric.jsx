import { motion } from 'framer-motion';

export default function SimpleMetric({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  subtitle = null 
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
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
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        textAlign: 'center'
      }}>
        {title}
      </div>
      
      {/* Value */}
      <div style={{
        fontSize: '22px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: 1
      }}>
        {value}
      </div>
      
      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontSize: '10px',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif',
          textAlign: 'center',
          opacity: 0.8
        }}>
          {subtitle}
        </div>
      )}
      
      {/* Change */}
      {change && (
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: getChangeColor(),
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {change}
        </div>
      )}
    </div>
  );
} 