import { motion } from 'framer-motion';
import { useState } from 'react';
import RecordingMenuItem from '../components/RecordingMenuItem.jsx';

export default function RecordingCard({ 
  title,
  subtitle,
  recordings = [],
  onItemPlay,
  onViewAll,
  className = '',
  style = {} 
}) {
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (recordingId) => {
    setPlayingId(playingId === recordingId ? null : recordingId);
    if (onItemPlay) {
      onItemPlay(recordingId);
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={className}
      style={{
        background: 'var(--bg-surface)',
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
            {subtitle || 'Recent recordings and audio content'}
          </p>
        </div>
        
        <button 
          onClick={handleViewAll}
          style={{
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          View All
        </button>
      </div>

      {/* Recordings List */}
      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {recordings.map((recording, index) => (
          <RecordingMenuItem
            key={recording.id}
            recording={recording}
            isSelected={playingId === recording.id}
            onClick={() => handlePlay(recording.id)}
          />
        ))}
      </div>
    </motion.div>
  );
} 