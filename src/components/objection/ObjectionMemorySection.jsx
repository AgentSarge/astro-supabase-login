import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ObjectionCard from './ObjectionCard.jsx';
import ObjTableCard from './cards/ObjTableCard.jsx';
import AddedObjCard from './cards/AddedObjCard.jsx';
import RecommendedTrainingCard from './cards/RecommendedTrainingCard.jsx';
import NextTrainingCard from './cards/NextTrainingCard.jsx';

// Sample objection memory data
const getObjectionMemoryData = () => {
  return [
    {
      id: 1,
      objection: "Solar panels are too expensive",
      response: "I understand cost is a concern. Let me show you how our financing options can actually lower your monthly energy costs from day one.",
      category: 'Cost',
      successRate: '85%',
      usageCount: 47,
      lastUsed: '2 days ago'
    },
    {
      id: 2,
      objection: "I need to think about it",
      response: "I completely understand wanting to make an informed decision. What specific concerns can I address to help you feel confident moving forward?",
      category: 'Hesitation',
      successRate: '72%',
      usageCount: 32,
      lastUsed: '1 day ago'
    },
    {
      id: 3,
      objection: "My roof won't work for solar",
      response: "That's a common concern! Our engineers have successfully installed on 95% of roofs we've evaluated. Let's do a quick assessment together.",
      category: 'Technical',
      successRate: '78%',
      usageCount: 28,
      lastUsed: '3 hours ago'
    },
    {
      id: 4,
      objection: "I want to wait for better technology",
      response: "Solar technology is already incredibly efficient. Plus, every month you wait costs you money in utility bills. Let me show you the numbers.",
      category: 'Timing',
      successRate: '68%',
      usageCount: 19,
      lastUsed: '5 days ago'
    }
  ];
};

export default function ObjectionMemorySection({ selectedRole, selectedLocation, selectedOffice }) {
  const objectionsData = getObjectionMemoryData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const dropdownRef = useRef(null);
  const manageRef = useRef(null);

  const categories = ['all', 'cost', 'hesitation', 'technical', 'timing'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (manageRef.current && !manageRef.current.contains(event.target)) {
        setIsManageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter objections by category
  const filteredObjections = selectedCategory === 'all' 
    ? objectionsData 
    : objectionsData.filter(obj => obj.category.toLowerCase() === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-primary)',
        padding: '48px 80px',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
          marginLeft: '60px',
          marginRight: '60px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              margin: 0
            }}>
              Objection Memory
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontFamily: '"Geist", "Inter", sans-serif',
              margin: 0
            }}>
              Your proven responses to common objections
            </p>
          </div>

          {/* Right Side Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Manage Objections Button */}
            <div ref={manageRef} style={{ position: 'relative' }}>
              <motion.button
                onClick={() => setIsManageOpen(!isManageOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                whileHover={{
                  borderColor: 'rgba(0, 112, 243, 0.3)',
                  background: 'var(--bg-primary)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </motion.button>

              {/* Manage Dropdown */}
              {isManageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    minWidth: '180px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '8px 12px',
                    fontSize: '11px',
                    color: '#999',
                    fontFamily: '"Geist", "Inter", sans-serif',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #333'
                  }}>
                    Manage Objections
                  </div>
                  {['Add New Objection', 'Import Templates', 'Export Library', 'Reset to Defaults'].map((action) => (
                    <motion.div
                      key={action}
                      onClick={() => {
                        console.log(action);
                        setIsManageOpen(false);
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: 'white',
                        fontFamily: '"Geist", "Inter", sans-serif',
                        cursor: 'pointer'
                      }}
                      whileHover={{
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {action}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Category Filter */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontFamily: '"Geist", "Inter", sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
                whileHover={{
                  borderColor: 'rgba(0, 112, 243, 0.3)',
                  background: 'var(--bg-primary)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCategory}
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </motion.button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    minWidth: '120px',
                    overflow: 'hidden'
                  }}
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: selectedCategory === category ? '#0070f3' : 'white',
                        fontFamily: '"Geist", "Inter", sans-serif',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        background: selectedCategory === category ? 'rgba(0, 112, 243, 0.1)' : 'transparent'
                      }}
                      whileHover={{
                        background: selectedCategory === category ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {category}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Objections Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <ObjTableCard />
          <AddedObjCard />
          {selectedRole === 'VP' ? <RecommendedTrainingCard /> : <NextTrainingCard />}
        </div>
      </div>
    </motion.div>
  );
} 