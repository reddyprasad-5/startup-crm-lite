import React, { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';
import { CHART_COLORS } from '../../constants/analyticsColors';

const BarChartCard = memo(({ data }) => {
  if (!data?.length) {
    return (
      <Card className="min-h-[280px] md:h-[380px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No monthly lead data available.</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-600">
        <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {payload[0].value} Leads
        </p>
      </div>
    );
  };

  return (
    <Card className="min-h-[280px] md:h-[380px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Monthly Leads Trend
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Last 6 months</p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
              label={{
                value: 'Lead Count',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748B', fontSize: 11 },
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
            <Bar
              dataKey="count"
              fill={CHART_COLORS.primary}
              radius={[6, 6, 0, 0]}
              animationBegin={0}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

BarChartCard.displayName = 'BarChartCard';

export default BarChartCard;
