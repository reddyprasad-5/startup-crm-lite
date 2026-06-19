import React, { memo } from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyAnalyticsState = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6">
        <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        No analytics available yet
      </h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
        Add your first lead to start tracking business performance.
      </p>
      <button
        type="button"
        onClick={() => navigate('/leads', { state: { openAddModal: true } })}
        className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
      >
        <Plus size={18} />
        Add Lead
      </button>
    </div>
  );
});

EmptyAnalyticsState.displayName = 'EmptyAnalyticsState';

export default EmptyAnalyticsState;
