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
  monokai: {
    name: 'Monokai',
    colors: {
      background: '#272822',
      surface: '#383830',
      border: '#49483e',
      text: '#f8f8f2',
      textSecondary: '#a6e22e',
      accent: '#fd971f'
    }
  },
  monokaiDimmed: {
    name: 'Monokai Dimmed',
    colors: {
      background: '#222222',
      surface: '#2d2a2e',
      border: '#49483e',
      text: '#f8f8f2',
      textSecondary: '#a6e22e',
      accent: '#fd971f'
    }
  },
  dracula: {
    name: 'Dracula',
    colors: {
      background: '#282a36',
      surface: '#44475a',
      border: '#6272a4',
      text: '#f8f8f2',
      textSecondary: '#bd93f9',
      accent: '#ff79c6'
    }
  },
  oneDark: {
    name: 'One Dark',
    colors: {
      background: '#282c34',
      surface: '#21252b',
      border: '#3a3f4b',
      text: '#abb2bf',
      textSecondary: '#61afef',
      accent: '#c678dd'
    }
  },
  nord: {
    name: 'Nord',
    colors: {
      background: '#2e3440',
      surface: '#3b4252',
      border: '#4c566a',
      text: '#eceff4',
      textSecondary: '#81a1c1',
      accent: '#88c0d0'
    }
  },
  highContrast: {
    name: 'High Contrast',
    colors: {
      background: '#000000',
      surface: '#1a1a1a',
      border: '#ffffff',
      text: '#ffffff',
      textSecondary: '#ffea00',
      accent: '#ff1744'
    }
  },
  red: {
    name: 'Red',
    colors: {
      background: '#2d0000',
      surface: '#4b0000',
      border: '#ff1744',
      text: '#fff0f0',
      textSecondary: '#ff8a80',
      accent: '#ff1744'
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