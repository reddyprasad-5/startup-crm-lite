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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col gap-3">
      {/* Header: Name and Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{lead.company}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(lead)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            aria-label="Edit lead"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(lead.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete lead"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex">
        <StatusBadge status={lead.status} />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-gray-400" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 truncate">{lead.email}</a>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
