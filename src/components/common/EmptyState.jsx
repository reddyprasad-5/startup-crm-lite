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
    <div className="bg-white p-12 flex flex-col items-center justify-center text-center rounded-lg shadow-sm border border-gray-200">
      {hasLeadsTotal ? (
        <>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <SearchX className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No leads found</h3>
          <p className="text-gray-500 mb-4 text-sm max-w-sm">
            We couldn't find any leads matching your current search and filter criteria.
          </p>
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        </>
      ) : (
        <>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Your pipeline is empty</h3>
          <p className="text-gray-500 text-sm max-w-sm">
            You don't have any leads yet. Click "Add Lead" to create your first one.
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
