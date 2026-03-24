'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function TicketRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/20">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-4 w-32 rounded" />
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
      <Skeleton className="h-4 w-16 rounded" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card space-y-4">
      <Skeleton className="h-6 w-40 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card space-y-3">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        ))}
      </div>
      <div className="glass-card space-y-4">
        <Skeleton className="h-6 w-40 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <TicketRowSkeleton key={i} />
      ))}
    </div>
  );
}
