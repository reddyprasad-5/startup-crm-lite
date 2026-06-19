import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-11 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      aria-label="Toggle Dark Mode"
      title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
    >
      <span
        className={`flex items-center justify-center h-6 w-6 transform rounded-full bg-white transition-transform ${
          isDarkMode ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        {isDarkMode ? (
          <Moon size={14} className="text-blue-600" />
        ) : (
          <Sun size={14} className="text-orange-500" />
        )}
      </span>
    </button>
  );
};

export default DarkModeToggle;
