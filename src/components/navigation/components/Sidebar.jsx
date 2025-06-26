import { motion } from 'framer-motion';
import { NavigationLogo } from './NavigationLogo.jsx';
import { NavigationMenu } from './NavigationMenu.jsx';
import { SidebarFooter } from './SidebarFooter.jsx';
import { sidebarConfig } from '../config/navigationConfig.js';

/**
 * Sidebar Component
 * Main navigation sidebar with logo, menu, and footer
 */
export function Sidebar({
  isCollapsed,
  isHovered,
  userRole,
  activeMenuItem,
  onMouseEnter,
  onMouseLeave,
  onToggleCollapse,
  onMenuItemClick,
  showTooltip,
  onTooltipShow,
  onTooltipHide,
  className = '',
  style = {}
}) {
  const shouldShowExpandedContent = !isCollapsed || isHovered;
  const currentWidth = shouldShowExpandedContent ? 
    sidebarConfig.dimensions.expanded : 
    sidebarConfig.dimensions.collapsed;

  return (
    <motion.div
      initial={{ width: currentWidth }}
      animate={{ width: currentWidth }}
      transition={{ 
        duration: sidebarConfig.animation.duration,
        ease: sidebarConfig.animation.ease 
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 50,
        pointerEvents: 'auto',
        ...style
      }}
    >
      {/* Sidebar Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Logo Section */}
        <div style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: shouldShowExpandedContent ? '0 0.5rem' : '0'
        }}>
          <NavigationLogo isCollapsed={!shouldShowExpandedContent} />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu
          userRole={userRole}
          isCollapsed={!shouldShowExpandedContent}
          activeItemId={activeMenuItem}
          onItemClick={onMenuItemClick}
        />
      </div>

      {/* Sidebar Footer */}
      <SidebarFooter
        isCollapsed={isCollapsed}
        isHovered={isHovered}
        showTooltip={showTooltip}
        onToggleCollapse={onToggleCollapse}
        onTooltipShow={onTooltipShow}
        onTooltipHide={onTooltipHide}
      />
    </motion.div>
  );
} 