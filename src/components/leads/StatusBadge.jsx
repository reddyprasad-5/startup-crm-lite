import React from 'react';

/**
 * StatusBadge component displays a pill-shaped badge with color-coded status.
 *
 * @param {Object} props - Component props
 * @param {string} props.status - The status string
 */
const StatusBadge = ({ status }) => {
  // Determine color classes based on the status string
  const getBadgeColors = () => {
    switch (status) {
      case 'New':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Meeting Scheduled':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Proposal Sent':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Won':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Lost':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getBadgeColors()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
