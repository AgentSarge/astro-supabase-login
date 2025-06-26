import { motion, AnimatePresence } from 'framer-motion';
import { useDropdown } from '../hooks/useDropdown.js';

export default function DropdownBase({
  trigger,
  children,
  width = '240px',
  position = 'right',
  initialOpen = false,
  onToggle,
  className = ''
}) {
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown(initialOpen);

  const handleToggle = () => {
    toggleDropdown();
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      top: '45px',
      width,
      background: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      overflow: 'hidden'
    };

    switch (position) {
      case 'left':
        return { ...baseStyles, left: '0' };
      case 'center':
        return { ...baseStyles, left: '50%', transform: 'translateX(-50%)' };
      case 'right':
      default:
        return { ...baseStyles, right: '0' };
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }} className={className}>
      {/* Trigger Element */}
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={getPositionStyles()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 