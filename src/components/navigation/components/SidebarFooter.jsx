import { motion } from 'framer-motion';
import { Tooltip } from '../primitives/Tooltip.jsx';
import { brandingConfig } from '../config/navigationConfig.js';

/**
 * Sidebar Footer Component
 * Contains branding and collapse toggle button
 */
export function SidebarFooter({
  isCollapsed,
  isHovered,
  showTooltip,
  onToggleCollapse,
  onTooltipShow,
  onTooltipHide,
  className = '',
  style = {}
}) {
  const shouldShowExpandedContent = !isCollapsed || isHovered;

  return (
    <div
      className={className}
      style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: shouldShowExpandedContent ? 'space-between' : 'center',
        padding: shouldShowExpandedContent ? '0 1rem' : '0',
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        ...style
      }}
    >
      {/* Branding - Only show when expanded */}
      {shouldShowExpandedContent && (
        <span style={{
          color: 'var(--text-secondary)',
          fontSize: brandingConfig.footer.font.size,
          fontWeight: brandingConfig.footer.font.weight,
          fontFamily: brandingConfig.footer.font.family,
          letterSpacing: brandingConfig.footer.font.letterSpacing,
          textTransform: brandingConfig.footer.font.textTransform
        }}>
          {brandingConfig.footer.text}
        </span>
      )}

      {/* Collapse Toggle Button */}
      <Tooltip
        content={isCollapsed ? 'Expand on hover' : 'Collapse sidebar'}
        isVisible={showTooltip}
        position="top"
      >
        <motion.button
          onClick={onToggleCollapse}
          onMouseEnter={onTooltipShow}
          onMouseLeave={onTooltipHide}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            position: 'relative',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          whileHover={{ backgroundColor: 'var(--bg-surface)' }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed && !isHovered ? '→' : '←'}
        </motion.button>
      </Tooltip>
    </div>
  );
} 