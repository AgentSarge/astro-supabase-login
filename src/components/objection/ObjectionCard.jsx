import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ObjectionCard({ objection, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cost': return '#ef4444';
      case 'Hesitation': return '#f59e0b';
      case 'Technical': return '#8b5cf6';
      case 'Timing': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleUse = () => {
    console.log(`Use response for: ${objection.objection}`);
    // TODO: Implement use response functionality
  };

  const handleEdit = () => {
    console.log(`Edit response for: ${objection.objection}`);
    // TODO: Implement edit response functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '200px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
      }}
      whileHover={{ 
        borderColor: 'rgba(0, 112, 243, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        y: -2
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Category Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: getCategoryColor(objection.category),
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: 600,
        fontFamily: '"Geist", "Inter", sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {objection.category}
      </div>

      {/* Objection Text */}
      <div>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: '8px',
          fontFamily: '"Geist", "Inter", sans-serif',
          lineHeight: '1.4',
          paddingRight: '60px'
        }}>
          "{objection.objection}"
        </h3>
        
        {/* Response (expandable) */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : '60px',
            opacity: isExpanded ? 1 : 0.7
          }}
          style={{
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            margin: 0,
            fontFamily: '"Geist", "Inter", sans-serif',
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}>
            {objection.response}
          </p>
          
          {!isExpanded && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(transparent, var(--bg-surface))',
              pointerEvents: 'none'
            }} />
          )}
        </motion.div>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          <div>
            <span style={{ fontWeight: 600, color: '#10b981' }}>{objection.successRate}</span> success
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>{objection.usageCount}</span> uses
          </div>
          <div>
            Used {objection.lastUsed}
          </div>
        </div>
      </div>

      {/* Action Buttons (shown when expanded) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px'
          }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleUse();
            }}
            style={{
              flex: 1,
              padding: '8px 16px',
              background: '#10b981',
              border: '1px solid #10b981',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'white',
              fontFamily: '"Geist", "Inter", sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            whileHover={{ 
              background: '#059669',
              borderColor: '#059669'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            </svg>
            Use Response
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            style={{
              flex: 1,
              padding: '8px 16px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            whileHover={{ 
              background: 'var(--bg-surface)',
              borderColor: 'rgba(0, 112, 243, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
} 