import { motion } from 'framer-motion';
import RecordingMenuItem from './RecordingMenuItem.jsx';

export default function RecordingMenu({ 
  recordings = [], 
  onRecordingSelect,
  selectedRecordingId,
  totalRecordings = 0,
  isSearchActive = false,
  className = '',
  style = {} 
}) {
  const handleRecordingClick = (recording) => {
    if (onRecordingSelect) {
      onRecordingSelect(recording);
    }
  };

  return (
    <div 
      className={className}
      style={{
        height: '100%',
        background: 'transparent',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Recordings List */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '8px'
      }}>
        {recordings.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: 'var(--text-secondary)',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              style={{ marginBottom: '16px', opacity: 0.5 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div style={{ fontSize: '14px', textAlign: 'center' }}>
              {isSearchActive ? 'No recordings found' : 'No recordings yet'}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {recordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <RecordingMenuItem
                  recording={recording}
                  isSelected={selectedRecordingId === recording.id}
                  onClick={() => handleRecordingClick(recording)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-primary)'
      }}>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          fontFamily: '"Geist", "Inter", sans-serif',
          textAlign: 'center'
        }}>
          {recordings.length} of {totalRecordings} recordings
        </div>
      </div>
    </div>
  );
} 