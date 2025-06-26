import { motion } from 'framer-motion';
import { useLayout, useLayoutAnimation } from '../hooks/useLayout.js';

/**
 * Grid primitive for responsive grid layouts
 */
export default function Grid({
  children,
  columns = 4,
  gap = 'md',
  animate = false,
  animationDelay = 0,
  minItemWidth,
  style = {},
  ...props
}) {
  const { getGridColumns, getSpacing } = useLayout();
  const animation = useLayoutAnimation(animationDelay);

  // Calculate responsive columns
  const responsiveColumns = getGridColumns(columns);
  
  // Use auto-fit if minItemWidth is provided
  const gridTemplateColumns = minItemWidth 
    ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
    : `repeat(${responsiveColumns}, 1fr)`;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns,
    gap: getSpacing(gap),
    ...style
  };

  if (animate) {
    return (
      <motion.div
        {...animation}
        style={gridStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={gridStyle} {...props}>
      {children}
    </div>
  );
}

/**
 * Grid item wrapper with optional animation
 */
export function GridItem({
  children,
  animate = false,
  animationDelay = 0,
  style = {},
  ...props
}) {
  const animation = useLayoutAnimation(animationDelay);

  if (animate) {
    return (
      <motion.div
        {...animation}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
} 