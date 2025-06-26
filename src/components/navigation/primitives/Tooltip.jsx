import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tooltip Component
 * Reusable tooltip with consistent styling and animations
 */
export function Tooltip({ 
  children, 
  content, 
  isVisible, 
  position = 'top',
  delay = 0,
  className = '',
  style = {} 
}) {
  if (!content || !isVisible) return children;

  const positions = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '8px'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: '8px'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: '8px'
    }
  };

  const arrowPositions = {
    top: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '4px solid #2a2a2a'
    },
    bottom: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderBottom: '4px solid #2a2a2a'
    },
    left: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: '4px solid #2a2a2a'
    },
    right: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderRight: '4px solid #2a2a2a'
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.15, delay }}
            className={className}
            style={{
              position: 'absolute',
              ...positions[position],
              padding: '6px 10px',
              background: '#2a2a2a',
              color: 'white',
              fontSize: '12px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              border: '1px solid #444',
              zIndex: 1000,
              fontFamily: '"Geist", "Inter", sans-serif',
              ...style
            }}
          >
            {content}
            {/* Tooltip arrow */}
            <div
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                ...arrowPositions[position]
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hook for managing tooltip state
 */
export function useTooltip(delay = 300) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggle = () => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle
  };
} 