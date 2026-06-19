import React, { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';
import { CHART_COLORS } from '../../constants/analyticsColors';

const LineChartCard = memo(({ data }) => {
  if (!data?.length) {
    return (
      <Card className="min-h-[280px] md:h-[380px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No conversion data available.</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-600">
        <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          {payload[0].value}%
        </p>
      </div>
    );
  };

  return (
    <Card className="min-h-[280px] md:h-[380px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Monthly Conversion Trend
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Won leads / total leads</p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
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
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={CHART_COLORS.success}
              strokeWidth={3}
              dot={{ r: 5, fill: CHART_COLORS.success, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              animationBegin={0}
              animationDuration={1000}
            >
              <LabelList
                dataKey="rate"
                position="top"
                formatter={(v) => `${v}%`}
                style={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

LineChartCard.displayName = 'LineChartCard';

export default LineChartCard;
