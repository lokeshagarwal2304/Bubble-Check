'use client';

import { useState } from 'react';
import { KanbanColumn } from '@/components/kanban-column';
import { Button } from '@/components/ui/button';

const kanbanData = {
  pending: [
    {
      id: '1',
      ticketId: 'BC-1024',
      title: 'Website UI Redesign - Header Issue',
      priority: 'High' as const,
      assignee: 'John',
    },
    {
      id: '2',
      ticketId: 'BC-1025',
      title: 'Fix mobile navigation menu',
      priority: 'Medium' as const,
      assignee: 'Sarah',
    },
  ],
  inProgress: [
    {
      id: '3',
      ticketId: 'BC-1023',
      title: 'MODIFY - Website Contact Form Bug',
      priority: 'Medium' as const,
      assignee: 'David',
    },
    {
      id: '4',
      ticketId: 'BC-1021',
      title: 'Mobile Responsiveness - Faster Fix',
      priority: 'Medium' as const,
    },
  ],
  onHold: [
    {
      id: '5',
      ticketId: 'BC-1022',
      title: 'Dashboard Analytics Enhancement',
      priority: 'Low' as const,
      assignee: 'Mike',
    },
  ],
  resolved: [
    {
      id: '6',
      ticketId: 'BC-1020',
      title: 'Login Page - Validation Error',
      priority: 'High' as const,
    },
    {
      id: '7',
      ticketId: 'BC-1019',
      title: 'Performance Optimization - Images',
      priority: 'Low' as const,
      assignee: 'Sarah',
    },
  ],
};

export default function KanbanBoardPage() {
  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kanban Board View</h1>
        <p className="text-gray-600 mt-1">Drag and drop tickets across different status columns</p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        <KanbanColumn
          title="Pending"
          count={kanbanData.pending.length}
          cards={kanbanData.pending}
          color="bg-gradient-to-r from-blue-100 to-blue-50"
        />
        <KanbanColumn
          title="In Progress"
          count={kanbanData.inProgress.length}
          cards={kanbanData.inProgress}
          color="bg-gradient-to-r from-purple-100 to-purple-50"
        />
        <KanbanColumn
          title="On Hold"
          count={kanbanData.onHold.length}
          cards={kanbanData.onHold}
          color="bg-gradient-to-r from-yellow-100 to-yellow-50"
        />
        <KanbanColumn
          title="Resolved"
          count={kanbanData.resolved.length}
          cards={kanbanData.resolved}
          color="bg-gradient-to-r from-green-100 to-green-50"
        />
      </div>
    </main>
  );
}
