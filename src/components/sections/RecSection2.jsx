import { useState, useEffect, useRef } from 'react';
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerStopFilled, TbVolume2 } from 'react-icons/tb';

export default function RecSection2({ selectedRole, selectedLocation, selectedOffice, selectedRecording, selectedTab, activeDetailPanel, setActiveDetailPanel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const transcriptText = 'This is a sample transcript that animates as audio plays.';
  const intervalRef = useRef(null);
  const [timestamp, setTimestamp] = useState(0);
  const timestampIntervalRef = useRef(null);
  const imageIntervalRef = useRef(null);

  // Image cycling for emotion images
  const imagePaths = [
    '/emotion_1.png',
    '/emotion_2.png',
    '/emotion_3.png',
    '/Emotion-Detection-1.png',
  ];
  const [imageIdx, setImageIdx] = useState(0);

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
      imageIntervalRef.current = setInterval(() => {
        setImageIdx(idx => (idx + 1) % imagePaths.length);
      }, 2000);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(timestampIntervalRef.current);
      clearInterval(imageIntervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timestampIntervalRef.current);
      clearInterval(imageIntervalRef.current);
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

  // Utility to get a human-readable label from the image path
  function getEmotionLabel(path) {
    // Remove leading slash and extension
    let name = path.replace(/^\//, '').replace(/\.[^/.]+$/, '');
    // Replace underscores and dashes with spaces
    name = name.replace(/[_-]+/g, ' ');
    // Capitalize each word
    name = name.replace(/\b\w/g, c => c.toUpperCase());
    return name;
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
      flexDirection: 'column',
      width: '100%',
    }}>
      {/* Professional, full-width layout for Recording tab */}
      {selectedTab === 'Recording' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          gap: 32,
          width: '100%',
          padding: '32px 0',
        }}>
          {/* Audio Controls + Progress Bar */}
          <div style={{
            width: '100%',
            padding: '0 40px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18 }}>
              {/* Play/Pause Toggle */}
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                tabIndex={0}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: isPlaying ? 'none' : '2px solid var(--border-color)',
                  background: isPlaying ? 'var(--accent-color)' : 'var(--bg-surface)',
                  boxShadow: isPlaying ? '0 2px 8px var(--accent-color)' : '0 1px 4px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 22,
                  transition: 'box-shadow 0.2s, background 0.2s, border 0.2s',
                  color: isPlaying ? '#fff' : 'var(--accent-color)',
                }}
                onClick={() => setIsPlaying(p => !p)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(p => !p); }}
              >
                {isPlaying ? (
                  <TbPlayerPauseFilled size={22} color="#fff" />
                ) : (
                  <TbPlayerPlayFilled size={22} color={"var(--accent-color)"} />
                )}
              </button>
              {/* Volume Button */}
              <button
                type="button"
                aria-label="Volume"
                tabIndex={0}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '2px solid var(--accent-color)',
                  background: 'var(--bg-surface)',
                  boxShadow: '0 1.5px 6px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: 'var(--accent-color)',
                  transition: 'box-shadow 0.2s, background 0.2s, border 0.2s',
                }}
              >
                <TbVolume2 size={18} color="inherit" />
              </button>
              {/* Timestamp */}
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
          {/* Transcript (full width, padded) */}
          <div style={{
            fontSize: 18,
            color: 'var(--text-primary)',
            fontWeight: 500,
            background: 'var(--bg-surface)',
            borderRadius: 8,
            padding: '18px 40px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            minWidth: 220,
            textAlign: 'left',
            minHeight: 32,
            maxWidth: '100%',
            margin: '0',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            width: '100%',
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
          {/* Responsive Waveform + Metadata/Image Row */}
          {(!activeDetailPanel && window.innerWidth >= 900) ? (
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 40,
              maxWidth: 1100,
              margin: '0 auto',
              alignItems: 'stretch',
            }}>
              {/* Waveform - far left */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minWidth: 0,
                padding: '32px 0',
                paddingLeft: 0,
                paddingRight: 80,
              }}>
                <div style={{ width: 420, height: 320, maxWidth: '100%', maxHeight: '60vw' }}>
                  <svg width="100%" height="100%" viewBox="0 0 320 320" style={{ filter: isPlaying ? 'drop-shadow(0 0 24px #00f8)' : 'none', transition: 'filter 0.3s', cursor: 'pointer' }} onClick={handleScrub}>
                    <defs>
                      <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00f" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00f" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="160" cy="160" r="140" fill="url(#waveGlow)" />
                    {[0, 1, 2].map(layer => (
                      <g key={layer}>
                        {[...Array(64)].map((_, i) => {
                          const angle = (i / 64) * 2 * Math.PI;
                          const base = 120 + layer * 16;
                          const amp = [18, 12, 7][layer];
                          const speed = [0.7, 1.1, 1.7][layer];
                          const color = [
                            'rgba(0,128,255,0.85)',
                            'rgba(0,128,255,0.35)',
                            'rgba(0,128,255,0.15)'
                          ][layer];
                          const pulse = isPlaying ? amp * Math.abs(Math.sin(Date.now() / (220 - layer * 40) + i * speed + timestamp)) : 0;
                          const r = base + pulse;
                          const x1 = 160 + base * Math.cos(angle);
                          const y1 = 160 + base * Math.sin(angle);
                          const x2 = 160 + r * Math.cos(angle);
                          const y2 = 160 + r * Math.sin(angle);
                          return (
                            <line
                              key={i}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke={color}
                              strokeWidth={layer === 0 ? 4 : 2.5}
                              strokeLinecap="round"
                              style={{ filter: layer === 0 ? 'blur(0.5px)' : 'blur(1.5px)' }}
                            />
                          );
                        })}
                      </g>
                    ))}
                    <circle cx="160" cy="160" r="100" stroke="#00f" strokeWidth="2" fill="none" opacity="0.18" />
                    <circle cx="160" cy="160" r="140" stroke="#00f" strokeWidth="3" fill="none" opacity="0.5" />
                  </svg>
                </div>
              </div>
              {/* Metadata Card */}
              <div style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface)',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                padding: '40px 32px',
                gap: 12,
                margin: '0',
              }}>
                <span style={{ fontWeight: 600, fontSize: 22, whiteSpace: 'nowrap', color: 'var(--text-primary)', marginBottom: 10 }}>{formatTimestamp(timestamp)}</span>
                <div style={{
                  width: 'min(90vw, 540px)',
                  maxWidth: 540,
                  height: 'min(56vw, 320px)',
                  maxHeight: 320,
                  background: '#fff', // fallback background
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img src={imagePaths[imageIdx]} alt="Emotion detection" style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
                </div>
                <div style={{
                  marginTop: 16,
                  color: 'var(--text-secondary)',
                  fontSize: 18,
                  fontFamily: '"Geist", "Inter", sans-serif',
                  lineHeight: 1.7,
                  maxWidth: 'min(90vw, 540px)',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 0,
                }}>
                  <span style={{ fontWeight: 500 }}>{getEmotionLabel(imagePaths[imageIdx])}</span>
                  <span>Image emotions tagging example</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 32,
              maxWidth: 540,
              margin: '0 auto',
            }}>
              {/* Waveform - stacked, smaller */}
              <div style={{ width: 320, height: 180, maxWidth: '100%', marginBottom: 24 }}>
                <svg width="100%" height="100%" viewBox="0 0 320 180" style={{ filter: isPlaying ? 'drop-shadow(0 0 16px #00f8)' : 'none', transition: 'filter 0.3s', cursor: 'pointer' }} onClick={handleScrub}>
                  <defs>
                    <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00f" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="160" cy="90" r="90" fill="url(#waveGlow)" />
                  {[0, 1, 2].map(layer => (
                    <g key={layer}>
                      {[...Array(64)].map((_, i) => {
                        const angle = (i / 64) * 2 * Math.PI;
                        const base = 80 + layer * 10;
                        const amp = [12, 8, 4][layer];
                        const speed = [0.7, 1.1, 1.7][layer];
                        const color = [
                          'rgba(0,128,255,0.85)',
                          'rgba(0,128,255,0.35)',
                          'rgba(0,128,255,0.15)'
                        ][layer];
                        const pulse = isPlaying ? amp * Math.abs(Math.sin(Date.now() / (220 - layer * 40) + i * speed + timestamp)) : 0;
                        const r = base + pulse;
                        const x1 = 160 + base * Math.cos(angle);
                        const y1 = 90 + base * Math.sin(angle);
                        const x2 = 160 + r * Math.cos(angle);
                        const y2 = 90 + r * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={color}
                            strokeWidth={layer === 0 ? 3 : 1.5}
                            strokeLinecap="round"
                            style={{ filter: layer === 0 ? 'blur(0.5px)' : 'blur(1.5px)' }}
                          />
                        );
                      })}
                    </g>
                  ))}
                  <circle cx="160" cy="90" r="60" stroke="#00f" strokeWidth="1.5" fill="none" opacity="0.18" />
                  <circle cx="160" cy="90" r="90" stroke="#00f" strokeWidth="2" fill="none" opacity="0.5" />
                </svg>
              </div>
              {/* Metadata Card - stacked, smaller */}
              <div style={{
                width: '100%',
                background: 'var(--bg-surface)',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                padding: '28px 16px',
                gap: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
              }}>
                <span style={{ fontWeight: 600, fontSize: 20, whiteSpace: 'nowrap', color: 'var(--text-primary)', marginBottom: 8 }}>{formatTimestamp(timestamp)}</span>
                <div style={{
                  width: 'min(90vw, 320px)',
                  maxWidth: 320,
                  height: 'min(56vw, 180px)',
                  maxHeight: 180,
                  background: '#fff', // fallback background
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img src={imagePaths[imageIdx]} alt="Emotion detection" style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
                </div>
                <div style={{
                  marginTop: 10,
                  color: 'var(--text-secondary)',
                  fontSize: 15,
                  fontFamily: '"Geist", "Inter", sans-serif',
                  lineHeight: 1.5,
                  maxWidth: 'min(90vw, 320px)',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 0,
                }}>
                  <span style={{ fontWeight: 500 }}>{getEmotionLabel(imagePaths[imageIdx])}</span>
                  <span>Image emotions tagging example</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : selectedTab === 'Details' ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: '"Geist", "Inter", sans-serif' }}>
          Details coming soon
        </div>
      ) : selectedTab === 'Pipeline' ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: '"Geist", "Inter", sans-serif' }}>
          Pipeline coming soon
        </div>
      ) : null}
    </div>
  );
} 