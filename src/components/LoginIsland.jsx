import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginIsland() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // If already authenticated, redirect to dashboard
      if (session) {
        window.location.href = '/dashboard';
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Redirect to dashboard on successful login
      if (session) {
        window.location.href = '/dashboard';
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email to verify your account');
        setMessageType('success');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Success message will show briefly before redirect
        setMessage('Sign in successful! Redirecting...');
        setMessageType('success');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Only render login form if not authenticated
  if (session) {
    return (
      <motion.div 
        className="container"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', color: 'var(--secondary)' }}>
          Redirecting to dashboard...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {isSignUp ? 'Create Account' : 'Sign In'}
      </motion.h2>
      
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            disabled={loading}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileFocus={{ scale: 1.02, borderColor: '#0070f3' }}
          />
        </div>
        <div className="form-group">
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            disabled={loading}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileFocus={{ scale: 1.02, borderColor: '#0070f3' }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          className="btn-primary"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: '0 8px 25px rgba(0, 112, 243, 0.4)' 
          }}
          whileTap={{ scale: 0.98 }}
        >
          {loading && <span className="loading"></span>}
          {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </motion.button>
      </form>
      
      {message && (
        <motion.div 
          className={`message ${messageType}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
      
      <motion.p 
        style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          fontSize: '14px',
          color: 'var(--secondary)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <motion.button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage('');
            setMessageType('');
          }}
          className="toggle-link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </motion.button>
      </motion.p>
    </motion.div>
  );
} 