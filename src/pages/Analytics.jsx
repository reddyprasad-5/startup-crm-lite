import React, { Suspense, useState, useEffect } from 'react';
import useAnalytics from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    filteredLeads,
    dateRange,
    customStart,
    customEnd,
    kpi,
    statusDistribution,
    monthlyLeads,
    conversionByMonth,
    revenueByMonth,
    leadSources,
    funnelData,
    salesVelocity,
    velocityGrowth,
    forecast,
    topPerformers,
    activityHeatmap,
    isEmpty,
    isFilteredEmpty,
    setDateRange,
    setCustomRange,
  } = useAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Track sales performance and growth trends.
            </p>
          </header>
          <EmptyAnalyticsState />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-4 md:p-6 overflow-y-auto transition-colors">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Track sales performance and growth trends.
            </p>
          </div>
          <AnalyticsFilters
            dateRange={dateRange}
            customStart={customStart}
            customEnd={customEnd}
            onDateRangeChange={setDateRange}
            onCustomRangeChange={setCustomRange}
          />
        </header>

        {isFilteredEmpty ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 md:p-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              No leads found for the selected date range. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <Suspense fallback={<LoadingSkeleton />}>
            <StatsCards kpi={kpi} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <PieChartCard data={statusDistribution} totalLeads={filteredLeads.length} />
              <FunnelChartCard data={funnelData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BarChartCard data={monthlyLeads} />
              <LineChartCard data={conversionByMonth} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <RevenueChartCard data={revenueByMonth} />
              <LeadSourceChart data={leadSources} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <ActivityHeatmap data={activityHeatmap} />
              <TopPerformersCard performers={topPerformers} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <ForecastCard forecast={forecast} />
              <SalesVelocityCard
                velocity={salesVelocity.velocity}
                velocityGrowth={velocityGrowth}
                salesVelocity={salesVelocity}
              />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Analytics;
