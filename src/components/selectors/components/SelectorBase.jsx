import { motion, AnimatePresence } from 'framer-motion';

/**
 * Base selector component with consistent styling and animations
 * Used by all specific selector types
 */
export default function SelectorBase({
  selectedValue,
  options = [],
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
  showSlash = true,
  fontSize = '14px',
  width = '200px',
  placeholder = 'Select...'
}) {
  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Selector Button */}
      <motion.button
        onClick={onToggle}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize,
          fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap'
        }}
        whileHover={{ backgroundColor: 'var(--bg-primary)' }}
        transition={{ duration: 0.05 }}
      >
        {selectedValue || placeholder}
        
        {/* Up/Down Chevrons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M2 5L6 1L10 5" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M2 1L6 5L10 1" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Forward Slash */}
        {showSlash && (
          <span style={{ color: 'var(--text-secondary)', opacity: 0.5, marginLeft: '4px' }}>/</span>
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && options.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              width,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              overflow: 'hidden'
            }}
          >
            {options.map((option, index) => (
              <SelectorOption
                key={option.name}
                option={option}
                isSelected={selectedValue === option.name}
                onClick={() => onSelect(option)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Individual selector option component
 */
function SelectorOption({ option, isSelected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: isSelected ? 'var(--bg-primary)' : 'transparent'
      }}
      whileHover={{ backgroundColor: 'var(--bg-primary)' }}
      transition={{ duration: 0.05 }}
    >
      {/* Icon */}
      <div style={{ 
        color: 'var(--text-secondary)', 
        display: 'flex', 
        alignItems: 'center',
        minWidth: '14px'
      }}>
        {option.icon}
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: isSelected ? 600 : 500,
          color: 'var(--text-primary)',
          marginBottom: option.description ? '2px' : 0
        }}>
          {option.name}
        </div>
        
        {option.description && (
          <div style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            opacity: 0.8
          }}>
            {option.description}
          </div>
        )}
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          flexShrink: 0
        }} />
      )}
    </motion.div>
  );
} 