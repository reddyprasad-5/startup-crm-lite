import React, { memo, useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const PieChartCard = memo(({ data, totalLeads }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = useCallback((_, index) => setActiveIndex(index), []);
  const onPieLeave = useCallback(() => setActiveIndex(null), []);

  if (!data?.length) {
    return (
      <Card className="min-h-[300px] md:h-[420px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No status data available.</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-600">
        <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{item.value} Leads</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{item.percentage}%</p>
      </div>
    );
  };

  const renderLegend = ({ payload }) => (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
      {payload.map((entry, index) => {
        const item = data.find((d) => d.name === entry.value);
        return (
          <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            <span
              className="w-3 h-3 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.value}</span>
            <span className="ml-1.5 text-slate-500">
              {item?.value} ({item?.percentage}%)
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card className="min-h-[300px] md:h-[420px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Lead Status Distribution
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Breakdown by pipeline stage
        </p>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalLeads}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Leads</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PieChartCard.displayName = 'PieChartCard';

export default PieChartCard;
