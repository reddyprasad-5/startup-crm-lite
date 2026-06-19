import React, { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';
import { SOURCE_COLORS } from '../../constants/analyticsColors';

const LeadSourceChart = memo(({ data }) => {
  if (!data?.length) {
    return (
      <Card className="min-h-[280px] md:h-[380px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No source data available.</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-600">
        <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{item.count} Leads</p>
      </div>
    );
  };

  return (
    <Card className="min-h-[280px] md:h-[380px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Lead Source Analytics
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Sorted by lead volume
        </p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
            <Bar
              dataKey="count"
              radius={[0, 6, 6, 0]}
              animationBegin={0}
              animationDuration={1000}
              barSize={22}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

LeadSourceChart.displayName = 'LeadSourceChart';

export default LeadSourceChart;
