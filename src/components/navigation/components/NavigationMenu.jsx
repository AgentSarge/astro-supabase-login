import { NavIcon } from '../primitives/NavIcon.jsx';
import { navigationUtils } from '../config/navigationConfig.js';

/**
 * Navigation Menu Item Component
 */
function NavigationMenuItem({ 
  item, 
  isCollapsed, 
  isActive = false, 
  onClick,
  className = '',
  style = {} 
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
    // Handle navigation if href is provided
    if (item.href && item.href !== window.location.pathname) {
      // For now, we're staying on the same page (dashboard)
      // In the future, this could handle routing
      console.log('Navigation to:', item.href);
    }
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = 'var(--bg-surface)';
    e.target.style.opacity = '0.8';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = 'transparent';
    e.target.style.opacity = '1';
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        padding: isCollapsed ? '12px' : '12px 16px',
        color: 'var(--text-primary)', // Always use primary text color
        fontSize: '14px',
        fontWeight: 500, // Always use normal weight
        fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        cursor: 'pointer',
        borderRadius: '6px',
        margin: '0 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.15s ease',
        background: 'transparent',
        border: 'none',
        width: 'auto',
        textAlign: 'left',
        position: 'relative',
        ...style
      }}
    >
      {/* Active Indicator - Blue rectangle on the left */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: isCollapsed ? '4px' : '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '3px',
            height: '20px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '2px',
            transition: 'all 0.15s ease'
          }}
        />
      )}
      
      <NavIcon icon={item.icon} />
      {!isCollapsed && (
        <span>{item.label}</span>
      )}
    </div>
  );
}

/**
 * Navigation Menu Component
 * Renders the complete navigation menu based on user role
 */
export function NavigationMenu({ 
  userRole = 'Closer', 
  isCollapsed = false,
  activeItemId = 'overview',
  onItemClick,
  className = '',
  style = {} 
}) {
  const menuItems = navigationUtils.getMenuItemsForRole(userRole);

  return (
    <nav 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '1rem 0',
        ...style
      }}
    >
      {menuItems.map((item) => (
        <NavigationMenuItem
          key={item.id}
          item={item}
          isCollapsed={isCollapsed}
          isActive={item.id === activeItemId}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
} 