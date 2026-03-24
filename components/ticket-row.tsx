import { memo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface TicketRowProps {
  id: string;
  ticketId: string;
  subject: string;
  account: string;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
  assignedTo?: string;
  updated: string;
}

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-orange-100 text-orange-700',
  Low: 'bg-blue-100 text-blue-700',
};

const statusColors = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-purple-100 text-purple-700',
  'On Hold': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700',
  Review: 'bg-pink-100 text-pink-700',
};

export const TicketRow = memo(function TicketRow({
  id,
  ticketId,
  subject,
  account,
  priority,
  status,
  assignedTo,
  updated,
}: TicketRowProps) {
  return (
    <Link href={`/dashboard/tickets/${id}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-white/20 p-4 hover:shadow-lg hover:border-purple-500/30 transition-all hover:bg-white/90 cursor-pointer">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-purple-600">{ticketId}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium truncate">{subject}</p>
                <p className="text-sm text-gray-500">{account}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`${priorityColors[priority]} border-0 font-medium`}>
              {priority}
            </Badge>
            <Badge className={`${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'} border-0 font-medium`}>
              {status}
            </Badge>
            {assignedTo && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {assignedTo.charAt(0)}
              </div>
            )}
            <p className="text-sm text-gray-500 min-w-fit">{updated}</p>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
});
