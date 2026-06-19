import React from 'react';
import { Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

const Dashboard = () => {
  const { leads } = useLeads();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-4 md:p-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <header>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your leads today.
          </p>
        </header>

        {/* Stats: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard
            title="Total Leads"
            value={leads.length}
            icon={<Users className="w-5 h-5" />}
            change="0.0"
            color="text-blue-600"
          />
          <StatsCard
            title="Active Pipeline"
            value={leads.filter((l) => !['Won', 'Lost'].includes(l.status)).length}
            icon={<TrendingUp className="w-5 h-5" />}
            change="0.0"
            color="text-amber-500"
          />
          <StatsCard
            title="Qualified Leads"
            value={
              leads.filter(
                (l) =>
                  l.status === 'Qualified' ||
                  l.status === 'Proposal Sent' ||
                  l.status === 'Meeting Scheduled'
              ).length
            }
            icon={<CheckCircle className="w-5 h-5" />}
            change="0.0"
            color="text-green-500"
          />
          <StatsCard
            title="Lost Leads"
            value={leads.filter((l) => l.status === 'Lost').length}
            icon={<AlertCircle className="w-5 h-5" />}
            change="0.0"
            color="text-red-500"
          />
        </div>

        {/* Charts: full width tablet → 2 col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <PipelineOverview leads={leads} />
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <RecentLeads leads={leads} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
