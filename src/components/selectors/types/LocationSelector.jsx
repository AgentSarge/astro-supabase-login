import { useEffect } from 'react';
import SelectorBase from '../components/SelectorBase.jsx';
import { useSelector } from '../hooks/useSelector.js';
import { getAvailableLocations } from '../config/selectorConfig.jsx';

export default function LocationSelector({ selectedRole, userRole, onLocationChange }) {
  // Get available locations based on selected role
  const availableLocations = getAvailableLocations(selectedRole, userRole);
  
  // Use shared selector hook
  const {
    isOpen,
    setIsOpen,
    selectedValue,
    setSelectedValue,
    dropdownRef,
    handleSelection,
    handleOptionsChange
  } = useSelector({
    initialValue: '',
    onSelectionChange: (locationName, locationOption) => {
      if (onLocationChange) {
        onLocationChange(locationName);
      }
      console.log(`Selected location: ${locationName} - ${locationOption.description}`);
    },
    autoSelectFirst: true
  });

  // Handle when available locations change
  useEffect(() => {
    handleOptionsChange(availableLocations);
  }, [availableLocations]);

  // Reset selection when role changes
  useEffect(() => {
    setSelectedValue('');
  }, [selectedRole, setSelectedValue]);

  // Don't render if no locations available
  if (!availableLocations || availableLocations.length === 0) {
    return null;
  }

  return (
    <SelectorBase
      selectedValue={selectedValue}
      options={availableLocations}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onSelect={handleSelection}
      dropdownRef={dropdownRef}
      showSlash={true}
      fontSize="14px"
      width="220px"
      placeholder="Select Location"
    />
  );
} 