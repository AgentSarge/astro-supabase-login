import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="container">
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading && <span className="loading"></span>}
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        
        <p style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          fontSize: '14px',
          color: 'var(--secondary)'
        }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
              setMessageType('');
            }}
            className="toggle-link"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="welcome-container">
          <h2>Welcome back</h2>
          <div className="user-email">
            {session.user.email}
          </div>
          <p style={{ 
            marginBottom: '2rem', 
            color: 'var(--secondary)',
            fontSize: '14px'
          }}>
            You're successfully signed in to your account.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="btn-primary"
            style={{ maxWidth: '200px' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
} 