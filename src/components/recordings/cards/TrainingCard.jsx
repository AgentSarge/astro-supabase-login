import { motion } from 'framer-motion';

export default function TrainingCard({ 
  title,
  subtitle,
  categories = [],
  onCategoryClick,
  onBrowseLibrary,
  className = '',
  style = {} 
}) {
  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleBrowseLibrary = () => {
    if (onBrowseLibrary) {
      onBrowseLibrary();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={className}
      style={{
        background: 'var(--bg-surface)',
        padding: '48px 80px 40px 80px',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '200px',
        ...style
      }}
    >
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '8px',
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            margin: 0,
            fontFamily: '"Geist", "Inter", sans-serif'
          }}>
            {subtitle}
          </p>
        </div>
        
        <button 
          onClick={handleBrowseLibrary}
          style={{
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: '"Geist", "Inter", sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Browse Training Library
        </button>
      </div>

      {/* Training Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            onClick={() => handleCategoryClick(category)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = category.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            {/* Category Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: category.color,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  fontFamily: '"Geist", "Inter", sans-serif'
                }}>
                  {category.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: category.color,
                  fontFamily: '"Geist", "Inter", sans-serif',
                  fontWeight: '500'
                }}>
                  {category.count}
                </div>
              </div>
            </div>
            
            {/* Category Description */}
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: '1.5',
              fontFamily: '"Geist", "Inter", sans-serif',
              marginBottom: '16px'
            }}>
              {category.description}
            </p>
            
            {/* Action Button */}
            <button style={{
              background: 'transparent',
              color: category.color,
              border: `1px solid ${category.color}`,
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              fontFamily: '"Geist", "Inter", sans-serif'
            }}>
              Explore Training
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 