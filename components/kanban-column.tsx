'use client';

import { memo } from 'react';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface KanbanCard {
  id: string;
  ticketId: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
}

interface KanbanColumnProps {
  title: string;
  count: number;
  cards: KanbanCard[];
  color: string;
}

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-orange-100 text-orange-700',
  Low: 'bg-blue-100 text-blue-700',
};

export const KanbanColumn = memo(function KanbanColumn({ title, count, cards, color }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-80 bg-gray-50/50 rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${color} px-4 py-3 flex items-center justify-between`}>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{count} tickets</p>
        </div>
        <button className="p-1 hover:bg-white/20 rounded transition-colors">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xs font-bold text-purple-600">{card.ticketId}</p>
              <Badge className={`${priorityColors[card.priority]} border-0 text-xs font-medium`}>
                {card.priority}
              </Badge>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">{card.title}</p>
            {card.assignee && (
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {card.assignee.charAt(0)}
                </div>
                <p className="text-xs text-gray-500">{card.assignee}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
