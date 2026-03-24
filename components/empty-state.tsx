'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="mb-4 p-3 bg-purple-100 rounded-full">
        <div className="text-purple-600 scale-150">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-center max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          {action.label}
        </Button>
      )}
    </div>
  );
}
