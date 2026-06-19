import React from 'react';
import { PlusCircle, List, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';
import toast from 'react-hot-toast';

/**
 * QuickActions component provides buttons for common workflow actions.
 *
 * @returns {React.ReactElement} The QuickActions component
 */
const QuickActions = () => {
  const navigate = useNavigate();
  const { leads } = useLeads();

  const handleAddNewLead = () => {
    navigate('/leads', { state: { openAddModal: true } });
  };

  const handleViewAllLeads = () => {
    navigate('/leads');
  };

  const handleExportData = () => {
    if (!leads || leads.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Name', 'Company', 'Email', 'Phone', 'Status', 'Source', 'Date Added'];
    const csvRows = [headers.join(',')];

    leads.forEach(lead => {
      const row = [
        `"${lead.name || ''}"`,
        `"${lead.company || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.status || ''}"`,
        `"${lead.source || ''}"`,
        `"${lead.dateAdded || ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Data exported successfully!');
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-3 mt-auto mb-auto">
        {/* Primary Action Button */}
        <button 
          onClick={handleAddNewLead}
          className="flex items-center justify-center gap-2 w-full min-h-11 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Lead
        </button>
        {/* Secondary Action Button */}
        <button 
          onClick={handleViewAllLeads}
          className="flex items-center justify-center gap-2 w-full min-h-11 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <List className="w-4 h-4" />
          View All Leads
        </button>
        {/* Tertiary Action Button */}
        <button 
          onClick={handleExportData}
          className="flex items-center justify-center gap-2 w-full min-h-11 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
