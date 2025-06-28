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

  // --- Audio Progress Bar State ---
  const audioDuration = 120; // Example: 2 minutes
  const progress = Math.min(timestamp / audioDuration, 1);
  // --- Transcript Highlighting ---
  const transcriptWords = transcriptText.split(' ');
  const currentWordIdx = Math.floor((transcriptIndex / transcriptText.length) * transcriptWords.length);
  // --- Scrub Handler ---
  const handleScrub = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setTimestamp(Math.round(audioDuration * pct));
    setTranscriptIndex(Math.floor(transcriptText.length * pct));
  };

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
      {/* Unified Main Panel */}
      {selectedTab === 'Recording' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 24,
          minHeight: 0,
          minWidth: 0,
          maxHeight: '100vh',
          overflowY: 'auto',
          padding: '32px 0 0 0',
        }}>
          {/* Audio Controls + Progress Bar */}
          <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
              {/* Play/Pause Toggle */}
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                tabIndex={0}
                style={{
                  width: 48,
                  height: 48,
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
                onClick={() => setIsPlaying(p => !p)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(p => !p); }}
              >
                {isPlaying ? (
                  <TbPlayerPauseFilled size={28} color="#fff" />
                ) : (
                  <TbPlayerPlayFilled size={28} color={"var(--accent-color)"} />
                )}
              </button>
              {/* Volume Button */}
              <button
                type="button"
                aria-label="Volume"
                tabIndex={0}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid var(--accent-color)',
                  background: 'var(--bg-surface)',
                  boxShadow: '0 1.5px 6px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 22,
                  color: 'var(--accent-color)',
                  transition: 'box-shadow 0.2s, background 0.2s, border 0.2s',
                }}
                // Add onClick for volume logic if needed
              >
                <TbVolume2 size={22} color="inherit" />
              </button>
              {/* Timestamp (left of progress bar on mobile, above on desktop) */}
              <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginLeft: 12, minWidth: 70, textAlign: 'center' }}>{formatTimestamp(timestamp)} / {formatTimestamp(audioDuration)}</span>
            </div>
            {/* Progress Bar */}
            <div
              role="slider"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={handleScrub}
              onKeyDown={e => {
                if (e.key === 'ArrowLeft') setTimestamp(t => Math.max(0, t - 2));
                if (e.key === 'ArrowRight') setTimestamp(t => Math.min(audioDuration, t + 2));
              }}
              style={{
                width: '100%',
                height: 8,
                background: 'var(--border-color)',
                borderRadius: 4,
                marginTop: 4,
                marginBottom: 0,
                cursor: 'pointer',
                position: 'relative',
                outline: 'none',
              }}
            >
              <div style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: 'var(--accent-color)',
                borderRadius: 4,
                transition: 'width 0.2s',
              }} />
              {/* Thumb */}
              <div style={{
                position: 'absolute',
                left: `calc(${progress * 100}% - 8px)`,
                top: -4,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'var(--accent-color)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                border: '2px solid #fff',
                pointerEvents: 'none',
                transition: 'left 0.2s',
              }} />
            </div>
          </div>
          {/* Transcript (highlighted) */}
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
            maxWidth: 480,
            margin: '0 auto',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
          }}>
            {transcriptWords.map((word, idx) => (
              <span key={idx} style={{
                background: idx === currentWordIdx ? 'var(--accent-color)' : 'transparent',
                color: idx === currentWordIdx ? '#fff' : 'inherit',
                borderRadius: 4,
                padding: idx === currentWordIdx ? '2px 4px' : undefined,
                transition: 'background 0.2s, color 0.2s',
                marginRight: 4,
              }}>{word}</span>
            ))}
          </div>
          {/* Waveform (interactive, animated) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <svg width="240" height="240" viewBox="0 0 240 240" style={{ filter: isPlaying ? 'drop-shadow(0 0 16px #00f8)' : 'none', transition: 'filter 0.3s', cursor: 'pointer' }} onClick={handleScrub}>
                <defs>
                  <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00f" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="120" cy="120" r="100" fill="url(#waveGlow)" />
                {[0, 1, 2].map(layer => (
                  <g key={layer}>
                    {[...Array(64)].map((_, i) => {
                      const angle = (i / 64) * 2 * Math.PI;
                      const base = 80 + layer * 8;
                      const amp = [12, 7, 3][layer];
                      const speed = [0.7, 1.1, 1.7][layer];
                      const color = [
                        'rgba(0,128,255,0.85)',
                        'rgba(0,128,255,0.35)',
                        'rgba(0,128,255,0.15)'
                      ][layer];
                      const pulse = isPlaying ? amp * Math.abs(Math.sin(Date.now() / (220 - layer * 40) + i * speed + timestamp)) : 0;
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
                <circle cx="120" cy="120" r="70" stroke="#00f" strokeWidth="1.5" fill="none" opacity="0.18" />
                <circle cx="120" cy="120" r="100" stroke="#00f" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
          {/* Metadata Card (timestamp, image, description) */}
          <div style={{
            marginTop: 16,
            width: '100%',
            maxWidth: 420,
            background: 'var(--bg-surface)',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0 16px 0',
            gap: 8,
          }}>
            <span style={{ fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap', color: 'var(--text-primary)', marginBottom: 6 }}>{formatTimestamp(timestamp)}</span>
            <div style={{
              width: 'min(90vw, 340px)',
              maxWidth: 340,
              height: 'min(56vw, 180px)',
              maxHeight: 180,
              background: '#111',
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img src="https://dummyimage.com/340x180/111/fff&text=+" alt="Important moment" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }} />
            </div>
            <div style={{
              marginTop: 8,
              color: 'var(--text-secondary)',
              fontSize: 15,
              fontFamily: '"Geist", "Inter", sans-serif',
              lineHeight: 1.5,
              maxWidth: 'min(90vw, 340px)',
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
          {/* Blank state for Details/Pipeline */}
          Coming soon
        </div>
      )}
    </div>
  );
} 