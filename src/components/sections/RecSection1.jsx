import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RecordingMenu, getRecordingDataByRole } from '../recordings/index.js';

export default function RecSection1({ selectedRole, selectedLocation, selectedOffice, selectedRecording, setSelectedRecording }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Hardcoded example recordings
  const recordingsData = {
    recordings: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        date: '2024-04-27T15:30:00',
        outcome: 'Completed',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        date: '2024-04-26T10:15:00',
        outcome: 'No Show',
      },
      {
        id: 3,
        firstName: 'Emily',
        lastName: 'Johnson',
        date: '2024-04-25T09:00:00',
        outcome: 'Rescheduled',
      },
      {
        id: 4,
        firstName: 'Michael',
        lastName: 'Brown',
        date: '2024-04-24T13:45:00',
        outcome: 'Completed',
      },
    ]
  };

  // Filter recordings based on search query
  const filteredRecordings = useMemo(() => {
    if (!searchQuery.trim()) return recordingsData.recordings;
    
    const query = searchQuery.toLowerCase();
    return recordingsData.recordings.filter(recording => 
      (recording.firstName + ' ' + recording.lastName).toLowerCase().includes(query)
    );
  }, [recordingsData.recordings, searchQuery]);

  const handleRecordingSelect = (recording) => {
    if (selectedRecording && selectedRecording.id === recording.id) {
      setSelectedRecording(null); // Deselect if already selected
    } else {
      setSelectedRecording(recording);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible && searchQuery) {
      setSearchQuery(''); // Clear search when hiding
    }
  };

  return (
    <div style={{
      height: '100%',
      background: 'none',
      padding: '16px 0',
      overflow: 'hidden',
      position: 'relative',
      borderLeft: '1px solid var(--border-color)',
      borderRight: '1px solid var(--border-color)'
    }}>
      {/* Search Input - Only show when search is visible */}
      {isSearchVisible && (
        <div style={{ padding: '0 16px' }}>
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '14px',
                color: 'var(--text-primary)',
                fontFamily: '"Geist", "Inter", sans-serif',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-color)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
              }}
            />
            {/* Only show this icon when search is visible */}
            <div 
              onClick={handleSearchIconClick}
              style={{
                padding: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isSearchVisible || searchQuery ? 'var(--accent-color)' : 'var(--text-secondary)'} 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </motion.div>
        </div>
      )}
      {/* Show search icon in top right only when search is hidden */}
      {!isSearchVisible && (
        <div style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          zIndex: 10,
          margin: '0',
        }}>
          <div
            onClick={handleSearchIconClick}
            style={{
              padding: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSearchVisible || searchQuery ? 'var(--accent-color)' : 'var(--text-secondary)'}
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>
      )}
      <RecordingMenu
        recordings={filteredRecordings}
        onRecordingSelect={handleRecordingSelect}
        selectedRecordingId={selectedRecording?.id}
        totalRecordings={recordingsData.recordings.length}
        isSearchActive={!!searchQuery}
      />
    </div>
  );
} 