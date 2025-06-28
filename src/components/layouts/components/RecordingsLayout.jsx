import { VStack } from '../primitives/Stack.jsx';
import RecOverviewSection from '../../sections/RecOverviewSection.jsx';
import RecSection1 from '../../sections/RecSection1.jsx';
import RecSection2 from '../../sections/RecSection2.jsx';
import RecSection3 from '../../sections/RecSection3.jsx';
import RecSectionTabsWrapper from '../../sections/RecSectionTabsWrapper.jsx';
import { useState } from 'react';

export default function RecordingsLayout({ selectedRole, selectedLocation, selectedOffice }) {
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [activeDetailPanel, setActiveDetailPanel] = useState(null);

  const showDetailPanel = !!activeDetailPanel;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Row 1: Overview Section */}
      <div style={{ flexShrink: 0 }}>
        <RecOverviewSection selectedRecording={selectedRecording} />
      </div>
      {/* Row 2: Main Layout */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 4fr',
          gap: 0,
          overflow: 'hidden',
          minHeight: 0,
          transition: 'grid-template-columns 0.3s',
        }}
      >
        {/* Column 1: Sidebar */}
        <div style={{ borderRight: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <RecSection1
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
            selectedRecording={selectedRecording}
            setSelectedRecording={setSelectedRecording}
          />
        </div>
        {/* Column 2: Tabs Wrapper (spans both Section2 and Section3 widths) */}
        <div style={{ overflow: 'hidden', height: '100%' }}>
          <RecSectionTabsWrapper
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
            selectedRecording={selectedRecording}
            activeDetailPanel={activeDetailPanel}
            setActiveDetailPanel={setActiveDetailPanel}
          />
        </div>
      </div>
    </div>
  );
} 