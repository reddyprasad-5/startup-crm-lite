import React, { memo } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { formatCurrency } from '../../utils/analyticsHelpers';

const ForecastCard = memo(({ forecast }) => {
  const isPositive = forecast.growthTrend >= 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Revenue Forecast
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Based on last 6 months average
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Predicted Revenue Next Month
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(forecast.forecast)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Confidence</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {forecast.confidence}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${forecast.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(forecast.growthTrend)}% growth trend
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ForecastCard.displayName = 'ForecastCard';

export default ForecastCard;
