'use client';

import { AlertCircle, CheckCircle, MessageSquare, Clock, Edit, Trash2 } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'created',
    title: 'Ticket created',
    description: 'BC-1024: Website UI Redesign - Header Issue',
    user: 'Noreply User',
    time: 'Today, 10:32 AM',
    icon: CheckCircle,
  },
  {
    id: '2',
    type: 'updated',
    title: 'Status changed',
    description: 'BC-1024 moved to In Progress',
    user: 'Noreply User',
    time: 'Today, 11:05 AM',
    icon: Clock,
  },
  {
    id: '3',
    type: 'commented',
    title: 'Comment added',
    description: 'Sarah Khan commented on BC-1024',
    user: 'Sarah Khan',
    time: 'Today, 02:45 PM',
    icon: MessageSquare,
  },
  {
    id: '4',
    type: 'updated',
    title: 'Field updated',
    description: 'Priority changed from Medium to High',
    user: 'Mike Lee',
    time: 'Today, 04:20 PM',
    icon: Edit,
  },
  {
    id: '5',
    type: 'deleted',
    title: 'Ticket deleted',
    description: 'BC-999 has been deleted',
    user: 'Admin',
    time: 'Yesterday, 03:15 PM',
    icon: Trash2,
  },
];

const iconColors = {
  created: 'text-green-500 bg-green-50',
  updated: 'text-blue-500 bg-blue-50',
  commented: 'text-purple-500 bg-purple-50',
  deleted: 'text-red-500 bg-red-50',
};

export default function ActivityLogPage() {
  return (
    <main className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-600 mt-1">Track all actions and changes in your account</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${iconColors[activity.type as keyof typeof iconColors] || 'bg-gray-50 text-gray-500'} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap font-medium">{activity.time}</p>
                  </div>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
          Load More
        </button>
      </div>
    </main>
  );
}
