import React from 'react';

const mockObjections = [
  { label: 'Pricing', count: 42, color: '#f59e42' },
  { label: 'Think about it', count: 37, color: '#6366f1' },
  { label: 'Aesthetics', count: 29, color: '#10b981' },
  { label: 'Roof Condition', count: 21, color: '#f43f5e' },
  { label: 'HOA Rules', count: 17, color: '#fbbf24' },
  { label: 'Moving Soon', count: 13, color: '#3b82f6' },
  { label: 'Waiting for Tech', count: 9, color: '#a855f7' }
];

export default function ObjTableCard() {
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
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          Top 7 Objections
        </span>
      </div>
      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"Geist", "Inter", sans-serif', fontSize: '14px' }}>
        <thead>
          <tr style={{ color: 'var(--text-secondary)', background: 'transparent' }}>
            <th style={{ textAlign: 'left', padding: '10px 0 8px 36px', fontWeight: 600, letterSpacing: '0.5px' }}>Objection</th>
            <th style={{ textAlign: 'right', padding: '10px 32px 8px 0', fontWeight: 600, letterSpacing: '0.5px' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {mockObjections.map((obj) => (
            <tr key={obj.label} style={{ position: 'relative' }}>
              <td style={{
                padding: '10px 0 10px 36px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}>
                <span style={{
                  background: obj.color,
                  color: 'white',
                  borderRadius: '999px',
                  padding: '4px 14px',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.2px',
                  fontFamily: 'inherit',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>{obj.label}</span>
              </td>
              <td style={{
                textAlign: 'right',
                padding: '10px 32px 10px 0',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>{obj.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 