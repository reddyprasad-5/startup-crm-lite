import React from 'react';
import { useLeads } from '../context/LeadContext';
import KpiCards from '../components/analytics/KpiCards';
import SourceChart from '../components/analytics/SourceChart';
import TrendChart from '../components/analytics/TrendChart';

/**
 * Analytics page visualizing the CRM performance using Recharts.
 * Pulls global lead state directly from the Context API.
 */
const Analytics = () => {
  // Use LeadContext for global state
  const { leads } = useLeads();

  return (
    <div className="bg-slate-50 min-h-full p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor your pipeline health, conversion metrics, and lead sources.
          </p>
        </div>

        {/* Top-Level KPI Cards */}
        <KpiCards leads={leads} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart leads={leads} />
          <SourceChart leads={leads} />
        </div>

      </div>
    </div>
  );
};

export default Analytics;
