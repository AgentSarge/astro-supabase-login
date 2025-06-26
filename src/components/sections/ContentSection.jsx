import Container from "../layouts/primitives/Container.jsx";
import Grid from "../layouts/primitives/Grid.jsx";
import { SECTION_CONFIGS } from "../layouts/config/layoutConfig.js";
import BlankCard from '../BlankCard.jsx';

export default function ContentSection() {
  const sectionConfig = SECTION_CONFIGS.content;

  return (
    <Container
      padding={sectionConfig.padding}
      background={sectionConfig.background}
      animate={true}
      animationDelay={0.2}
      style={{
        flex: sectionConfig.flex,
        overflow: sectionConfig.overflow,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Content Cards Grid */}
      <Grid
        columns={sectionConfig.gridColumns}
        gap={sectionConfig.gridGap}
        style={{
          flex: 1,
          overflow: 'hidden'
        }}
      >
        <BlankCard number="1.2" size="large" description="content cards" />
        <BlankCard number="2.1" size="large" description="content cards" />
      </Grid>
    </Container>
  );
} 