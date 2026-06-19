import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component with an internal debounce mechanism.
 *
 * @param {Object} props
 * @param {string} props.value - External value from parent
 * @param {Function} props.onChange - Called after debounce
 */
const SearchBar = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal value if external value changes (like when clearing filters)
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce the onChange callback by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [internalValue, onChange]);

  const handleClear = () => {
    setInternalValue('');
    onChange('');
  };

  return (
    <div className="relative w-full sm:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 min-h-11 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-sm transition-colors"
        placeholder="Search by name, company, or email..."
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        aria-label="Search leads"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center min-w-11 justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
