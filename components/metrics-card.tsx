'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  description?: string;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  icon,
  trend,
  description,
  className = '',
}: MetricsCardProps) {
  return (
    <div className={`glass-card-lg ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.direction === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {trend.value}% {trend.label}
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-purple-100 rounded-lg">
            <div className="text-purple-600">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MetricsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
