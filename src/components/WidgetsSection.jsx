import { motion } from 'framer-motion';
import { useState } from 'react';
import BlankCard from './BlankCard.jsx';

export default function WidgetsSection() {
  const [isShaking, setIsShaking] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        padding: '24px 48px',
        background: 'var(--bg-primary)'
      }}
    >
      {/* Widgets Container with Settings */}
      <div style={{
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Plus Icon */}
        <div style={{
          position: 'fixed',
          top: '290px',
          right: '8px',
          zIndex: 10
        }}>
          <div 
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              // Show tooltip and start shaking
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                console.log('Tooltip shown');
              } else {
                console.log('Tooltip not found');
              }
              setIsShaking(true);
            }}
            onMouseLeave={(e) => {
              // Hide tooltip and stop shaking
              const tooltip = e.currentTarget.querySelector('.tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                console.log('Tooltip hidden');
              }
              setIsShaking(false);
            }}
          >
            {/* Plus Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            
            {/* Tooltip */}
            <div 
              className="tooltip"
              style={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                marginRight: '8px',
                padding: '6px 10px',
                background: '#2a2a2a',
                color: 'white',
                fontSize: '12px',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid #444',
                opacity: 0,
                transition: 'opacity 0.15s ease',
                pointerEvents: 'none',
                fontFamily: '"Geist", "Inter", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M4 20L20 4M21 16v5h-5M4 4l5 5"></path>
              </svg>
              Alter Widgets
              {/* Tooltip arrow */}
              <div style={{
                position: 'absolute',
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: '4px solid #2a2a2a'
              }} />
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <motion.div
            animate={isShaking ? {
              x: [0, -1, 1, -1, 1, 0],
              y: [0, -1, 1, -1, 1, 0],
              rotate: [0, -0.5, 0.5, -0.5, 0.5, 0]
            } : {}}
            transition={{
              duration: 0.15,
              repeat: isShaking ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <BlankCard number="1" description="widgets" />
          </motion.div>
          <motion.div
            animate={isShaking ? {
              x: [0, 1, -1, 1, -1, 0],
              y: [0, 1, -1, 1, -1, 0],
              rotate: [0, 0.5, -0.5, 0.5, -0.5, 0]
            } : {}}
            transition={{
              duration: 0.18,
              repeat: isShaking ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <BlankCard number="2" description="widgets" />
          </motion.div>
          <motion.div
            animate={isShaking ? {
              x: [0, -1, 1, -1, 1, 0],
              y: [0, 1, -1, 1, -1, 0],
              rotate: [0, -0.3, 0.3, -0.3, 0.3, 0]
            } : {}}
            transition={{
              duration: 0.16,
              repeat: isShaking ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <BlankCard number="3" description="widgets" />
          </motion.div>
          <motion.div
            animate={isShaking ? {
              x: [0, 1, -1, 1, -1, 0],
              y: [0, -1, 1, -1, 1, 0],
              rotate: [0, 0.4, -0.4, 0.4, -0.4, 0]
            } : {}}
            transition={{
              duration: 0.17,
              repeat: isShaking ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <BlankCard number="4" description="widgets" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 