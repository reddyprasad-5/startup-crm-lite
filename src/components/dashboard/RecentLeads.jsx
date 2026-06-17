import React from 'react';

/**
 * RecentLeads component displays the 5 most recent leads in a clean table.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead objects
 * @returns {React.ReactElement} The RecentLeads component
 */
const RecentLeads = ({ leads }) => {
  // Grab the last 5 leads for display
  const recent = leads.slice(0, 5);

  // Helper function to return a styled Tailwind badge based on lead status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">New</span>;
      case 'Contacted':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-600">Contacted</span>;
      case 'Qualified':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">Qualified</span>;
      case 'Lost':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">Lost</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
      <table className="w-full text-left text-sm text-gray-600 min-w-[600px]">
        <thead className="bg-slate-50 text-gray-500 border-b border-gray-100">
          <tr>
            <th className="px-4 py-3 font-medium rounded-tl-lg">Name</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium rounded-tr-lg">Date Added</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors last:border-0">
              <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
              <td className="px-4 py-3">{lead.company}</td>
              <td className="px-4 py-3">{getStatusBadge(lead.status)}</td>
              <td className="px-4 py-3">{new Date(lead.dateAdded).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentLeads;
