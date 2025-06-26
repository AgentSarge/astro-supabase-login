import { VStack } from '../primitives/Stack.jsx';
import { useLayout } from '../hooks/useLayout.js';
import { OverviewSection, TopRepsSection, TopOfficesSection, ObjectionMemorySection, WidgetsSection, ContentSection } from '../../sections/index.js';

export default function DashboardLayout({ selectedRole, selectedLocation, selectedOffice }) {
  const { breakpoints, getSpacing } = useLayout();

  // Determine if we're at Office Level (selectedOffice is set)
  const isOfficeLevel = selectedOffice && selectedOffice !== 'All Offices';
  
  // Determine if we're Individual level (Closer/Setter)
  const isIndividualLevel = selectedRole === 'Closer' || selectedRole === 'Setter';

  return (
    <VStack
      gap="none"
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        overflow: 'auto'
      }}
    >
      {/* Row 1: Overview Section */}
      <OverviewSection 
        selectedRole={selectedRole}
        selectedLocation={selectedLocation}
        selectedOffice={selectedOffice}
      />
      
      {/* Row 2: Widgets Section */}
      <WidgetsSection />
      
      {/* Row 3: Content Section */}
      <ContentSection />
      
      {/* Row 4: Top Reps Section / Rep Tracker */}
      <TopRepsSection 
        selectedRole={selectedRole}
        selectedLocation={selectedLocation}
        selectedOffice={selectedOffice}
      />
      
      {/* Row 5: Top Offices Section OR Objection Memory */}
      {isOfficeLevel ? (
        // Office Level: Show Objection Memory instead of Top Offices
        <ObjectionMemorySection 
          selectedRole={selectedRole}
          selectedLocation={selectedLocation}
          selectedOffice={selectedOffice}
        />
      ) : isIndividualLevel ? (
        // Individual Level: Show Objection Memory instead of Top Offices
        <ObjectionMemorySection 
          selectedRole={selectedRole}
          selectedLocation={selectedLocation}
          selectedOffice={selectedOffice}
        />
      ) : (
        // VP, Regional, District Levels: Show Top Offices
        <TopOfficesSection 
          selectedRole={selectedRole}
          selectedLocation={selectedLocation}
          selectedOffice={selectedOffice}
        />
      )}
      
      {/* Bottom spacing */}
      <div style={{ height: getSpacing('xl') }} />
    </VStack>
  );
} 