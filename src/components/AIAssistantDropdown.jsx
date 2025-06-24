import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistantDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hi! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M9 19c-5 0-8-3-8-6s3-6 8-6c2 0 4 1 6 3"/>
          <path d="M16 8l3-3 3 3"/>
          <path d="M19 5v7a2 2 0 0 1-2 2H9"/>
        </svg>
      ),
      title: 'Analyze Data',
      description: 'Get insights from your sales data',
      action: () => handleQuickAction('Can you analyze my recent sales performance and provide insights?')
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
      ),
      title: 'Generate Report',
      description: 'Create automated reports',
      action: () => handleQuickAction('Help me generate a sales report for this month')
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Optimize Process',
      description: 'Suggest workflow improvements',
      action: () => handleQuickAction('What are some ways I can optimize my sales process?')
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 9h8"/>
          <path d="M8 13h6"/>
        </svg>
      ),
      title: 'Draft Email',
      description: 'Create professional emails',
      action: () => handleQuickAction('Help me draft a follow-up email for a potential client')
    }
  ];

  const handleQuickAction = (message) => {
    setInputValue(message);
    handleSendMessage(message);
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me analyze the information and provide you with actionable insights.",
        "Great question! Based on your data, I can see several opportunities for improvement. Here are my recommendations...",
        "I can definitely assist with that. Let me break this down into manageable steps for you.",
        "That's an excellent use case for AI optimization. Here's what I suggest based on best practices...",
        "I'll help you create that right away. Here's a draft based on your requirements..."
      ];

      const assistantMessage = {
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          width: '32px',
          height: '32px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="8" y1="22" x2="16" y2="22"/>
        </svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '45px',
              right: '0',
              width: '380px',
              height: '500px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }} />
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: 'white'
              }}>
                AI Assistant
              </h3>
              <div style={{
                marginLeft: 'auto',
                fontSize: '11px',
                color: '#666',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '4px',
                padding: '2px 6px'
              }}>
                Online
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '12px 20px',
              borderBottom: '1px solid #333'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Quick Actions
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px'
              }}>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '8px',
                      color: 'white',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px'
                    }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <div style={{ marginTop: '1px' }}>
                      {action.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '2px' }}>
                        {action.title}
                      </div>
                      <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.2' }}>
                        {action.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              padding: '16px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      background: message.type === 'user' ? '#0070f3' : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px',
                      lineHeight: '1.4'
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#999',
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite' }} />
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite 0.2s' }} />
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite 0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '16px 20px',
              borderTop: '1px solid #333',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                style={{
                  background: inputValue.trim() ? '#0070f3' : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  color: 'white',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={inputValue.trim() ? { backgroundColor: '#0051cc' } : {}}
                whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add pulse animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 