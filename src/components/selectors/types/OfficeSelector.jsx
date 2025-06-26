import { useEffect } from 'react';
import SelectorBase from '../components/SelectorBase.jsx';
import { useSelector } from '../hooks/useSelector.js';
import { getAvailableOffices } from '../config/selectorConfig.jsx';

export default function OfficeSelector({ selectedState, onOfficeChange }) {
  // Get available offices based on selected state/location
  const availableOffices = getAvailableOffices(selectedState);
  
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
    onSelectionChange: (officeName, officeOption) => {
      if (onOfficeChange) {
        onOfficeChange(officeName);
      }
      console.log(`Selected office: ${officeName} - ${officeOption.description}`);
    },
    autoSelectFirst: true
  });

  // Handle when available offices change
  useEffect(() => {
    handleOptionsChange(availableOffices);
  }, [availableOffices]);

  // Reset selection when state changes
  useEffect(() => {
    setSelectedValue('');
  }, [selectedState, setSelectedValue]);

  // Don't render if no offices available or no state selected
  if (!availableOffices || availableOffices.length === 0 || !selectedState) {
    return null;
  }

  return (
    <SelectorBase
      selectedValue={selectedValue}
      options={availableOffices}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onSelect={handleSelection}
      dropdownRef={dropdownRef}
      showSlash={false} // Last in chain, no slash
      fontSize="13px"
      width="200px"
      placeholder="Select Office"
    />
  );
} 