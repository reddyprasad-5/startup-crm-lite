import React from 'react';

const FILTER_OPTIONS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

/**
 * FilterBar displays a row of status filters with counts.
 *
 * @param {Object} props
 * @param {string} props.activeFilter - The currently selected filter
 * @param {Function} props.onFilterChange - Callback when a filter is clicked
 * @param {Array} props.leads - Array of all leads to calculate counts
 */
const FilterBar = ({ activeFilter, onFilterChange, leads }) => {
  
  // Calculate counts for each status based on the raw leads array
  const counts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    acc['All'] = (acc['All'] || 0) + 1;
    return acc;
  }, { 'All': leads.length });

  return (
    <div className="flex overflow-x-auto pb-2 sm:pb-0 space-x-2 scrollbar-hide w-full md:w-auto">
      {FILTER_OPTIONS.map((filter) => {
        const isActive = activeFilter === filter;
        const count = counts[filter] || 0;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`whitespace-nowrap px-4 py-2.5 min-h-11 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {filter} <span className={`ml-1 ${isActive ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
