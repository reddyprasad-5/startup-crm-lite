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
      <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">No leads found. Add a new lead to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
        <thead className="bg-slate-50 text-gray-500 border-b border-gray-200 uppercase text-xs">
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
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
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
                  className="p-1.5 inline-flex items-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  aria-label="Edit lead"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(lead.id)}
                  className="p-1.5 inline-flex items-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  aria-label="Delete lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
