import { motion } from 'framer-motion';

export default function KPIMetric({ 
  title, 
  value, 
  target, 
  change, 
  changeType = 'neutral',
  icon,
  unit = '',
  progress = null 
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  };

  const getProgressColor = () => {
    if (!progress) return '#e5e7eb';
    if (progress >= 90) return '#10b981';
    if (progress >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px'
    }}>
      {/* Icon */}
      {icon && (
        <div style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '4px',
          opacity: 0.8
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
        textAlign: 'center',
        marginBottom: '2px'
      }}>
        {title}
      </div>
      
      {/* Value with Unit */}
      <div style={{
        fontSize: '20px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'baseline',
        gap: '2px'
      }}>
        {value}
        {unit && (
          <span style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'var(--text-secondary)'
          }}>
            {unit}
          </span>
        )}
      </div>
      
      {/* Progress Bar */}
      {progress !== null && (
        <div style={{
          width: '100%',
          height: '4px',
          background: '#e5e7eb',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '4px'
        }}>
          <div style={{
            width: `${Math.min(progress, 100)}%`,
            height: '100%',
            background: getProgressColor(),
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      )}
      
      {/* Change */}
      {change && (
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          color: getChangeColor(),
          fontFamily: '"Geist", "Inter", sans-serif',
          marginTop: '2px'
        }}>
          {change}
        </div>
      )}
      
      {/* Target */}
      {target && (
        <div style={{
          fontSize: '9px',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif',
          opacity: 0.7
        }}>
          Target: {target}
        </div>
      )}
    </div>
  );
} 