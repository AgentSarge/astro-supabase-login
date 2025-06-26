import { motion } from 'framer-motion';

export default function MetricWidget({ 
  title = "Metric", 
  value = "0", 
  change = "+0%", 
  changeType = "neutral",
  icon 
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
      gap: '4px',
      padding: '8px'
    }}>
      {/* Icon */}
      {icon && (
        <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
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
      
      {/* Value */}
      <div style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: 1
      }}>
        {value}
      </div>
      
      {/* Change */}
      <div style={{
        fontSize: '10px',
        fontWeight: 500,
        color: getChangeColor(),
        fontFamily: '"Geist", "Inter", sans-serif'
      }}>
        {change}
      </div>
    </div>
  );
} 