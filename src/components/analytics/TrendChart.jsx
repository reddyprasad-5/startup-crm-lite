import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Formats a date string into a short, readable format (e.g., 'Jun 16').
 */
const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Renders a Line Chart showing the number of leads generated over time.
 *
 * @param {Object} props
 * @param {Array} props.leads - Global leads array
 */
const TrendChart = ({ leads }) => {
  const data = useMemo(() => {
    if (!leads || leads.length === 0) return [];

    // Group leads by creation date (YYYY-MM-DD)
    const dateGroups = leads.reduce((acc, lead) => {
      // Use createdAt if available, fallback to dateAdded or current date
      const dateStr = lead.createdAt || lead.dateAdded || new Date().toISOString();
      const dateKey = dateStr.split('T')[0]; 
      
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    // Convert to sorted array for the line chart
    return Object.keys(dateGroups)
      .sort((a, b) => new Date(a) - new Date(b)) // Chronological order
      .map((key) => ({
        date: formatDate(key),
        rawDate: key,
        Leads: dateGroups[key],
      }));
  }, [leads]);

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-80">
        <p className="text-gray-500">Not enough data to display Trend Chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Generation Trend</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="Leads" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#2563EB', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#1E40AF', stroke: '#EFF6FF', strokeWidth: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
