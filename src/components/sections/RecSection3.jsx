import { useEffect, useRef, useState } from 'react';

export default function RecSection3({ selectedRole, selectedLocation, selectedOffice, panelType, closePanel }) {
  // Mock transcript data
  const transcript = [
    { speaker: 'Sales Rep', text: 'Good afternoon! Sorry to bother you, but I wanted to ask if you have a moment to talk about your home energy costs?', timestamp: 1, tags: ['Greeting'] },
    { speaker: 'Homeowner', text: "Uh, sure, but I'm a bit busy. What's this about?", timestamp: 3, tags: ['Objection'] },
    { speaker: 'Sales Rep', text: "I completely understand! I'm with Ion Solar, and we're helping homeowners in your area save on their electricity bills.", timestamp: 6, tags: ['Product Pitch'] },
    { speaker: 'Homeowner', text: 'Is this going to take long?', timestamp: 8, tags: ['Objection'] },
    { speaker: 'Sales Rep', text: "Not at all—just a couple of minutes. May I ask if you've noticed your energy bills going up recently?", timestamp: 10, tags: ['Qualifying Question'] },
    { speaker: 'Homeowner', text: "Yeah, they have. But I'm not sure about switching to solar.", timestamp: 13, tags: ['Objection', 'Pricing Concern'] },
    { speaker: 'Sales Rep', text: "That's a common concern! Many homeowners are surprised how affordable it can be, especially with current incentives.", timestamp: 15, tags: ['Reassurance', 'Incentive Mention'] },
    { speaker: 'Sales Rep', text: "If you'd like, I can schedule a free consultation with one of our specialists—no obligation.", timestamp: 18, tags: ['Appointment Set'] },
    { speaker: 'Homeowner', text: 'Okay, that sounds good. When would that be?', timestamp: 20, tags: ['Appointment Interest'] },
    { speaker: 'Sales Rep', text: 'We have openings this Thursday or Friday. Which works better for you?', timestamp: 22, tags: ['Scheduling'] },
    { speaker: 'Homeowner', text: 'Friday works.', timestamp: 24, tags: ['Appointment Confirmed'] },
    { speaker: 'Sales Rep', text: "Great! I've got you down for Friday at 3pm. Thank you for your time!", timestamp: 26, tags: ['Closing'] },
    { speaker: 'Homeowner', text: 'Thank you.', timestamp: 28, tags: ['Closing'] },
  ];

  // Simulate playback highlight (replace with real playback time in future)
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (panelType === 'fullTranscript') {
      intervalRef.current = setInterval(() => {
        setCurrentIdx(idx => (idx < transcript.length - 1 ? idx + 1 : idx));
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [panelType, transcript.length]);

  // Tag color map for pill backgrounds
  const tagColors = {
    Greeting: '#7be495',
    Objection: '#ff6f61',
    'Product Pitch': '#5bc0eb',
    'Qualifying Question': '#ffe066',
    'Pricing Concern': '#f7b801',
    Reassurance: '#b388ff',
    'Incentive Mention': '#00bfae',
    'Appointment Set': '#00bcd4',
    'Appointment Interest': '#ffd166',
    Scheduling: '#a3a3a3',
    'Appointment Confirmed': '#43aa8b',
    Closing: '#222',
  };

  let content;
  if (panelType === 'fullTranscript') {
    content = (
      <div style={{
        width: '100%',
        maxWidth: 540,
        padding: '0',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        {transcript.slice(-8).map((line, idx) => {
          const isSalesRep = line.speaker === 'Sales Rep';
          const isActive = idx === currentIdx;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSalesRep ? 'flex-end' : 'flex-start',
                margin: '8px 0',
                width: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 4,
              }}>
                <span style={{
                  fontSize: 13,
                  color: 'var(--text-tertiary)',
                  fontWeight: 500,
                  letterSpacing: 0.2,
                  textTransform: 'uppercase',
                }}>{line.speaker}</span>
                {line.tags && line.tags.map((tag, tagIdx) => {
                  const bg = tagColors[tag] || 'var(--accent-color, #ffe066)';
                  const isDark = ['#222', '#5bc0eb', '#00bfae', '#00bcd4', '#43aa8b', '#b388ff', '#a3a3a3', '#ff6f61'].includes(bg);
                  return (
                    <span key={tagIdx} style={{
                      background: bg,
                      color: isDark ? '#fff' : '#222',
                      borderRadius: 12,
                      padding: '2px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      marginLeft: 6,
                      textTransform: 'capitalize',
                      letterSpacing: 0.2,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      display: 'inline-block',
                    }}>{tag}</span>
                  );
                })}
                <span style={{
                  fontSize: 12,
                  color: 'var(--text-tertiary)',
                  fontWeight: 400,
                  marginLeft: 4,
                }}>{`00:00:${line.timestamp.toString().padStart(2, '0')}`}</span>
              </div>
              <div
                style={{
                  background: isActive
                    ? 'var(--accent-color, #ffe066)'
                    : isSalesRep
                    ? 'var(--bg-primary, #fff)'
                    : 'var(--bg-surface, #f3f3f3)',
                  color: isActive
                    ? '#222'
                    : isSalesRep
                    ? 'var(--text-primary, #222)'
                    : 'var(--text-secondary, #444)',
                  borderRadius: isSalesRep ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: isActive
                    ? '0 2px 12px rgba(255,224,102,0.18)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                  padding: '8px 14px',
                  fontSize: 14,
                  fontWeight: 500,
                  maxWidth: '80%',
                  minWidth: 60,
                  marginLeft: isSalesRep ? 'auto' : 0,
                  marginRight: isSalesRep ? 0 : 'auto',
                  border: isActive ? '2px solid #ffe066' : 'none',
                  transition: 'background 0.2s, color 0.2s, border 0.2s',
                }}
              >
                {line.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (panelType === 'objections') {
    content = <div>Objections content goes here.</div>;
  } else if (panelType === 'tags') {
    content = <div>Tags content goes here.</div>;
  } else {
    content = <div>Unknown panel type.</div>;
  }

  return (
    <div style={{
      height: '100%',
      background: 'var(--bg-surface)',
      padding: '24px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <button
        onClick={closePanel}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 28,
          height: 28,
          background: 'none',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          padding: 0,
          transition: 'background 0.15s',
        }}
        aria-label="Close detail panel"
        tabIndex={0}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-primary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </svg>
      </button>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        fontSize: 18,
        textAlign: 'center',
      }}>
        {content}
      </div>
    </div>
  );
} 