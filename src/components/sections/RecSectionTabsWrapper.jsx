import { useState } from 'react';
import RecSection2 from './RecSection2.jsx';
import RecSection3 from './RecSection3.jsx';

export default function RecSectionTabsWrapper({
  selectedRole,
  selectedLocation,
  selectedOffice,
  selectedRecording,
  activeDetailPanel,
  setActiveDetailPanel,
}) {
  // Tabs: merge main and detail panel options
  const tabs = [
    { key: 'Recording', label: 'Recording' },
    { key: 'fullTranscript', label: 'Transcript' },
    { key: 'objections', label: 'Objections' },
    { key: 'tags', label: 'Tags' },
  ];
  // Local state for main tab
  const [selectedTab, setSelectedTab] = useState('Recording');

  // Handler for tab click
  const handleTabClick = (tabKey) => {
    if (['fullTranscript', 'objections', 'tags'].includes(tabKey)) {
      setActiveDetailPanel(tabKey);
    } else {
      setSelectedTab(tabKey);
      setActiveDetailPanel(null);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Tab Selector (always full width, no close button here) */}
      <div
        style={{
          position: 'relative',
          borderBottom: '1px solid var(--border-color)',
          background: 'transparent',
          padding: '0 24px',
          height: '38px',
          fontFamily: '"Geist", "Inter", sans-serif',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                color:
                  (selectedTab === tab.key && !['fullTranscript', 'objections', 'tags'].includes(tab.key)) ||
                  (activeDetailPanel === tab.key && ['fullTranscript', 'objections', 'tags'].includes(tab.key))
                    ? 'var(--accent-color)'
                    : 'var(--text-secondary)',
                fontWeight:
                  (selectedTab === tab.key && !['fullTranscript', 'objections', 'tags'].includes(tab.key)) ||
                  (activeDetailPanel === tab.key && ['fullTranscript', 'objections', 'tags'].includes(tab.key))
                    ? 600
                    : 500,
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom:
                  (selectedTab === tab.key && !['fullTranscript', 'objections', 'tags'].includes(tab.key)) ||
                  (activeDetailPanel === tab.key && ['fullTranscript', 'objections', 'tags'].includes(tab.key))
                    ? '2px solid var(--accent-color)'
                    : '2px solid transparent',
                width: 'fit-content',
                minWidth: 0,
                padding: '0 16px',
                marginBottom: '-2px',
                transition: 'color 0.2s, border-bottom 0.2s',
              }}
              aria-pressed={
                (selectedTab === tab.key && !['fullTranscript', 'objections', 'tags'].includes(tab.key)) ||
                (activeDetailPanel === tab.key && ['fullTranscript', 'objections', 'tags'].includes(tab.key))
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Content below tab selector: Section2 and Section3 side by side if needed */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: activeDetailPanel ? '2fr 2fr' : '1fr', height: '100%' }}>
        <div style={{ overflow: 'hidden', height: '100%' }}>
          <RecSection2
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
            selectedRecording={selectedRecording}
            selectedTab={selectedTab}
            activeDetailPanel={activeDetailPanel}
            setActiveDetailPanel={setActiveDetailPanel}
          />
        </div>
        {activeDetailPanel && (
          <div style={{ overflow: 'hidden', height: '100%' }}>
            <RecSection3
              selectedRole={selectedRole}
              selectedLocation={selectedLocation}
              selectedOffice={selectedOffice}
              panelType={activeDetailPanel}
              closePanel={() => setActiveDetailPanel(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
} 