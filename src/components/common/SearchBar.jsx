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
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        placeholder="Search by name, company, or email..."
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        aria-label="Search leads"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
