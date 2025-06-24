import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  dark: {
    name: 'Dark',
    colors: {
      background: '#000000',
      surface: 'rgba(255, 255, 255, 0.02)',
      border: 'rgba(255, 255, 255, 0.12)',
      text: '#ffffff',
      textSecondary: '#999999',
      accent: '#0070f3'
    }
  },
  light: {
    name: 'Light',
    colors: {
      background: '#ffffff',
      surface: 'rgba(0, 0, 0, 0.02)',
      border: 'rgba(0, 0, 0, 0.1)',
      text: '#000000',
      textSecondary: '#666666',
      accent: '#0070f3'
    }
  },
  classicDark: {
    name: 'Classic Dark',
    colors: {
      background: '#1a1a1a',
      surface: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: '#cccccc',
      accent: '#0070f3'
    }
  },
  system: {
    name: 'System',
    colors: {
      background: '#000000', // Will be dynamic based on system preference
      surface: 'rgba(255, 255, 255, 0.02)',
      border: 'rgba(255, 255, 255, 0.12)',
      text: '#ffffff',
      textSecondary: '#999999',
      accent: '#0070f3'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  };

  // Load saved theme or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const theme = themes[currentTheme];
    const actualTheme = currentTheme === 'system' ? themes[getSystemTheme()] : theme;
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--bg-primary', actualTheme.colors.background);
    document.documentElement.style.setProperty('--bg-surface', actualTheme.colors.surface);
    document.documentElement.style.setProperty('--border-color', actualTheme.colors.border);
    document.documentElement.style.setProperty('--text-primary', actualTheme.colors.text);
    document.documentElement.style.setProperty('--text-secondary', actualTheme.colors.textSecondary);
    document.documentElement.style.setProperty('--accent-color', actualTheme.colors.accent);
    
    // Update body background
    document.body.style.background = actualTheme.colors.background;
    document.body.style.color = actualTheme.colors.text;
  }, [currentTheme]);

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (currentTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Re-trigger theme application
        setCurrentTheme('system');
      };
      
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
    }
  };

  const value = {
    currentTheme,
    themes,
    changeTheme,
    theme: themes[currentTheme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 