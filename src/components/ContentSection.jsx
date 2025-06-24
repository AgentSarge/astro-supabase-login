import { motion } from 'framer-motion';
import BlankCard from './BlankCard.jsx';

export default function ContentSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        padding: '24px 48px',
        background: 'var(--bg-primary)',
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Content Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        flex: 1,
        overflow: 'hidden'
      }}>
        <BlankCard number="1.2" size="large" description="content cards" />
        <BlankCard number="2.1" size="large" description="content cards" />
      </div>
    </motion.div>
  );
} 