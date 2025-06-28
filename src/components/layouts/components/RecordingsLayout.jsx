import { VStack } from '../primitives/Stack.jsx';
import RecOverviewSection from '../../sections/RecOverviewSection.jsx';
import RecSection1 from '../../sections/RecSection1.jsx';
import RecSection2 from '../../sections/RecSection2.jsx';
import RecSection3 from '../../sections/RecSection3.jsx';
import { useState } from 'react';

export default function RecordingsLayout({ selectedRole, selectedLocation, selectedOffice }) {
  const [selectedRecording, setSelectedRecording] = useState(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Row 1: Overview Section */}
      <div style={{ 
        flexShrink: 0
      }}>
        <RecOverviewSection selectedRecording={selectedRecording} />
      </div>
      
      {/* Row 2: 3-Column Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 2fr',
        gap: '0',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Column 1 */}
        <div style={{
          borderRight: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          <RecSection1 
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
            selectedRecording={selectedRecording}
            setSelectedRecording={setSelectedRecording}
          />
        </div>
        
        {/* Column 2 */}
        <div style={{
          borderRight: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          <RecSection2 
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
            selectedRecording={selectedRecording}
          />
        </div>
        
        {/* Column 3 */}
        <div style={{
          overflow: 'hidden'
        }}>
          <RecSection3 
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            selectedOffice={selectedOffice}
          />
        </div>
      </div>
    </div>
  );
} 