import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext(undefined);

/**
 * ThemeProvider component that manages light/dark mode state and applies classes to the document body.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeProvider = ({ children }) => {
  // Replaced useState with useLocalStorage to remember the user's theme choice
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  // Still need useEffect to manipulate the actual DOM elements whenever isDarkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme between light and dark modes.
   */
  const toggleTheme = () => {
    // The setter from useLocalStorage supports functional updates correctly
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to consume the ThemeContext.
 *
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }}
 * @throws {Error} If used outside of a ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export context itself
export { ThemeContext };
