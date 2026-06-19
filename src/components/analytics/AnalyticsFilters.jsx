import React, { memo, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import { DATE_RANGE_OPTIONS } from '../../constants';

const AnalyticsFilters = memo(({
  dateRange,
  customStart,
  customEnd,
  onDateRangeChange,
  onCustomRangeChange,
}) => {
  const handleCustomStart = useCallback(
    (e) => onCustomRangeChange(e.target.value, customEnd),
    [customEnd, onCustomRangeChange]
  );

  const handleCustomEnd = useCallback(
    (e) => onCustomRangeChange(customStart, e.target.value),
    [customStart, onCustomRangeChange]
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
        <Calendar size={16} />
        <span className="font-medium">Period</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {DATE_RANGE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onDateRangeChange(option.id)}
            className={`px-3 py-2.5 min-h-11 text-sm font-medium rounded-lg transition-all ${
              dateRange === option.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {dateRange === 'custom' && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={customStart}
            onChange={handleCustomStart}
            className="px-3 py-2.5 min-h-11 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
          <span className="text-slate-400">to</span>
          <input
            type="date"
            value={customEnd}
            onChange={handleCustomEnd}
            className="px-3 py-2.5 min-h-11 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
      )}
    </div>
  );
});

AnalyticsFilters.displayName = 'AnalyticsFilters';

export default AnalyticsFilters;
