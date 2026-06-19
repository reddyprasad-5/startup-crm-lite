import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '../common/Card';

const FunnelStage = memo(({ stage, maxCount, isLast }) => {
  const widthPercent = maxCount > 0 ? Math.max((stage.count / maxCount) * 100, 12) : 12;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-center mb-1">
        <div
          className="relative rounded-lg transition-all duration-500 flex items-center justify-between px-4 py-3"
          style={{
            width: `${widthPercent}%`,
            backgroundColor: stage.color,
            minWidth: '140px',
          }}
        >
          <span className="text-white font-semibold text-sm">{stage.name}</span>
          <span className="text-white font-bold text-lg">{stage.count}</span>
        </div>
      </div>

      {!isLast && (
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-1">
          <span className="text-green-600 dark:text-green-400 font-medium">
            {stage.conversionRate}% converted
          </span>
          <span className="text-red-500 dark:text-red-400 font-medium">
            {stage.dropOffRate}% drop-off
          </span>
        </div>
      )}
    </div>
  );
});

FunnelStage.displayName = 'FunnelStage';

const FunnelChartCard = memo(({ data }) => {
  if (!data?.length) {
    return (
      <Card className="min-h-[300px] md:h-[420px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No funnel data available.</p>
      </Card>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <Card className="min-h-[300px] md:h-[420px] flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Funnel</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Stage conversion and drop-off rates
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center gap-1 overflow-y-auto">
        {data.map((stage, index) => (
          <FunnelStage
            key={stage.name}
            stage={stage}
            maxCount={maxCount}
            isLast={index === data.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
});

FunnelChartCard.displayName = 'FunnelChartCard';

export default FunnelChartCard;
