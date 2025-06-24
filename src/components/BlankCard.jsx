import { motion } from 'framer-motion';

export default function BlankCard({ number, size = 'normal' }) {
  const isLarge = size === 'large';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: isLarge ? '24px' : '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isLarge ? '200px' : '120px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      whileHover={{ 
        borderColor: 'rgba(0, 112, 243, 0.5)',
        y: -2 
      }}
    >
      <div style={{
        fontSize: isLarge ? '24px' : '18px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        fontFamily: '"Geist", "Inter", sans-serif'
      }}>
        {number}
      </div>
    </motion.div>
  );
} 