import { motion } from 'framer-motion';

// Recording type icon component
const RecordingTypeIcon = ({ type, size = 16 }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  };

  switch (type) {
    case 'Call':
      return (
        <svg {...iconProps}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      );
    case 'Meeting':
      return (
        <svg {...iconProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case 'Training':
      return (
        <svg {...iconProps}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      );
    case 'Review':
      return (
        <svg {...iconProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    case 'Practice':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10,8 16,12 10,16 10,8"></polygon>
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10,8 16,12 10,16 10,8"></polygon>
        </svg>
      );
  }
};

export default function RecordingMenuItem({ 
  recording, 
  isSelected = false, 
  onClick,
  className = '',
  style = {} 
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(recording);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format: MM/DD HH:mm
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <motion.div
      onClick={handleClick}
      className={className}
      style={{
        width: '100%',
        background: isSelected ? 'var(--accent-color)' : 'transparent',
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: 'none',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 20px',
        margin: 0,
        boxSizing: 'border-box',
        color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
        ...style
      }}
      whileHover={{
        backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--bg-surface)',
        color: isSelected ? 'var(--bg-primary)' : 'var(--accent-color)'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {/* Name and Timestamp on the same line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'inherit',
        fontFamily: '"Geist", "Inter", sans-serif',
        lineHeight: '1.3',
        overflow: 'hidden',
        width: '100%'
      }}>
        <span style={{flex: 1, minWidth: 0}}>{recording.firstName && recording.lastName ? `${recording.firstName} ${recording.lastName}` : ''}</span>
        <span style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'inherit',
          whiteSpace: 'nowrap'
        }}>{formatDate(recording.date)}</span>
      </div>
    </motion.div>
  );
} 