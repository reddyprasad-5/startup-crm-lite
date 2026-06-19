import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';
import { formatCurrency } from '../../utils/analyticsHelpers';
import { CHART_COLORS } from '../../constants/analyticsColors';

const RevenueChartCard = memo(({ data }) => {
  if (!data?.length) {
    return (
      <Card className="min-h-[280px] md:h-[380px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No revenue data available.</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-600">
        <p className="font-semibold text-slate-900 dark:text-white">{label} Revenue</p>
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  };

  return (
    <Card className="min-h-[280px] md:h-[380px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Revenue Analytics
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Won deals by month</p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.revenue} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.revenue} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={CHART_COLORS.revenue}
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              animationBegin={0}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

RevenueChartCard.displayName = 'RevenueChartCard';

export default RevenueChartCard;
