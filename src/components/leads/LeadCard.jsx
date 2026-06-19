import React from 'react';
import { Edit2, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadCard component displays a single lead in a card layout for mobile view.
 *
 * @param {Object} props - Component props
 * @param {Object} props.lead - The lead data object
 * @param {Function} props.onEdit - Function called when edit button is clicked
 * @param {Function} props.onDelete - Function called when delete button is clicked
 */
const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3 transition-colors">
      {/* Header: Name and Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{lead.company}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(lead)}
            className="min-h-11 min-w-11 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            aria-label="Edit lead"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(lead.id)}
            className="min-h-11 min-w-11 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            aria-label="Delete lead"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex">
        <StatusBadge status={lead.status} />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 truncate">{lead.email}</a>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">{lead.phone}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LeadCard);
