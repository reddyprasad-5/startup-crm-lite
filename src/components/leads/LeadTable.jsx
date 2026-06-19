import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadTable component displays all leads in a tabular format for desktop view.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead data objects
 * @param {Function} props.onEdit - Function called when edit button is clicked
 * @param {Function} props.onDelete - Function called when delete button is clicked
 */
const LeadTable = ({ leads, onEdit, onDelete }) => {
  if (leads.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 text-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <p className="text-gray-500 dark:text-gray-400">No leads found. Add a new lead to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto transition-colors">
      <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 min-w-[800px]">
        <thead className="bg-slate-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Company</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">Source</th>
            <th className="px-6 py-4 font-semibold">Date Added</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{lead.name}</td>
              <td className="px-6 py-4">{lead.company}</td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">{lead.email}</td>
              <td className="px-6 py-4">{lead.source}</td>
              <td className="px-6 py-4">{new Date(lead.dateAdded).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right space-x-2">
                <button 
                  onClick={() => onEdit(lead)}
                  className="min-h-11 min-w-11 inline-flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  aria-label="Edit lead"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(lead.id)}
                  className="min-h-11 min-w-11 inline-flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  aria-label="Delete lead"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(LeadTable);
