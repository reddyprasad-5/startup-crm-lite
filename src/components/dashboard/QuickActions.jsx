import React from 'react';
import { PlusCircle, List, Download } from 'lucide-react';

/**
 * QuickActions component provides buttons for common workflow actions.
 *
 * @returns {React.ReactElement} The QuickActions component
 */
const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-3 mt-auto mb-auto">
        {/* Primary Action Button */}
        <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium shadow-sm">
          <PlusCircle className="w-4 h-4" />
          Add New Lead
        </button>
        {/* Secondary Action Button */}
        <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white hover:bg-slate-50 text-gray-700 border border-gray-200 rounded-md transition-colors text-sm font-medium shadow-sm">
          <List className="w-4 h-4" />
          View All Leads
        </button>
        {/* Tertiary Action Button */}
        <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white hover:bg-slate-50 text-gray-700 border border-gray-200 rounded-md transition-colors text-sm font-medium shadow-sm">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
