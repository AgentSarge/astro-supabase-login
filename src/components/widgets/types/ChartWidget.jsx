import { motion } from 'framer-motion';

export default function ChartWidget({ data, title = "Chart", type = "bar" }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      {/* Chart Icon Placeholder */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
        <path d="M3 3v18h18"></path>
        <path d="M18 17l-5-5-5 5-5-5"></path>
      </svg>
      
      {/* Chart Title */}
      <div style={{
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--text-primary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        textAlign: 'center'
      }}>
        {title}
      </div>
      
      {/* Placeholder for actual chart */}
      <div style={{
        fontSize: '10px',
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        opacity: 0.7
      }}>
        {type} chart
      </div>
    </div>
  );
} 