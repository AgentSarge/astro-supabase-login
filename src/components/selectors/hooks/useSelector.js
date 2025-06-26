import { useState, useRef, useEffect } from 'react';

/**
 * Shared hook for selector components
 * Provides common state management and behavior
 */
export function useSelector({ 
  initialValue = '', 
  onSelectionChange,
  autoSelectFirst = true 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Handle selection
  const handleSelection = (option) => {
    setSelectedValue(option.name);
    setIsOpen(false);
    
    if (onSelectionChange) {
      onSelectionChange(option.name, option);
    }
  };

  // Auto-select first option when options change
  const handleOptionsChange = (options) => {
    if (autoSelectFirst && options.length > 0 && !selectedValue) {
      const firstOption = options[0];
      setSelectedValue(firstOption.name);
      
      if (onSelectionChange) {
        onSelectionChange(firstOption.name, firstOption);
      }
    }
  };

  // Update selected value when initialValue changes
  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  return {
    isOpen,
    setIsOpen,
    selectedValue,
    setSelectedValue,
    dropdownRef,
    handleSelection,
    handleOptionsChange
  };
} 