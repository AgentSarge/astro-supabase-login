import { motion } from 'framer-motion';

// Simple bar chart component
const SimpleBarChart = ({ data = [] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'end',
      gap: '4px',
      height: '100%',
      padding: '10px 0'
    }}>
      {data.map((item, index) => (
        <div key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          height: '100%'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'end',
            width: '100%',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '12px',
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: '#10b981',
              borderRadius: '2px 2px 0 0',
              minHeight: '4px'
            }} />
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '6px',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WidgetCard({ 
  id, 
  title, 
  content, 
  icon, 
  value,
  subtitle,
  chart,
  status,
  size = 'normal',
  onClick,
  isPlaceholder = true 
}) {
  const isLarge = size === 'large';
  
  // Sample chart data
  const sampleData = [
    { label: 'Jun 25, 10:35am', value: 15 },
    { label: '', value: 32 },
    { label: '', value: 28 },
    { label: '', value: 20 },
    { label: '', value: 35 },
    { label: '', value: 25 },
    { label: 'Jun 25, 10:58am', value: 18 }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '240px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      whileHover={{ 
        borderColor: 'rgba(0, 112, 243, 0.3)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        y: -1 
      }}
      onClick={onClick}
    >
      {/* Header - icon and title on same line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '4px'
      }}>
        {icon && (
          <div style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            width: '18px',
            height: '18px'
          }}>
            {icon}
          </div>
        )}
        <span style={{
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {title}
        </span>
      </div>

      {/* Subtitle - very close to title */}
      {subtitle && (
        <div style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif',
          marginBottom: '12px'
        }}>
          {subtitle}
        </div>
      )}

      {/* Value - prominent but not huge */}
      <div style={{
        fontSize: '36px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: 1,
        marginBottom: '20px'
      }}>
        {value}
      </div>

      {/* Chart area - takes remaining space */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.08) 0%, rgba(0, 112, 243, 0.03) 100%)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '10px',
          color: 'var(--text-secondary)',
          opacity: 0.5
        }}>
          Chart area
        </div>
      </div>
    </motion.div>
  );
} 