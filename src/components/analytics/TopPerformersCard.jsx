import React, { memo } from 'react';
import { Medal } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { formatCurrency } from '../../utils/analyticsHelpers';

const RANK_STYLES = [
  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
];

const TopPerformersCard = memo(({ performers }) => {
  if (!performers?.length) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[280px]">
        <p className="text-slate-500 dark:text-slate-400">No won deals to rank yet.</p>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <Medal size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Top Performers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Ranked by won revenue</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {performers.map((performer, index) => (
            <li
              key={performer.name}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    RANK_STYLES[index] || 'bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-300'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {performer.name}
                </span>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {formatCurrency(performer.revenue)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
});

TopPerformersCard.displayName = 'TopPerformersCard';

export default TopPerformersCard;
