import { STATUS_COLORS } from '../constants/analyticsColors';
import {
  STATUS_ALIASES,
  SOURCE_ALIASES,
  FUNNEL_STAGES,
  DATE_RANGE_OPTIONS,
} from '../constants';

const STAGE_ORDER = { New: 0, Contacted: 1, Meeting: 2, Proposal: 3, Won: 4, Lost: -1 };

export const normalizeStatus = (status) => {
  if (!status) return 'New';
  return STATUS_ALIASES[status] || status;
};

export const normalizeSource = (source) => {
  if (!source) return 'Website';
  return SOURCE_ALIASES[source] || source;
};

export const getLeadValue = (lead) => {
  const value = Number(lead?.value);
  return Number.isFinite(value) && value >= 0 ? value : 0;
};

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const isActiveLead = (lead) => {
  const status = normalizeStatus(lead?.status);
  return status !== 'Won' && status !== 'Lost';
};

const daysBetween = (start, end) => {
  if (!start || !end) return null;
  const diff = end.getTime() - start.getTime();
  return diff >= 0 ? Math.round(diff / (1000 * 60 * 60 * 24)) : null;
};

export const formatCurrency = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatPercent = (value, decimals = 0) => {
  const num = Number(value) || 0;
  return `${num.toFixed(decimals)}%`;
};

export const getDateRangeBounds = (rangeId, customStart, customEnd) => {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  if (rangeId === 'custom' && customStart && customEnd) {
    return {
      start: new Date(customStart + 'T00:00:00'),
      end: new Date(customEnd + 'T23:59:59'),
    };
  }

  if (rangeId === 'year') {
    return {
      start: new Date(now.getFullYear(), 0, 1),
      end,
    };
  }

  const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
  const days = daysMap[rangeId] ?? 30;
  const start = new Date(end);
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

export const getPreviousPeriodBounds = (start, end) => {
  const duration = end.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - duration);
  prevStart.setHours(0, 0, 0, 0);
  prevEnd.setHours(23, 59, 59, 999);
  return { start: prevStart, end: prevEnd };
};

export const filterLeadsByDateRange = (leads, start, end) => {
  if (!leads?.length || !start || !end) return [];
  return leads.filter((lead) => {
    const created = parseDate(lead.createdAt || lead.dateAdded);
    if (!created) return false;
    return created >= start && created <= end;
  });
};

export const calcGrowthPercent = (current, previous) => {
  if (!previous || previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

const buildMonthBuckets = (count = 6) => {
  const months = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      name: d.toLocaleString('default', { month: 'short' }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }
  return months;
};

const getStageIndex = (lead) => {
  const status = normalizeStatus(lead?.status);
  return STAGE_ORDER[status] ?? 0;
};

const hasReachedStage = (lead, stage) => {
  const stageIdx = STAGE_ORDER[stage];
  if (stageIdx === undefined) return false;

  const timestampMap = {
    New: () => true,
    Contacted: () => lead.contactedAt || getStageIndex(lead) >= 1,
    Meeting: () => lead.meetingAt || getStageIndex(lead) >= 2,
    Proposal: () => lead.proposalAt || getStageIndex(lead) >= 3,
    Won: () => lead.wonAt || normalizeStatus(lead.status) === 'Won',
  };

  return timestampMap[stage]?.() ?? false;
};

export const getStatusDistribution = (leads) => {
  if (!leads?.length) return [];

  const statusCounts = {};
  leads.forEach((lead) => {
    const status = normalizeStatus(lead.status);
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const total = leads.length;
  return Object.entries(statusCounts)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1),
      color: STATUS_COLORS[name] || '#CBD5E1',
    }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyLeads = (leads) => {
  const months = buildMonthBuckets(6).map((m) => ({ ...m, count: 0 }));
  if (!leads?.length) return months.map(({ name, count }) => ({ name, count }));

  leads.forEach((lead) => {
    const d = parseDate(lead.createdAt || lead.dateAdded);
    if (!d) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const month = months.find((m) => m.key === key);
    if (month) month.count++;
  });

  return months.map(({ name, count }) => ({ name, count }));
};

export const getConversionByMonth = (leads) => {
  const months = buildMonthBuckets(6).map((m) => ({ ...m, total: 0, won: 0 }));
  if (!leads?.length) return months.map(({ name }) => ({ name, rate: 0 }));

  leads.forEach((lead) => {
    const d = parseDate(lead.createdAt || lead.dateAdded);
    if (!d) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const month = months.find((m) => m.key === key);
    if (month) {
      month.total++;
      if (normalizeStatus(lead.status) === 'Won') month.won++;
    }
  });

  return months.map(({ name, total, won }) => ({
    name,
    rate: total === 0 ? 0 : Number(((won / total) * 100).toFixed(1)),
  }));
};

export const getRevenueByMonth = (leads) => {
  const months = buildMonthBuckets(6).map((m) => ({ ...m, revenue: 0 }));
  if (!leads?.length) return months.map(({ name, revenue }) => ({ name, revenue }));

  leads.forEach((lead) => {
    if (normalizeStatus(lead.status) !== 'Won') return;
    const d = parseDate(lead.wonAt || lead.createdAt || lead.dateAdded);
    if (!d) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const month = months.find((m) => m.key === key);
    if (month) month.revenue += getLeadValue(lead);
  });

  return months.map(({ name, revenue }) => ({ name, revenue }));
};

export const getPipelineValue = (leads) => {
  if (!leads?.length) return 0;
  return leads.filter(isActiveLead).reduce((sum, lead) => sum + getLeadValue(lead), 0);
};

export const getWonRevenue = (leads) => {
  if (!leads?.length) return 0;
  return leads
    .filter((lead) => normalizeStatus(lead.status) === 'Won')
    .reduce((sum, lead) => sum + getLeadValue(lead), 0);
};

export const getConversionRate = (leads) => {
  if (!leads?.length) return 0;
  const won = leads.filter((l) => normalizeStatus(l.status) === 'Won').length;
  return Number(((won / leads.length) * 100).toFixed(1));
};

export const getAverageSalesCycle = (leads) => {
  if (!leads?.length) return 0;

  const cycles = leads
    .filter((lead) => normalizeStatus(lead.status) === 'Won')
    .map((lead) => {
      const created = parseDate(lead.createdAt || lead.dateAdded);
      const won = parseDate(lead.wonAt || lead.createdAt);
      return daysBetween(created, won);
    })
    .filter((d) => d !== null && d >= 0);

  if (!cycles.length) return 0;
  return Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
};

export const getLostRate = (leads) => {
  if (!leads?.length) return 0;
  const lost = leads.filter((l) => normalizeStatus(l.status) === 'Lost').length;
  return Number(((lost / leads.length) * 100).toFixed(1));
};

export const getLeadSourceStats = (leads) => {
  if (!leads?.length) return [];

  const sourceCounts = {};
  leads.forEach((lead) => {
    const source = normalizeSource(lead.source);
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });

  return Object.entries(sourceCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const getFunnelData = (leads) => {
  if (!leads?.length) {
    return FUNNEL_STAGES.map((stage) => ({
      name: stage,
      count: 0,
      conversionRate: 0,
      dropOffRate: 0,
      color: STATUS_COLORS[stage],
    }));
  }

  const counts = FUNNEL_STAGES.map((stage) => ({
    name: stage,
    count: leads.filter((lead) => hasReachedStage(lead, stage)).length,
    color: STATUS_COLORS[stage],
  }));

  return counts.map((stage, index) => {
    const nextCount = index < counts.length - 1 ? counts[index + 1].count : stage.count;
    const conversionRate =
      stage.count === 0 ? 0 : Number(((nextCount / stage.count) * 100).toFixed(1));
    const dropOffRate =
      stage.count === 0 ? 0 : Number((((stage.count - nextCount) / stage.count) * 100).toFixed(1));

    return { ...stage, conversionRate, dropOffRate };
  });
};

export const getSalesVelocity = (leads) => {
  if (!leads?.length) return { velocity: 0, opportunities: 0, winRate: 0, avgDealSize: 0, cycleDays: 0 };

  const opportunities = leads.filter(isActiveLead).length;
  const wonLeads = leads.filter((l) => normalizeStatus(l.status) === 'Won');
  const winRate = leads.length > 0 ? wonLeads.length / leads.length : 0;
  const avgDealSize =
    wonLeads.length > 0
      ? wonLeads.reduce((sum, l) => sum + getLeadValue(l), 0) / wonLeads.length
      : leads.reduce((sum, l) => sum + getLeadValue(l), 0) / Math.max(leads.length, 1);

  const cycleDays = getAverageSalesCycle(leads) || 18;
  const velocity = cycleDays > 0 ? (opportunities * winRate * avgDealSize) / cycleDays : 0;

  return {
    velocity: Math.round(velocity),
    opportunities,
    winRate: Number((winRate * 100).toFixed(1)),
    avgDealSize: Math.round(avgDealSize),
    cycleDays,
  };
};

export const getForecastRevenue = (leads) => {
  const revenueData = getRevenueByMonth(leads);
  const revenues = revenueData.map((m) => m.revenue).filter((r) => r > 0);

  if (!revenues.length) {
    return { forecast: 0, confidence: 0, growthTrend: 0, avgMonthly: 0 };
  }

  const avgMonthly = Math.round(revenues.reduce((a, b) => a + b, 0) / revenues.length);
  const recent = revenues.slice(-3);
  const older = revenues.slice(0, Math.max(revenues.length - 3, 1));
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
  const growthTrend = calcGrowthPercent(recentAvg, olderAvg);

  const variance =
    revenues.reduce((sum, r) => sum + Math.pow(r - avgMonthly, 2), 0) / revenues.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = avgMonthly > 0 ? stdDev / avgMonthly : 1;
  const confidence = Math.max(40, Math.min(95, Math.round(100 - coefficientOfVariation * 50)));

  return {
    forecast: avgMonthly,
    confidence,
    growthTrend,
    avgMonthly,
  };
};

export const getTopPerformers = (leads) => {
  if (!leads?.length) return [];

  const ownerRevenue = {};
  leads
    .filter((lead) => normalizeStatus(lead.status) === 'Won')
    .forEach((lead) => {
      const owner = lead.owner || 'Unassigned';
      ownerRevenue[owner] = (ownerRevenue[owner] || 0) + getLeadValue(lead);
    });

  return Object.entries(ownerRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
};

export const getActivityHeatmapData = (leads) => {
  const weeks = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 89);
  startDate.setHours(0, 0, 0, 0);

  const dayMap = {};
  for (let i = 0; i < 90; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dayMap[key] = { date: key, created: 0, meetings: 0, calls: 0, total: 0 };
  }

  if (leads?.length) {
    leads.forEach((lead) => {
      const created = parseDate(lead.createdAt || lead.dateAdded);
      if (created) {
        const key = created.toISOString().slice(0, 10);
        if (dayMap[key]) {
          dayMap[key].created++;
          dayMap[key].total++;
        }
      }

      const meeting = parseDate(lead.meetingAt);
      if (meeting) {
        const key = meeting.toISOString().slice(0, 10);
        if (dayMap[key]) {
          dayMap[key].meetings++;
          dayMap[key].total++;
        }
      }

      const call = parseDate(lead.contactedAt);
      if (call) {
        const key = call.toISOString().slice(0, 10);
        if (dayMap[key]) {
          dayMap[key].calls++;
          dayMap[key].total++;
        }
      }
    });
  }

  const days = Object.values(dayMap);
  const maxActivity = Math.max(...days.map((d) => d.total), 1);

  for (let w = 0; w < 13; w++) {
    weeks.push(days.slice(w * 7, w * 7 + 7));
  }

  return { weeks, maxActivity, days };
};

export const getKpiSummary = (leads, previousLeads) => {
  const totalLeads = leads?.length ?? 0;
  const prevTotalLeads = previousLeads?.length ?? 0;

  return {
    totalLeads,
    totalLeadsGrowth: calcGrowthPercent(totalLeads, prevTotalLeads),
    conversionRate: getConversionRate(leads),
    conversionRatePrev: getConversionRate(previousLeads),
    pipelineValue: getPipelineValue(leads),
    pipelineValuePrev: getPipelineValue(previousLeads),
    wonRevenue: getWonRevenue(leads),
    wonRevenuePrev: getWonRevenue(previousLeads),
    avgSalesCycle: getAverageSalesCycle(leads),
    avgSalesCyclePrev: getAverageSalesCycle(previousLeads),
    lostRate: getLostRate(leads),
    lostRatePrev: getLostRate(previousLeads),
  };
};
