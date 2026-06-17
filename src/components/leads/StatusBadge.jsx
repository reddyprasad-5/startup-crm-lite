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
        return 'bg-gray-100 text-gray-700';
      case 'Contacted':
        return 'bg-blue-100 text-blue-700';
      case 'Meeting Scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'Proposal Sent':
        return 'bg-amber-100 text-amber-700';
      case 'Won':
        return 'bg-green-100 text-green-700';
      case 'Lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getBadgeColors()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
