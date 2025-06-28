import { useState, useEffect, useRef } from 'react';
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerStopFilled, TbVolume2 } from 'react-icons/tb';

export default function RecSection2({ selectedRole, selectedLocation, selectedOffice, selectedRecording }) {
  const [selectedTab, setSelectedTab] = useState('Transcript');
  const tabs = ['Recording', 'Details', 'Pipeline'];
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const transcriptText = 'This is a sample transcript that animates as audio plays.';
  const intervalRef = useRef(null);
  const [timestamp, setTimestamp] = useState(0);
  const timestampIntervalRef = useRef(null);

  // Animate transcript typing when playing
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTranscriptIndex((prev) => {
          if (prev < transcriptText.length) return prev + 1;
          return prev;
        });
      }, 50);
      timestampIntervalRef.current = setInterval(() => {
        setTimestamp((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(timestampIntervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timestampIntervalRef.current);
    };
  }, [isPlaying]);

  // Reset transcript and timestamp on stop
  const handleStop = () => {
    setIsPlaying(false);
    setTranscriptIndex(0);
    setTimestamp(0);
  };

  // Format timestamp as HH:MM:SS
  function formatTimestamp(sec) {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  // Placeholder for no selection
  if (!selectedRecording) {
    return (
      <div style={{
        height: '100%',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        textAlign: 'center',
        gap: '16px',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" style={{ opacity: 0.5 }}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
        <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>No Recording Selected</div>
        <div style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Please select a recording from the list to view its transcript, details, or pipeline.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      background: 'var(--bg-primary)',
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Minimalist Tab Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          background: 'transparent',
          padding: '0 24px',
          height: '38px',
          fontFamily: '"Geist", "Inter", sans-serif',
        }}
      >
        {/* Left: Recording */}
        <div style={{ display: 'flex', flex: 1 }}>
          <button
            onClick={() => setSelectedTab('Recording')}
            style={{
              background: 'none',
              border: 'none',
              color: selectedTab === 'Recording' ? 'var(--accent-color)' : 'var(--text-secondary)',
              fontWeight: selectedTab === 'Recording' ? 600 : 500,
              fontSize: '15px',
              cursor: 'pointer',
              borderBottom: selectedTab === 'Recording' ? '2px solid var(--accent-color)' : '2px solid transparent',
              width: 'fit-content',
              minWidth: 0,
              padding: 0,
              marginBottom: '-2px',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            Recording
          </button>
        </div>
        {/* Right: Details / Pipeline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={() => setSelectedTab('Details')}
            style={{
              background: 'none',
              border: 'none',
              color: selectedTab === 'Details' ? 'var(--accent-color)' : 'var(--text-secondary)',
              fontWeight: selectedTab === 'Details' ? 600 : 500,
              fontSize: '15px',
              cursor: 'pointer',
              borderBottom: selectedTab === 'Details' ? '2px solid var(--accent-color)' : '2px solid transparent',
              width: 'fit-content',
              minWidth: 0,
              padding: 0,
              marginBottom: '-2px',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            Details
          </button>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '15px' }}>/</span>
          <button
            onClick={() => setSelectedTab('Pipeline')}
            style={{
              background: 'none',
              border: 'none',
              color: selectedTab === 'Pipeline' ? 'var(--accent-color)' : 'var(--text-secondary)',
              fontWeight: selectedTab === 'Pipeline' ? 600 : 500,
              fontSize: '15px',
              cursor: 'pointer',
              borderBottom: selectedTab === 'Pipeline' ? '2px solid var(--accent-color)' : '2px solid transparent',
              width: 'fit-content',
              minWidth: 0,
              padding: 0,
              marginBottom: '-2px',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            Pipeline
          </button>
        </div>
      </div>
      {/* Row 2: Section 1: Audio controls, transcript, waveform */}
      {selectedTab === 'Recording' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          minHeight: 0,
          minWidth: 0,
          maxHeight: '100vh',
          overflowY: 'auto',
        }}>
          {/* Audio Controls */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
            {/* Play/Pause Toggle */}
            <button
              type="button"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: isPlaying ? 'none' : '2px solid var(--border-color)',
                background: isPlaying ? 'var(--accent-color)' : 'var(--bg-surface)',
                boxShadow: isPlaying ? '0 2px 12px var(--accent-color)' : '0 1px 4px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 26,
                transition: 'box-shadow 0.2s, background 0.2s, border 0.2s',
                color: isPlaying ? '#fff' : 'var(--accent-color)',
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={() => setIsPlaying(p => !p)}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-color)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.border = 'none';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isPlaying ? 'var(--accent-color)' : 'var(--bg-surface)';
                e.currentTarget.style.color = isPlaying ? '#fff' : 'var(--accent-color)';
                e.currentTarget.style.border = isPlaying ? 'none' : '2px solid var(--border-color)';
              }}
            >
              {isPlaying ? (
                <TbPlayerPauseFilled size={32} color="#fff" />
              ) : (
                <TbPlayerPlayFilled size={32} color={"var(--accent-color)"} />
              )}
            </button>
            {/* Volume Button */}
            <button
              type="button"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '2px solid var(--accent-color)',
                background: 'var(--bg-surface)',
                boxShadow: '0 1.5px 6px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 26,
                color: 'var(--accent-color)',
                transition: 'box-shadow 0.2s, background 0.2s, border 0.2s',
              }}
              aria-label="Volume"
              // Add onClick for volume logic if needed
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-color)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-surface)';
                e.currentTarget.style.color = 'var(--accent-color)';
              }}
            >
              <TbVolume2 size={28} color="inherit" />
            </button>
          </div>
          {/* Transcript */}
          <div style={{
            fontSize: 18,
            color: 'var(--text-primary)',
            fontWeight: 500,
            background: 'var(--bg-surface)',
            borderRadius: 8,
            padding: '16px 32px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            minWidth: 220,
            textAlign: 'center',
            minHeight: 32,
          }}>
            {transcriptText.slice(0, transcriptIndex)}
          </div>
          {/* Audio Waveform Placeholder and Radio Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {/* Waveform */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <svg width="240" height="240" viewBox="0 0 240 240" style={{ filter: isPlaying ? 'drop-shadow(0 0 16px #00f8)' : 'none', transition: 'filter 0.3s' }}>
                <defs>
                  <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00f" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Glow background */}
                <circle cx="120" cy="120" r="100" fill="url(#waveGlow)" />
                {/* Main waveform layers */}
                {[0, 1, 2].map(layer => (
                  <g key={layer}>
                    {[...Array(64)].map((_, i) => {
                      const angle = (i / 64) * 2 * Math.PI;
                      // Layered amplitude and color
                      const base = 80 + layer * 8;
                      const amp = [12, 7, 3][layer];
                      const speed = [0.7, 1.1, 1.7][layer];
                      const color = [
                        'rgba(0,128,255,0.85)',
                        'rgba(0,128,255,0.35)',
                        'rgba(0,128,255,0.15)'
                      ][layer];
                      const pulse = isPlaying ? amp * Math.abs(Math.sin(Date.now() / (220 - layer * 40) + i * speed)) : 0;
                      const r = base + pulse;
                      const x1 = 120 + base * Math.cos(angle);
                      const y1 = 120 + base * Math.sin(angle);
                      const x2 = 120 + r * Math.cos(angle);
                      const y2 = 120 + r * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={color}
                          strokeWidth={layer === 0 ? 3 : 2}
                          strokeLinecap="round"
                          style={{ filter: layer === 0 ? 'blur(0.5px)' : 'blur(1.5px)' }}
                        />
                      );
                    })}
                  </g>
                ))}
                {/* Subtle static inner ring for realism */}
                <circle cx="120" cy="120" r="70" stroke="#00f" strokeWidth="1.5" fill="none" opacity="0.18" />
                {/* Outer ring */}
                <circle cx="120" cy="120" r="100" stroke="#00f" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          Blank 1
        </div>
      )}
      {/* Row 3: Section 2: Image, timestamp, description */}
      {selectedTab === 'Recording' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          minHeight: 0,
          minWidth: 0,
        }}>
          {/* Image row with timestamp above image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            maxWidth: 'min(90vw, 400px)',
            marginBottom: 8,
          }}>
            {/* Timestamp above image, centered */}
            <span style={{ fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap', color: 'var(--text-primary)', marginBottom: 6 }}>{formatTimestamp(timestamp)}</span>
            {/* Image container */}
            <div style={{
              width: 'min(90vw, 400px)',
              maxWidth: 400,
              height: 'min(56vw, 225px)',
              maxHeight: 225,
              background: '#111',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* Placeholder image */}
              <img src="https://dummyimage.com/400x225/111/fff&text=+" alt="Important moment" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }} />
            </div>
          </div>
          {/* Sub-description: centered below image */}
          <div style={{
            marginTop: 8,
            color: 'var(--text-secondary)',
            fontSize: 15,
            fontFamily: '"Geist", "Inter", sans-serif',
            lineHeight: 1.5,
            maxWidth: 'min(90vw, 400px)',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 0,
          }}>
            <span style={{ fontWeight: 500 }}>Important moment: Objection handled</span>
            <span>Speaker: Agent</span>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          Blank 2
        </div>
      )}
    </div>
  );
} 