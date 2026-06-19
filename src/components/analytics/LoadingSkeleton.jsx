import React, { memo } from 'react';

const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`} />
);

const KpiSkeleton = memo(() => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-8 w-20" />
        <SkeletonBlock className="h-3 w-28" />
      </div>
      <SkeletonBlock className="h-12 w-12 rounded-xl" />
    </div>
  </div>
));

const ChartSkeleton = memo(({ tall = false }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
    <SkeletonBlock className="h-5 w-40 mb-2" />
    <SkeletonBlock className="h-3 w-56 mb-6" />
    <SkeletonBlock className={`w-full ${tall ? 'h-72' : 'h-56'}`} />
  </div>
));

const LoadingSkeleton = memo(() => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="space-y-2">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-96 max-w-full" />
    </div>

    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-9 w-28 rounded-lg" />
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <KpiSkeleton key={i} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton tall />
      <ChartSkeleton tall />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';
KpiSkeleton.displayName = 'KpiSkeleton';
ChartSkeleton.displayName = 'ChartSkeleton';

export default LoadingSkeleton;
