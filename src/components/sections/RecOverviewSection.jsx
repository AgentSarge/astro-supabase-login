import { motion } from 'framer-motion';

export default function RecOverviewSection({ selectedRecording }) {
  // Example metric stats (replace with real data as needed)
  const metrics = [
    { title: 'Metric 1', value: '000' },
    { title: 'Metric 2', value: '000' },
    { title: 'Metric 3', value: '000' },
  ];

  // Badge color logic
  const getBadgeStyle = (outcome) => {
    switch ((outcome || '').toLowerCase()) {
      case 'completed':
        return {
          background: 'rgba(16, 185, 129, 0.12)', // green
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        };
      case 'no show':
        return {
          background: 'rgba(239, 68, 68, 0.12)', // red
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.25)'
        };
      case 'rescheduled':
        return {
          background: 'rgba(245, 158, 11, 0.12)', // orange
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.25)'
        };
      default:
        return {
          background: 'rgba(0, 112, 243, 0.1)', // blue accent
          color: 'var(--accent-color)',
          border: '1px solid rgba(0, 112, 243, 0.2)'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-primary)',
        padding: '48px 80px 40px 80px',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '140px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: '20px',
      }}>
        {/* Left Side: Name/Overview and Outcome Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginLeft: '60px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
              fontFamily: '"Geist", "Inter", sans-serif',
            }}>
              {selectedRecording && selectedRecording.firstName && selectedRecording.lastName
                ? `${selectedRecording.firstName} ${selectedRecording.lastName}`
                : 'Overview'}
            </h1>
            {/* Current Date */}
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontFamily: '"Geist", "Inter", sans-serif',
            }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
          {/* Outcome Badge */}
          {selectedRecording && selectedRecording.outcome && (
            <div style={{
              ...getBadgeStyle(selectedRecording.outcome),
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: '"Geist", "Inter", sans-serif',
              marginTop: '4px',
            }}>
              {selectedRecording.outcome}
            </div>
          )}
        </div>
        {/* Right Side: Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', justifyContent: 'flex-end', flex: 1, width: '100%' }}>
          {metrics.map((metric, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                fontFamily: '"Geist", "Inter", sans-serif',
              }}>{metric.title}</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif',
              }}>{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 