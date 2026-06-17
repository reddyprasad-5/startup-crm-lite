import React from 'react';

/**
 * StatsCard component displays a single metric with an icon, value, and change percentage.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the metric
 * @param {string|number} props.value - The main metric value
 * @param {React.ReactNode} props.icon - The Lucide icon component
 * @param {string|number} props.change - The percentage change vs last month
 * @param {string} props.color - The Tailwind text color class for the icon (e.g., 'text-blue-600')
 * @returns {React.ReactElement} The StatsCard component
 */
const StatsCard = ({ title, value, icon, change, color }) => {
  // Determine if the change is positive or negative for coloring
  const isPositive = parseFloat(change) >= 0;
  
  // Extract base color name (e.g. 'blue' from 'text-blue-600') for background styling
  const bgColorClass = color.replace('text-', 'bg-');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {/* Icon wrapper with dynamic colors matching the metric's theme */}
        <div className={`p-2 rounded-md bg-opacity-10 ${bgColorClass} ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {/* Display positive/negative change percentage */}
        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-1">vs last month</p>
    </div>
  );
};

export default StatsCard;
