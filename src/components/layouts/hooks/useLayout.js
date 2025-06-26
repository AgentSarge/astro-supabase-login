import { useState, useEffect } from 'react';

/**
 * Shared hook for layout components
 * Provides responsive behavior and layout utilities
 */
export function useLayout() {
  const [screenSize, setScreenSize] = useState('desktop');
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Update screen size and dimensions on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      
      // Determine screen size category
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1440) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Responsive breakpoint helpers
  const breakpoints = {
    mobile: dimensions.width < 640,
    tablet: dimensions.width >= 640 && dimensions.width < 1024,
    desktop: dimensions.width >= 1024 && dimensions.width < 1440,
    large: dimensions.width >= 1440,
    isSmall: dimensions.width < 1024,
    isLarge: dimensions.width >= 1024
  };

  // Get responsive value based on current screen size
  const getResponsiveValue = (values) => {
    if (typeof values !== 'object') return values;
    
    if (breakpoints.mobile && values.mobile !== undefined) return values.mobile;
    if (breakpoints.tablet && values.tablet !== undefined) return values.tablet;
    if (breakpoints.desktop && values.desktop !== undefined) return values.desktop;
    if (breakpoints.large && values.large !== undefined) return values.large;
    
    // Fallback to default or first available value
    return values.default || values.desktop || Object.values(values)[0];
  };

  // Get responsive spacing
  const getSpacing = (size) => {
    const spacingMap = {
      xs: getResponsiveValue({ mobile: '4px', tablet: '6px', desktop: '8px' }),
      sm: getResponsiveValue({ mobile: '8px', tablet: '12px', desktop: '16px' }),
      md: getResponsiveValue({ mobile: '16px', tablet: '20px', desktop: '24px' }),
      lg: getResponsiveValue({ mobile: '24px', tablet: '32px', desktop: '48px' }),
      xl: getResponsiveValue({ mobile: '32px', tablet: '48px', desktop: '64px' })
    };
    
    return spacingMap[size] || size;
  };

  // Get responsive grid columns
  const getGridColumns = (columns) => {
    if (typeof columns === 'number') {
      return getResponsiveValue({
        mobile: Math.min(columns, 1),
        tablet: Math.min(columns, 2),
        desktop: columns
      });
    }
    
    return getResponsiveValue(columns);
  };

  return {
    screenSize,
    dimensions,
    breakpoints,
    getResponsiveValue,
    getSpacing,
    getGridColumns
  };
}

/**
 * Hook for managing layout animations
 */
export function useLayoutAnimation(delay = 0) {
  const initialAnimation = {
    opacity: 0,
    y: 20
  };

  const animateAnimation = {
    opacity: 1,
    y: 0
  };

  const transition = {
    duration: 0.4,
    delay,
    ease: 'easeOut'
  };

  return {
    initial: initialAnimation,
    animate: animateAnimation,
    transition
  };
} 