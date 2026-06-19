import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

/**
 * EmptyState shows a message when no leads are found.
 *
 * @param {Object} props
 * @param {boolean} props.hasLeadsTotal - True if there are leads in the system but none match the filter
 * @param {Function} props.onClearFilters - Function to reset search/filters
 */
const EmptyState = ({ hasLeadsTotal, onClearFilters }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-12 flex flex-col items-center justify-center text-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      {hasLeadsTotal ? (
        <>
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 transition-colors">
            <SearchX className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm max-w-sm">
            We couldn't find any leads matching your current search and filter criteria.
          </p>
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Clear all filters
          </button>
        </>
      ) : (
        <>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 transition-colors">
            <Inbox className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Your pipeline is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
            You don't have any leads yet. Click "Add Lead" to create your first one.
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
