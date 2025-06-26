/**
 * Navigation Icon Component
 * Renders SVG icons with consistent styling for navigation items
 */
export function NavIcon({ icon, className = '', style = {} }) {
  if (!icon) return null;

  const defaultStyle = {
    width: '16px',
    height: '16px',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    flexShrink: 0,
    ...style
  };

  if (icon.type === 'svg') {
    return (
      <svg
        viewBox={icon.viewBox || '0 0 24 24'}
        className={className}
        style={defaultStyle}
      >
        {icon.paths?.map((path, index) => {
          if (path.stroke) {
            return <line key={index} x1={path.x1} y1={path.y1} x2={path.x2} y2={path.y2} />;
          }
          return <path key={index} d={path.d} />;
        })}
      </svg>
    );
  }

  // Fallback for other icon types
  return (
    <div className={className} style={defaultStyle}>
      {icon.content || '?'}
    </div>
  );
}

// Pre-built common navigation icons
export const navIcons = {
  overview: {
    type: 'svg',
    viewBox: '0 0 24 24',
    paths: [
      { x1: '18', y1: '20', x2: '18', y2: '10', stroke: true },
      { x1: '12', y1: '20', x2: '12', y2: '4', stroke: true },
      { x1: '6', y1: '20', x2: '6', y2: '14', stroke: true }
    ]
  },
  dashboard: {
    type: 'svg',
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' }
    ]
  },
  analytics: {
    type: 'svg',
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M18 20V10M12 20V4M6 20v-6' }
    ]
  },
  settings: {
    type: 'svg',
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
      { d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' }
    ]
  }
}; 