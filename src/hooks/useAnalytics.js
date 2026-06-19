import { useMemo, useState, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  getDateRangeBounds,
  getPreviousPeriodBounds,
  filterLeadsByDateRange,
  getKpiSummary,
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData,
  calcGrowthPercent,
} from '../utils/analyticsHelpers';

const useAnalytics = () => {
  const { leads } = useLeads();
  const [dateRange, setDateRange] = useState('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const bounds = useMemo(
    () => getDateRangeBounds(dateRange, customStart, customEnd),
    [dateRange, customStart, customEnd]
  );

  const previousBounds = useMemo(
    () => getPreviousPeriodBounds(bounds.start, bounds.end),
    [bounds.start, bounds.end]
  );

  const filteredLeads = useMemo(
    () => filterLeadsByDateRange(leads, bounds.start, bounds.end),
    [leads, bounds.start, bounds.end]
  );

  const previousLeads = useMemo(
    () => filterLeadsByDateRange(leads, previousBounds.start, previousBounds.end),
    [leads, previousBounds.start, previousBounds.end]
  );

  const kpi = useMemo(
    () => getKpiSummary(filteredLeads, previousLeads),
    [filteredLeads, previousLeads]
  );

  const statusDistribution = useMemo(
    () => getStatusDistribution(filteredLeads),
    [filteredLeads]
  );

  const monthlyLeads = useMemo(() => getMonthlyLeads(filteredLeads), [filteredLeads]);
  const conversionByMonth = useMemo(() => getConversionByMonth(filteredLeads), [filteredLeads]);
  const revenueByMonth = useMemo(() => getRevenueByMonth(filteredLeads), [filteredLeads]);
  const leadSources = useMemo(() => getLeadSourceStats(filteredLeads), [filteredLeads]);
  const funnelData = useMemo(() => getFunnelData(filteredLeads), [filteredLeads]);
  const salesVelocity = useMemo(() => getSalesVelocity(filteredLeads), [filteredLeads]);
  const previousVelocity = useMemo(() => getSalesVelocity(previousLeads), [previousLeads]);
  const forecast = useMemo(() => getForecastRevenue(filteredLeads), [filteredLeads]);
  const topPerformers = useMemo(() => getTopPerformers(filteredLeads), [filteredLeads]);
  const activityHeatmap = useMemo(() => getActivityHeatmapData(filteredLeads), [filteredLeads]);

  const velocityGrowth = useMemo(
    () => calcGrowthPercent(salesVelocity.velocity, previousVelocity.velocity),
    [salesVelocity.velocity, previousVelocity.velocity]
  );

  const handleDateRangeChange = useCallback((range) => {
    setDateRange(range);
  }, []);

  const handleCustomRangeChange = useCallback((start, end) => {
    setCustomStart(start);
    setCustomEnd(end);
    setDateRange('custom');
  }, []);

  const isEmpty = !leads?.length;
  const isFilteredEmpty = !filteredLeads?.length && !isEmpty;

  return {
    leads,
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
    setDateRange: handleDateRangeChange,
    setCustomRange: handleCustomRangeChange,
  };
};

export default useAnalytics;
