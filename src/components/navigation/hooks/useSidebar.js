import { useState, useEffect, useRef } from 'react';

/**
 * Sidebar state management hook
 * Handles collapse/expand state, hover behavior, and tooltip visibility
 */
export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
    // Hide tooltip when toggling
    setShowTooltip(false);
  };

  // Handle mouse enter on sidebar
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave on sidebar
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle tooltip visibility for collapse button
  const handleTooltipShow = () => {
    setShowTooltip(true);
  };

  const handleTooltipHide = () => {
    setShowTooltip(false);
  };

  // Determine if sidebar should show expanded content
  const shouldShowExpandedContent = !isCollapsed || isHovered;

  // Determine current width for animations
  const currentWidth = shouldShowExpandedContent ? 240 : 60;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Toggle sidebar with Ctrl/Cmd + B
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleCollapse();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Load collapse state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      try {
        setIsCollapsed(JSON.parse(savedState));
      } catch (err) {
        console.warn('Failed to parse saved sidebar state:', err);
      }
    }
  }, []);

  return {
    // State
    isCollapsed,
    isHovered,
    showTooltip,
    sidebarRef,
    
    // Computed values
    shouldShowExpandedContent,
    currentWidth,
    
    // Actions
    toggleCollapse,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipShow,
    handleTooltipHide,
    
    // Utils
    getContentPadding: () => shouldShowExpandedContent ? '0 1rem' : '0',
    getContentJustification: () => shouldShowExpandedContent ? 'flex-start' : 'center',
    getButtonPadding: () => shouldShowExpandedContent ? '12px 16px' : '12px'
  };
} 