import { useTheme } from '../../ThemeProvider.jsx';
import { navigationUtils, logoConfig } from '../config/navigationConfig.js';

/**
 * Navigation Logo Component
 * Renders the appropriate logo based on theme and sidebar state
 */
export function NavigationLogo({ isCollapsed, className = '', style = {} }) {
  const { currentTheme } = useTheme();

  // Determine if system theme is light
  const isSystemLight = currentTheme === 'system' && 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: light)').matches;

  const logoSrc = navigationUtils.getLogo(currentTheme, isCollapsed, isSystemLight);
  const dimensions = isCollapsed ? logoConfig.dimensions.collapsed : logoConfig.dimensions.expanded;

  return (
    <img
      src={logoSrc}
      alt={isCollapsed ? 'ION' : 'ION Solar'}
      className={className}
      style={{
        ...dimensions,
        objectFit: 'contain',
        transition: 'all 0.3s ease',
        ...style
      }}
    />
  );
} 