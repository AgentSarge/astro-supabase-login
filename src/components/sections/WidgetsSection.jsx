import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../layouts/primitives/Container.jsx';
import Grid, { GridItem } from '../layouts/primitives/Grid.jsx';
import { useLayout } from '../layouts/hooks/useLayout.js';
import { SECTION_CONFIGS, LAYOUT_CONSTANTS } from '../layouts/config/layoutConfig.js';
import { WidgetCard, DEFAULT_WIDGETS } from '../widgets/index.js';

export default function WidgetsSection() {
  const [isShaking, setIsShaking] = useState(false);
  const { getSpacing, breakpoints } = useLayout();

  // Use the default widgets configuration
  const widgets = DEFAULT_WIDGETS;

  const handleWidgetClick = (widgetId) => {
    console.log(`Widget ${widgetId} clicked`);
    // Future: Handle widget configuration, editing, etc.
  };

  const sectionConfig = SECTION_CONFIGS.widgets;

  return (
    <Container
      maxWidth={sectionConfig.maxWidth}
      padding={sectionConfig.padding}
      background={sectionConfig.background}
      animate={true}
      animationDelay={0.1}
      style={{ position: 'relative' }}
    >
      {/* Plus Icon for Widget Management */}
      <div style={{
        position: 'fixed',
        top: breakpoints.isSmall ? '200px' : '290px',
        right: '8px',
        zIndex: LAYOUT_CONSTANTS.zIndex.tooltip
      }}>
        <div 
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip');
            if (tooltip) {
              tooltip.style.opacity = '1';
            }
            setIsShaking(true);
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip');
            if (tooltip) {
              tooltip.style.opacity = '0';
            }
            setIsShaking(false);
          }}
        >
          {/* Plus Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          
          {/* Tooltip */}
          <div 
            className="tooltip"
            style={{
              position: 'absolute',
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              marginRight: getSpacing('sm'),
              padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
              background: '#2a2a2a',
              color: 'white',
              fontSize: '12px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              border: '1px solid #444',
              opacity: 0,
              transition: 'opacity 0.15s ease',
              pointerEvents: 'none',
              fontFamily: '"Geist", "Inter", sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: getSpacing('xs')
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 3h5v5M4 20L20 4M21 16v5h-5M4 4l5 5"></path>
            </svg>
            Alter Widgets
            {/* Tooltip arrow */}
            <div style={{
              position: 'absolute',
              left: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '4px solid #2a2a2a'
            }} />
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <Grid
        columns={sectionConfig.gridColumns}
        gap={sectionConfig.gridGap}
      >
        {widgets.map((widget, index) => (
          <GridItem key={widget.id}>
            <motion.div
              animate={isShaking ? {
                x: [0, -1, 1, -1, 1, 0],
                y: [0, -1, 1, -1, 1, 0],
                rotate: [0, -0.5, 0.5, -0.5, 0.5, 0]
              } : {}}
              transition={{
                duration: 0.15 + index * 0.01,
                repeat: isShaking ? Infinity : 0,
                repeatType: "loop"
              }}
            >
              <WidgetCard
                id={widget.id}
                title={widget.title}
                content={widget.content}
                icon={widget.icon}
                isPlaceholder={widget.isPlaceholder}
                onClick={() => handleWidgetClick(widget.id)}
              />
            </motion.div>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
} 