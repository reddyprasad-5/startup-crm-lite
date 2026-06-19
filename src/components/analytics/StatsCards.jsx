import React, { memo } from 'react';
import {
  Users,
  Target,
  IndianRupee,
  Trophy,
  Clock,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { formatCurrency } from '../../utils/analyticsHelpers';

const TrendBadge = ({ value, invert = false }) => {
  const isPositive = invert ? value < 0 : value > 0;
  const isNeutral = value === 0;

  if (isNeutral) {
    return <span className="text-xs text-slate-400">—</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}
    >
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {Math.abs(value)}%
    </span>
  );
};

const KpiCard = memo(({ label, value, subValue, icon: Icon, iconBg, trend, invertTrend }) => (
  <Card>
    <CardContent className="pt-6 flex items-start justify-between gap-4">
      <div className="space-y-1 min-w-0">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white truncate">{value}</p>
        {subValue !== undefined && (
          <div className="flex flex-wrap items-center gap-2">
            <TrendBadge value={trend} invert={invertTrend} />
            {subValue && <span className="text-xs text-slate-400 truncate">{subValue}</span>}
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl shrink-0 ${iconBg}`}>
        <Icon size={22} />
      </div>
    </CardContent>
  </Card>
));

KpiCard.displayName = 'KpiCard';

const StatsCards = memo(({ kpi }) => {
  const conversionTrend = Number((kpi.conversionRate - kpi.conversionRatePrev).toFixed(1));
  const cycleTrend = kpi.avgSalesCyclePrev
    ? Number(
        (
          ((kpi.avgSalesCycle - kpi.avgSalesCyclePrev) / kpi.avgSalesCyclePrev) *
          100
        ).toFixed(1)
      )
    : 0;
  const lostTrend = Number((kpi.lostRate - kpi.lostRatePrev).toFixed(1));

  const cards = [
    {
      label: 'Total Leads',
      value: kpi.totalLeads,
      trend: kpi.totalLeadsGrowth,
      icon: Users,
      iconBg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      subValue: 'vs previous period',
    },
    {
      label: 'Conversion Rate',
      value: `${kpi.conversionRate}%`,
      trend: conversionTrend,
      icon: Target,
      iconBg: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      subValue: 'vs previous period',
    },
    {
      label: 'Pipeline Value',
      value: formatCurrency(kpi.pipelineValue),
      trend: kpi.pipelineValuePrev
        ? Number(
            (
              ((kpi.pipelineValue - kpi.pipelineValuePrev) / kpi.pipelineValuePrev) *
              100
            ).toFixed(1)
          )
        : 0,
      icon: IndianRupee,
      iconBg: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      subValue: 'active deals',
    },
    {
      label: 'Won Revenue',
      value: formatCurrency(kpi.wonRevenue),
      trend: kpi.wonRevenuePrev
        ? Number(
            (((kpi.wonRevenue - kpi.wonRevenuePrev) / kpi.wonRevenuePrev) * 100).toFixed(1)
          )
        : 0,
      icon: Trophy,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      subValue: 'closed won',
    },
    {
      label: 'Avg Sales Cycle',
      value: `${kpi.avgSalesCycle} Days`,
      trend: cycleTrend,
      icon: Clock,
      iconBg: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      subValue: 'won deals',
      invertTrend: true,
    },
    {
      label: 'Lost Rate',
      value: `${kpi.lostRate}%`,
      trend: lostTrend,
      icon: TrendingDown,
      iconBg: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      subValue: 'vs previous period',
      invertTrend: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
