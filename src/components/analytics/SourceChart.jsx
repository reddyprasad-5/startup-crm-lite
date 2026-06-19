import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Define a distinct, professional color palette for the pie chart segments
const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#64748B'];

/**
 * Renders a Pie Chart illustrating the distribution of lead sources.
 *
 * @param {Object} props
 * @param {Array} props.leads - Global leads array
 */
const SourceChart = ({ leads }) => {
  // Aggregate leads by source dynamically
  const data = useMemo(() => {
    if (!leads || leads.length === 0) return [];

    const sourceCounts = leads.reduce((acc, lead) => {
      const source = lead.source || 'Other';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    // Convert object to array formatted for Recharts and sort
    return Object.keys(sourceCounts).map((key) => ({
      name: key,
      value: sourceCounts[key],
    })).sort((a, b) => b.value - a.value);
  }, [leads]);

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center h-80 transition-colors">
        <p className="text-gray-500 dark:text-gray-400">Not enough data to display Source Chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-80 flex flex-col transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leads by Source</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SourceChart;
