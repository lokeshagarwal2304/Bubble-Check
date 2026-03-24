import { User, CheckCircle, MessageSquare, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'commented' | 'time-added';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'created',
    title: 'Ticket created',
    description: 'Website UI Redesign - Header Issue',
    timestamp: '2 min ago',
    user: 'Noreply User',
  },
  {
    id: '2',
    type: 'updated',
    title: 'Status changed to In Progress',
    description: 'Ticket updated in BC-1023',
    timestamp: '15 min ago',
    user: 'Noreply User',
  },
  {
    id: '3',
    type: 'commented',
    title: 'Comment added',
    description: 'Design files uploaded, please review',
    timestamp: '1 hour ago',
    user: 'Sarah Khan',
  },
  {
    id: '4',
    type: 'time-added',
    title: '2h 15m logged',
    description: 'Time added to BC-1023',
    timestamp: '2 hours ago',
    user: 'Mike Lee',
  },
];

const iconMap = {
  created: <CheckCircle className="w-5 h-5" />,
  updated: <Clock className="w-5 h-5" />,
  commented: <MessageSquare className="w-5 h-5" />,
  'time-added': <Clock className="w-5 h-5" />,
};

const colorMap = {
  created: 'from-green-500 to-green-600',
  updated: 'from-blue-500 to-blue-600',
  commented: 'from-purple-500 to-purple-600',
  'time-added': 'from-orange-500 to-orange-600',
};

export function RecentActivity() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[activity.type]} flex items-center justify-center flex-shrink-0 text-white`}>
              {iconMap[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.user}</p>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap">{activity.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
