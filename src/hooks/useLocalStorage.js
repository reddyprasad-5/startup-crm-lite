import { useState } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * Acts identically to useState, but persists the data automatically.
 * Handles parsing, JSON serialization, and graceful fallback if localStorage is unavailable.
 *
 * @param {string} key - The unique localStorage key
 * @param {any} initialValue - Default value if key is not found or storage is unavailable
 * @returns {[any, Function]} Tuple containing the current stored value and a setter function
 */
const useLocalStorage = (key, initialValue) => {
  // Use a callback in useState so the lookup only executes on the initial render
  const [storedValue, setStoredValue] = useState(() => {
    // Edge Case: if run on server-side (SSR) or window is undefined
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Check if item exists in local storage
      const item = window.localStorage.getItem(key);
      
      // Parse JSON if it exists, otherwise return the provided default
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Gracefully handle JSON parsing errors (e.g., malformed data)
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Wrap the state setter to both update React state and localStorage simultaneously
  const setValue = (value) => {
    try {
      // Support functional updates just like standard useState: e.g. setValue(prev => prev + 1)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 1. Update React state
      setStoredValue(valueToStore);
      
      // 2. Persist to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Gracefully handle QuotaExceededError or disabled cookies/storage
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
