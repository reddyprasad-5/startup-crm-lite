import React, { memo } from 'react';
import { Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { formatCurrency } from '../../utils/analyticsHelpers';

const SalesVelocityCard = memo(({ velocity, velocityGrowth, salesVelocity }) => {
  const isPositive = velocityGrowth >= 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Sales Velocity
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Revenue generation rate
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(velocity)}
              <span className="text-base font-normal text-slate-500">/day</span>
            </p>
            <div
              className={`inline-flex items-center gap-1 mt-2 text-sm font-medium ${
                isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(velocityGrowth)}% vs previous period
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Opportunities</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {salesVelocity.opportunities}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Win Rate</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {salesVelocity.winRate}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avg Deal Size</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {formatCurrency(salesVelocity.avgDealSize)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sales Cycle</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {salesVelocity.cycleDays} days
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

SalesVelocityCard.displayName = 'SalesVelocityCard';

export default SalesVelocityCard;
