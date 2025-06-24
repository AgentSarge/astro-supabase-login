import OverviewHeader from './OverviewHeader.jsx';
import WidgetsSection from './WidgetsSection.jsx';
import ContentSection from './ContentSection.jsx';

export default function DashboardLayout({ selectedRole, selectedLocation, selectedOffice }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Row 1: Overview Header */}
      <OverviewHeader 
        selectedRole={selectedRole}
        selectedLocation={selectedLocation}
        selectedOffice={selectedOffice}
      />
      
      {/* Row 2: Widgets Section */}
      <WidgetsSection />
      
      {/* Row 3: Content Section (takes remaining space) */}
      <ContentSection />
    </div>
  );
} 