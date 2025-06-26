import React from 'react';

const mockNextTraining = {
  topic: 'Handling Hesitation Objections',
  date: 'Friday, June 21, 2:00 PM',
  rep: 'Taylor Lee'
};

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function NextTrainingCard() {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '0',
      minHeight: '220px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 24px 10px 32px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-surface)'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          Next Training
        </span>
      </div>
      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '28px 24px 12px 24px',
        gap: '14px'
      }}>
        {/* Rep Avatar */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '20px',
          fontFamily: 'inherit',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>{getInitials(mockNextTraining.rep)}</div>
        <div style={{
          fontSize: '15px',
          color: 'var(--text-primary)',
          fontWeight: 600,
          fontFamily: '"Geist", "Inter", sans-serif',
          textAlign: 'center',
          marginBottom: '2px'
        }}>
          Next company-wide Zoom training:
        </div>
        {/* Topic Pill */}
        <span style={{
          background: 'rgba(59,130,246,0.12)',
          color: '#3b82f6',
          borderRadius: '999px',
          padding: '7px 18px',
          fontWeight: 700,
          fontSize: '15px',
          fontFamily: 'inherit',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          marginBottom: '2px',
          display: 'inline-block'
        }}>{mockNextTraining.topic}</span>
        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', opacity: 0.7, margin: '8px 0 0 0' }} />
        {/* Date Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#3b82f6',
          fontWeight: 600,
          fontFamily: '"Geist", "Inter", sans-serif',
          marginTop: '2px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {mockNextTraining.date} &mdash; Led by {mockNextTraining.rep}
        </div>
      </div>
    </div>
  );
} 