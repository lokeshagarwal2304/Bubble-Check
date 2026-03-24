'use client';

import { memo } from 'react';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Zap, AlertCircle, Check, Clock } from 'lucide-react';

export const PriorityBadge = memo(function PriorityBadge({ priority }: { priority: string }) {
  const iconProps = { className: 'h-3 w-3' };
  const icons: { [key: string]: JSX.Element } = {
    High: <AlertCircle {...iconProps} />,
    Medium: <Clock {...iconProps} />,
    Low: <Check {...iconProps} />,
  };

  return (
    <Badge className={PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS]}>
      {icons[priority]}
      {priority}
    </Badge>
  );
});

export const StatusBadge = memo(function StatusBadge({ status }: { status: string }) {
  const icons: { [key: string]: JSX.Element } = {
    'Pending': <Clock className="h-3 w-3" />,
    'In Progress': <Zap className="h-3 w-3" />,
    'On Hold': <AlertCircle className="h-3 w-3" />,
    'Resolved': <Check className="h-3 w-3" />,
    'Review': <Clock className="h-3 w-3" />,
    'Closed': <Check className="h-3 w-3" />,
  };

  return (
    <Badge className={STATUS_COLORS[status as keyof typeof STATUS_COLORS]}>
      {icons[status]}
      {status}
    </Badge>
  );
});

export function CustomBadge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}) {
  return <Badge variant={variant}>{children}</Badge>;
}
