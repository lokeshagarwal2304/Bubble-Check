'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const timeData = [
  { week: 'Week 1', hours: 38 },
  { week: 'Week 2', hours: 42 },
  { week: 'Week 3', hours: 35 },
  { week: 'Week 4', hours: 41 },
];

const ticketTimeData = [
  { ticket: 'BC-1024', hours: 12.5, user: 'John Doe' },
  { ticket: 'BC-1023', hours: 8.25, user: 'Sarah Khan' },
  { ticket: 'BC-1021', hours: 6.75, user: 'Mike Lee' },
  { ticket: 'BC-1022', hours: 4.5, user: 'David Wilson' },
];

export default function TimeTrackingPage() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor team productivity and time spent on tickets</p>
      </div>

      {/* Time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <p className="text-gray-600 text-sm font-medium mb-2">This Week</p>
          <p className="text-3xl font-bold text-purple-600">41h</p>
          <p className="text-xs text-green-600 font-semibold mt-2">↑ 2h from last week</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <p className="text-gray-600 text-sm font-medium mb-2">This Month</p>
          <p className="text-3xl font-bold text-blue-600">156h</p>
          <p className="text-xs text-green-600 font-semibold mt-2">↑ 8h from last month</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <p className="text-gray-600 text-sm font-medium mb-2">Team Average</p>
          <p className="text-3xl font-bold text-green-600">39h</p>
          <p className="text-xs text-gray-600 mt-2">Per person per week</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <p className="text-gray-600 text-sm font-medium mb-2">Billable Hours</p>
          <p className="text-3xl font-bold text-orange-600">98h</p>
          <p className="text-xs text-gray-600 mt-2">This month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Hours */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Hours Per Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,200,0.2)" />
              <XAxis dataKey="week" stroke="rgba(100,100,100,0.8)" />
              <YAxis stroke="rgba(100,100,100,0.8)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(200,200,200,0.3)', borderRadius: '8px' }} />
              <Bar dataKey="hours" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Tickets */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Time by Ticket</h3>
          <div className="space-y-3">
            {ticketTimeData.map((item) => (
              <div key={item.ticket} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.ticket}</p>
                  <p className="text-xs text-gray-600">{item.user}</p>
                </div>
                <p className="font-bold text-purple-600">{item.hours}h</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Summary */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="font-bold text-gray-900 mb-4">Team Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-sm font-semibold text-gray-900 py-3">Team Member</th>
                <th className="text-left text-sm font-semibold text-gray-900 py-3">This Week</th>
                <th className="text-left text-sm font-semibold text-gray-900 py-3">This Month</th>
                <th className="text-left text-sm font-semibold text-gray-900 py-3">Billable</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', week: '38h', month: '156h', billable: '125h' },
                { name: 'Sarah Khan', week: '42h', month: '168h', billable: '135h' },
                { name: 'Mike Lee', week: '35h', month: '140h', billable: '110h' },
                { name: 'David Wilson', week: '41h', month: '164h', billable: '130h' },
              ].map((member) => (
                <tr key={member.name} className="border-b border-gray-100 hover:bg-purple-50">
                  <td className="text-sm text-gray-900 py-3 font-medium">{member.name}</td>
                  <td className="text-sm text-gray-600 py-3">{member.week}</td>
                  <td className="text-sm text-gray-600 py-3">{member.month}</td>
                  <td className="text-sm text-purple-600 py-3 font-semibold">{member.billable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
