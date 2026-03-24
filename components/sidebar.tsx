'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Activity,
  Kanban,
  Calendar,
  GanttChart,
} from 'lucide-react';


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tickets', href: '/dashboard/tickets', icon: Ticket },
  { name: 'Accounts', href: '/dashboard/accounts', icon: Users },
  { name: 'Reports & Analytics', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Time Tracking', href: '/dashboard/time-tracking', icon: Activity },
  { name: 'Activity Log', href: '/dashboard/activity', icon: Activity },
];

const addOns = [
  { name: 'Kanban Board', href: '/dashboard/kanban-board', icon: Kanban },
  { name: 'Gantt Chart', href: '/dashboard/gantt-chart', icon: GanttChart },
  { name: 'Calendar View', href: '/dashboard/calendar', icon: Calendar },
];

const bottomNav = [
  { name: 'User Profile', href: '/dashboard/profile', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900/20 to-purple-950/30 backdrop-blur-xl border-r border-purple-500/20 min-h-screen sticky top-0 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">≈</span>
          </div>
          <div>
            <p className="font-bold text-gray-900">Bubble-check</p>
            <p className="text-xs text-gray-500">Project Tracker</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-500/20 text-purple-600 font-semibold border border-purple-500/30'
                  : 'text-gray-600 hover:bg-purple-500/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Add-ons Section */}
      <div className="p-4 space-y-2 border-t border-purple-500/20">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 mb-3">Add-on Suggestions</p>
        {addOns.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-500/20 text-purple-600 font-semibold'
                  : 'text-gray-600 hover:bg-purple-500/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 space-y-2 border-t border-purple-500/20">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-500/20 text-purple-600 font-semibold'
                  : 'text-gray-600 hover:bg-purple-500/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
