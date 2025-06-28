export default function RecSection3({ selectedRole, selectedLocation, selectedOffice, panelType, closePanel }) {
  let content;
  if (panelType === 'fullTranscript') {
    content = <div>Full Transcript content goes here.</div>;
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