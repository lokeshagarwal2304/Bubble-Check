'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TicketRow } from '@/components/ticket-row';
import { Search, Plus } from 'lucide-react';

const mockTickets = [
  {
    id: '1',
    ticketId: 'BC-1024',
    subject: 'Website UI Redesign - Header Issue',
    account: 'FIS Management Portal',
    priority: 'High' as const,
    status: 'In Progress',
    assignedTo: 'JD',
    updated: '2 min ago',
  },
  {
    id: '2',
    ticketId: 'BC-1023',
    subject: 'MODIFY - Website Contact Form Bug',
    account: 'MOIFY',
    priority: 'Medium' as const,
    status: 'Pending',
    assignedTo: 'DU',
    updated: '15 min ago',
  },
  {
    id: '3',
    ticketId: 'BC-1022',
    subject: 'Dashboard Analytics Enhancement',
    account: 'FIS Management Portal',
    priority: 'Low' as const,
    status: 'On Hold',
    assignedTo: 'SK',
    updated: '1 hour ago',
  },
  {
    id: '4',
    ticketId: 'BC-1021',
    subject: 'Mobile Responsiveness - Faster Fix',
    account: 'MOIFY',
    priority: 'Medium' as const,
    status: 'In Progress',
    assignedTo: 'ML',
    updated: '3 hours ago',
  },
  {
    id: '5',
    ticketId: 'BC-1020',
    subject: 'Login Page - Validation Error',
    account: 'Internal Tools',
    priority: 'High' as const,
    status: 'Resolved',
    updated: '1 day ago',
  },
  {
    id: '6',
    ticketId: 'BC-1019',
    subject: 'Performance Optimization - Images',
    account: 'FIS Management Portal',
    priority: 'Low' as const,
    status: 'Review',
    assignedTo: 'SK',
    updated: '2 days ago',
  },
];

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTickets(
        mockTickets.filter(
          (ticket) =>
            ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTickets(mockTickets);
    }
  }, [searchQuery]);

  return (
    <main className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets Management</h1>
          <p className="text-gray-600 mt-1">List, filter, search & manage all tickets</p>
        </div>
        <Link href="/dashboard/tickets/new">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Ticket
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-4 mb-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300">
              <option>All Accounts</option>
              <option>FIS Management Portal</option>
              <option>MOIFY</option>
              <option>Internal Tools</option>
            </select>

            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300">
              <option>All Tags</option>
              <option>Bug</option>
              <option>Feature</option>
              <option>Enhancement</option>
            </select>

            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300">
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Resolved</option>
              <option>Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketRow key={ticket.id} {...ticket} />
          ))
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
            <p className="text-gray-600">No tickets found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-gray-600">
          Showing 1-{filteredTickets.length} of {mockTickets.length} tickets
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled className="px-4 py-2">
            Previous
          </Button>
          <Button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white">
            1
          </Button>
          <Button variant="outline" className="px-4 py-2">
            2
          </Button>
          <Button variant="outline" className="px-4 py-2">
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
