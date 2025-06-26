import { useState, useEffect } from 'react';
import supabase from '../../supabaseClient.js';

/**
 * Authentication hook
 * Manages user session, profile data, and authentication state
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize session and set up auth listener
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setAuthError(error);
        } else {
          console.log('Initial session:', session);
          setSession(session);
          
          // If not authenticated, redirect to home
          if (!session) {
            console.log('No session, redirecting to home');
            window.location.href = '/';
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setAuthError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setAuthError(null);
      
      if (!session && event === 'SIGNED_OUT') {
        console.log('User signed out, redirecting to home');
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile data when session changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.email) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
          } else {
            console.log('User profile loaded:', data);
            setUserProfile(data);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
    };

    if (session) {
      fetchUserProfile();
    }
  }, [session]);

  // Sign out function
  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      setLoading(true);
      
      // Clear local session first
      setSession(null);
      setUserProfile(null);
      
      // Try to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      // Even if there's an error (like session missing), still redirect
      if (error) {
        console.warn('Sign out error (but continuing):', error.message);
      } else {
        console.log('Sign out successful');
      }
      
      // Always redirect regardless of error
      console.log('Redirecting to home...');
      window.location.href = '/';
      
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      // Force redirect even on error
      setSession(null);
      setUserProfile(null);
      window.location.href = '/';
    }
  };

  // Role transformation utility (extracted from GlobalNavbar)
  const transformRole = (role) => {
    if (!role) return 'Closer';
    const roleStr = role.toLowerCase();
    
    // Special override for testing: Will Sargent is now VP
    if (roleStr.includes('office') && roleStr.includes('manager')) return 'VP';
    
    if (roleStr.includes('vp') || roleStr.includes('vice president')) return 'VP';
    if (roleStr.includes('regional')) return 'Regional';
    if (roleStr.includes('district')) return 'District';
    if (roleStr.includes('setter')) return 'Setter';
    if (roleStr.includes('closer')) return 'Closer';
    // Default to capitalizing first letter for any other role
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  // Get transformed user role
  const userRole = userProfile?.role ? transformRole(userProfile.role) : 'Closer';

  return {
    // State
    session,
    userProfile,
    loading,
    authError,
    userRole,
    
    // Actions
    signOut,
    transformRole,
    
    // Computed values
    isAuthenticated: !!session,
    user: session?.user || null
  };
} 