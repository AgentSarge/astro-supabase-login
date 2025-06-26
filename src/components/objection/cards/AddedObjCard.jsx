import React from 'react';

const mockTotalObjections = 124;
const mockWinRateChange = {
  percent: 4.2,
  direction: 'up' // or 'down'
};
const mockTimeline = 'This Month';

export default function AddedObjCard() {
  const isUp = mockWinRateChange.direction === 'up';
  const pillColor = isUp ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)';
  const pillText = isUp ? '#10b981' : '#ef4444';
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          Objections Tagged
        </span>
      </div>
      {/* Stats */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '28px 24px 12px 24px',
        gap: '12px'
      }}>
        <div style={{
          fontSize: '40px',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif',
          letterSpacing: '-1px',
          lineHeight: 1
        }}>
          {mockTotalObjections}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            background: pillColor,
            color: pillText,
            borderRadius: '999px',
            padding: '6px 16px',
            fontWeight: 700,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
          }}>
            {isUp ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pillText} strokeWidth="2"><polyline points="6 15 12 9 18 15"></polyline></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pillText} strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            )}
            {isUp ? '+' : ''}{mockWinRateChange.percent}% win rate {isUp ? 'increase' : 'decrease'}
          </span>
        </div>
      </div>
      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'var(--border-color)',
        opacity: 0.7
      }} />
      {/* Timeline */}
      <div style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif',
        textAlign: 'center',
        padding: '10px 0 14px 0',
        fontWeight: 500
      }}>
        {mockTimeline}
      </div>
    </div>
  );
} 