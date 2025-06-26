import { motion } from 'framer-motion';

export default function DropdownItem({
  icon,
  label,
  description,
  onClick,
  variant = 'default', // 'default', 'danger', 'success'
  disabled = false,
  className = ''
}) {
  const getVariantStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.5 : 1
    };

    switch (variant) {
      case 'danger':
        return {
          ...baseStyles,
          color: disabled ? '#999' : '#ff6b6b'
        };
      case 'success':
        return {
          ...baseStyles,
          color: disabled ? '#999' : '#10b981'
        };
      default:
        return {
          ...baseStyles,
          color: disabled ? '#999' : '#fff'
        };
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      style={getVariantStyles()}
      className={className}
      whileHover={!disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
      whileTap={!disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
    >
      {/* Icon */}
      {icon && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px'
        }}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: '"Geist", "Inter", sans-serif'
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontSize: '12px',
            opacity: 0.7,
            marginTop: '2px',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {description}
          </div>
        )}
      </div>
    </motion.div>
  );
} 