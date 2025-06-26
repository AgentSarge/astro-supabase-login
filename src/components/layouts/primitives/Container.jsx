import { motion } from 'framer-motion';
import { useLayout, useLayoutAnimation } from '../hooks/useLayout.js';

/**
 * Container primitive for consistent spacing and max-width
 */
export default function Container({
  children,
  maxWidth = '1000px',
  padding = 'lg',
  center = true,
  animate = false,
  animationDelay = 0,
  background = 'transparent',
  style = {},
  ...props
}) {
  const { getSpacing } = useLayout();
  const animation = useLayoutAnimation(animationDelay);

  const containerStyle = {
    maxWidth,
    width: '100%',
    margin: center ? '0 auto' : '0',
    padding: getSpacing(padding),
    background,
    ...style
  };

  if (animate) {
    return (
      <motion.div
        {...animation}
        style={containerStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={containerStyle} {...props}>
      {children}
    </div>
  );
} 