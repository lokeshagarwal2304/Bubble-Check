'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const accounts = [
  { id: '1', name: 'FIS Management Portal', owner: 'John Doe', members: 5, tickets: 12 },
  { id: '2', name: 'MOIFY', owner: 'Sarah Khan', members: 3, tickets: 8 },
  { id: '3', name: 'Internal Tools', owner: 'Mike Lee', members: 4, tickets: 6 },
];

export default function AccountsPage() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600 mt-1">Manage your accounts and team members</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold">
                {account.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{account.name}</h3>
                <p className="text-sm text-gray-600">Owner: {account.owner}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Team Members</p>
                <p className="text-lg font-bold text-purple-600">{account.members}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Tickets</p>
                <p className="text-lg font-bold text-blue-600">{account.tickets}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
