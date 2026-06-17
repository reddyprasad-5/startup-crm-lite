import React from 'react';
import { Users, Target, Activity, XCircle } from 'lucide-react';

/**
 * Calculates and displays top-level KPIs based on the global leads array.
 *
 * @param {Object} props
 * @param {Array} props.leads - Array of lead objects
 */
const KpiCards = ({ leads }) => {
  const totalLeads = leads.length;
  
  const wonLeads = leads.filter((l) => l.status === 'Won').length;
  const lostLeads = leads.filter((l) => l.status === 'Lost').length;
  const activeLeads = totalLeads - wonLeads - lostLeads;

  // Calculate rates (protect against divide by zero)
  const winRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const lossRate = totalLeads > 0 ? Math.round((lostLeads / totalLeads) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
          <Users className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Win Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{winRate}%</p>
            <p className="text-sm text-gray-500">({wonLeads} won)</p>
          </div>
        </div>
        <div className="p-3 bg-green-50 rounded-full text-green-600">
          <Target className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Active Pipeline</p>
          <p className="text-3xl font-bold text-gray-900">{activeLeads}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-full text-amber-600">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Loss Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{lossRate}%</p>
            <p className="text-sm text-gray-500">({lostLeads} lost)</p>
          </div>
        </div>
        <div className="p-3 bg-red-50 rounded-full text-red-600">
          <XCircle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
