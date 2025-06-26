import { useEffect } from 'react';
import SelectorBase from '../components/SelectorBase.jsx';
import { useSelector } from '../hooks/useSelector.js';
import { getAvailableRoles, transformRole } from '../config/selectorConfig.jsx';

export default function RoleSelector({ userRole = 'Closer', onRoleChange }) {
  // Transform and set initial role
  const initialRole = transformRole(userRole);
  
  // Get available roles based on user's permissions
  const availableRoles = getAvailableRoles(userRole);
  
  // Use shared selector hook
  const {
    isOpen,
    setIsOpen,
    selectedValue,
    dropdownRef,
    handleSelection
  } = useSelector({
    initialValue: initialRole,
    onSelectionChange: (roleName, roleOption) => {
      if (onRoleChange) {
        onRoleChange(roleName);
      }
      console.log(`Selected role: ${roleName} - ${roleOption.description}`);
    }
  });

  // Update selected role when userRole prop changes
  useEffect(() => {
    const newRole = transformRole(userRole);
    if (newRole !== selectedValue) {
      // This will trigger through the hook's useEffect
    }
  }, [userRole, selectedValue]);

  return (
    <SelectorBase
      selectedValue={selectedValue}
      options={availableRoles}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onSelect={handleSelection}
      dropdownRef={dropdownRef}
      showSlash={true}
      fontSize="14px"
      width="200px"
      placeholder="Select Role"
    />
  );
} 