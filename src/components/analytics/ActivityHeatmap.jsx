import React, { memo, useState, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '../common/Card';

const INTENSITY_CLASSES = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-green-100 dark:bg-green-900/40',
  'bg-green-200 dark:bg-green-800/50',
  'bg-green-400 dark:bg-green-700/60',
  'bg-green-500 dark:bg-green-600',
];

const getIntensityClass = (total, max) => {
  if (!total) return INTENSITY_CLASSES[0];
  const ratio = total / max;
  if (ratio <= 0.25) return INTENSITY_CLASSES[1];
  if (ratio <= 0.5) return INTENSITY_CLASSES[2];
  if (ratio <= 0.75) return INTENSITY_CLASSES[3];
  return INTENSITY_CLASSES[4];
};

const HeatmapCell = memo(({ day, maxActivity, onHover, onLeave }) => {
  if (!day) return <div className="w-3 h-3 sm:w-4 sm:h-4" />;

  return (
    <div
      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm cursor-pointer transition-transform hover:scale-125 ${getIntensityClass(day.total, maxActivity)}`}
      onMouseEnter={() => onHover(day)}
      onMouseLeave={onLeave}
      role="gridcell"
      aria-label={`${day.date}: ${day.total} activities`}
    />
  );
});

HeatmapCell.displayName = 'HeatmapCell';

const ActivityHeatmap = memo(({ data }) => {
  const [tooltip, setTooltip] = useState(null);
  const { weeks, maxActivity } = data || { weeks: [], maxActivity: 1 };

  const handleHover = useCallback((day) => setTooltip(day), []);
  const handleLeave = useCallback(() => setTooltip(null), []);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Activity Heatmap</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Leads created, meetings & calls — last 90 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          {tooltip && (
            <div className="absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none whitespace-nowrap">
              <p className="font-semibold">{tooltip.date}</p>
              <p>{tooltip.created} leads created</p>
              <p>{tooltip.meetings} meetings scheduled</p>
              <p>{tooltip.calls} calls logged</p>
            </div>
          )}

          <div className="flex gap-1 min-w-fit">
            <div className="flex flex-col gap-1 pt-5 text-[10px] text-slate-400 pr-1">
              {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((d, i) => (
                <div key={i} className="h-3 sm:h-4 flex items-center">{d}</div>
              ))}
            </div>

            <div className="flex gap-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {wi % 4 === 0 && (
                    <span className="text-[10px] text-slate-400 h-4">
                      {week[0]?.date
                        ? monthLabels[new Date(week[0].date).getMonth()]
                        : ''}
                    </span>
                  )}
                  {wi % 4 !== 0 && <span className="h-4" />}
                  {Array.from({ length: 7 }).map((_, di) => (
                    <HeatmapCell
                      key={di}
                      day={week[di]}
                      maxActivity={maxActivity}
                      onHover={handleHover}
                      onLeave={handleLeave}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span>Less</span>
            {INTENSITY_CLASSES.map((cls, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ActivityHeatmap.displayName = 'ActivityHeatmap';

export default ActivityHeatmap;
