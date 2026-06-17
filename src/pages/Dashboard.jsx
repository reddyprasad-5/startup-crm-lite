import React from 'react';
import { Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * Dashboard page component assembling all dashboard widgets into a responsive grid.
 * Connects to LeadContext to display real-time global lead statistics.
 *
 * @returns {React.ReactElement} The complete Dashboard page
 */
const Dashboard = () => {
  // Retrieve global leads array from context
  const { leads } = useLeads();

  return (
    <div className="bg-slate-50 min-h-full p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Dashboard Header Title */}
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your leads today.</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Leads" 
            value={leads.length} 
            icon={<Users className="w-5 h-5" />} 
            change="0.0" 
            color="text-blue-600" 
          />
          <StatsCard 
            title="Active Pipeline" 
            value={leads.filter(l => !['Won', 'Lost'].includes(l.status)).length} 
            icon={<TrendingUp className="w-5 h-5" />} 
            change="0.0" 
            color="text-amber-500" 
          />
          <StatsCard 
            title="Qualified Leads" 
            value={leads.filter(l => l.status === 'Qualified' || l.status === 'Proposal Sent' || l.status === 'Meeting Scheduled').length} 
            icon={<CheckCircle className="w-5 h-5" />} 
            change="0.0" 
            color="text-green-500" 
          />
          <StatsCard 
            title="Lost Leads" 
            value={leads.filter(l => l.status === 'Lost').length} 
            icon={<AlertCircle className="w-5 h-5" />} 
            change="0.0" 
            color="text-red-500" 
          />
        </div>

        {/* Middle Section: Pipeline Overview (2/3 width) and Quick Actions (1/3 width) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PipelineOverview leads={leads} />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Bottom Section: Recent Leads Table stretching full width */}
        <div className="grid grid-cols-1 gap-6">
          <RecentLeads leads={leads} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
