'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TicketChecklist } from '@/components/ticket-checklist';
import { TicketComments } from '@/components/ticket-comments';
import { TicketTimeEntries } from '@/components/ticket-time-entries';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Calendar,
  User,
  Users,
  Tag,
  Paperclip,
} from 'lucide-react';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState('In Progress');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock ticket data
  const ticket = {
    id: id,
    ticketId: 'BC-1024',
    subject: 'Website UI Redesign - Header Issue',
    description:
      'The header layout is not displaying correctly on mobile devices. The navigation menu is overlapping with the logo. We need to fix the responsive design and ensure it works properly on all screen sizes.',
    priority: 'High',
    status: 'In Progress',
    account: 'FIS Management Portal',
    assignedTo: 'John Doe',
    customer: 'John Doe',
    dueDate: '15 Apr 2025',
    createdDate: '10 Apr 2025, 10:32 AM',
    updatedDate: '15 Apr 2025',
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'comments', label: 'Comments' },
    { id: 'time-tracking', label: 'Time Entries' },
    { id: 'attachments', label: 'Attachments' },
  ];

  return (
    <main className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tickets">
            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-purple-600" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-purple-600">{ticket.ticketId}</span>
              <Badge className="bg-red-100 text-red-700 border-0 font-semibold">
                {ticket.priority}
              </Badge>
              <Badge
                className={`border-0 font-semibold ${
                  ticket.status === 'In Progress'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {ticket.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{ticket.subject}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
            Mark as Resolved
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 mb-4">Ticket Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900">{ticket.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 mb-4">Activity Log</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Ticket created',
                    user: 'Noreply User',
                    time: 'Today, 10:32 AM',
                  },
                  {
                    title: 'Status changed to In Progress',
                    user: 'Noreply User',
                    time: 'Today, 11:05 AM',
                  },
                  {
                    title: 'Comment added',
                    user: 'Sarah Khan',
                    time: 'Today, 02:45 PM',
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">by {activity.user}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && <TicketChecklist />}

          {/* Comments Tab */}
          {activeTab === 'comments' && <TicketComments />}

          {/* Time Tracking Tab */}
          {activeTab === 'time-tracking' && <TicketTimeEntries />}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && (
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 mb-4">Attachments</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Choose Files</p>
                <p className="text-xs text-gray-500">No file chosen</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Account Info */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Account</h3>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                FI
              </div>
              <p className="text-sm font-semibold text-gray-900">{ticket.account}</p>
            </div>
          </div>

          {/* Status Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Status</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-purple-500 focus:outline-none"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Resolved</option>
              <option>Review</option>
            </select>
          </div>

          {/* Assigned To */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Assigned To</h3>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <p className="text-sm font-semibold text-gray-900">{ticket.assignedTo}</p>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Customer</h3>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <p className="text-sm font-semibold text-gray-900">{ticket.customer}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Created</p>
              <p className="text-sm text-gray-900">{ticket.createdDate}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Due Date</p>
              <p className="text-sm text-gray-900 font-semibold">{ticket.dueDate}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Last Updated</p>
              <p className="text-sm text-gray-900">{ticket.updatedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
