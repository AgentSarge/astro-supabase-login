import { motion } from 'framer-motion';
import { useLayout, useLayoutAnimation } from '../hooks/useLayout.js';

/**
 * Stack primitive for consistent vertical and horizontal layouts
 */
export default function Stack({
  children,
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'flex-start',
  animate = false,
  animationDelay = 0,
  wrap = false,
  style = {},
  ...props
}) {
  const { getSpacing } = useLayout();
  const animation = useLayoutAnimation(animationDelay);

  const stackStyle = {
    display: 'flex',
    flexDirection: direction,
    gap: getSpacing(gap),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style
  };

  if (animate) {
    return (
      <motion.div
        {...animation}
        style={stackStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={stackStyle} {...props}>
      {children}
    </div>
  );
}

/**
 * Horizontal stack (shorthand)
 */
export function HStack({ children, ...props }) {
  return (
    <Stack direction="row" {...props}>
      {children}
    </Stack>
  );
}

/**
 * Vertical stack (shorthand)
 */
export function VStack({ children, ...props }) {
  return (
    <Stack direction="column" {...props}>
      {children}
    </Stack>
  );
} 