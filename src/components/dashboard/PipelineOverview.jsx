import React from 'react';

/**
 * PipelineOverview component displays a horizontal bar representing the distribution of lead statuses.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead objects
 * @returns {React.ReactElement} The PipelineOverview component
 */
const PipelineOverview = ({ leads }) => {
  // Calculate total number of leads
  const total = leads.length;
  
  // Group and count leads by their status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Helper to calculate percentage for the bar widths
  const getPercentage = (count) => ((count / total) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Overview</h3>
      
      {/* Visual horizontal bar with segments proportional to status counts */}
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-4">
        {statusCounts['New'] && (
          <div style={{ width: `${getPercentage(statusCounts['New'])}%` }} className="bg-blue-600" title={`New: ${statusCounts['New']}`}></div>
        )}
        {statusCounts['Contacted'] && (
          <div style={{ width: `${getPercentage(statusCounts['Contacted'])}%` }} className="bg-amber-500" title={`Contacted: ${statusCounts['Contacted']}`}></div>
        )}
        {statusCounts['Qualified'] && (
          <div style={{ width: `${getPercentage(statusCounts['Qualified'])}%` }} className="bg-green-500" title={`Qualified: ${statusCounts['Qualified']}`}></div>
        )}
        {statusCounts['Lost'] && (
          <div style={{ width: `${getPercentage(statusCounts['Lost'])}%` }} className="bg-red-500" title={`Lost: ${statusCounts['Lost']}`}></div>
        )}
      </div>

      {/* Legend displaying colors and actual counts */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="text-gray-600 dark:text-gray-300">New ({statusCounts['New'] || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Contacted ({statusCounts['Contacted'] || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Qualified ({statusCounts['Qualified'] || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Lost ({statusCounts['Lost'] || 0})</span>
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;
