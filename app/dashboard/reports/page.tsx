'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const chartData = [
  { month: 'Jan', tickets: 24, resolved: 18 },
  { month: 'Feb', tickets: 32, resolved: 28 },
  { month: 'Mar', tickets: 28, resolved: 22 },
  { month: 'Apr', tickets: 35, resolved: 30 },
];

const priorityData = [
  { name: 'High', value: 12, color: '#ef4444' },
  { name: 'Medium', value: 24, color: '#f97316' },
  { name: 'Low', value: 14, color: '#3b82f6' },
];

export default function ReportsPage() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Track metrics and performance over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tickets Over Time */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Tickets Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,200,0.2)" />
              <XAxis dataKey="month" stroke="rgba(100,100,100,0.8)" />
              <YAxis stroke="rgba(100,100,100,0.8)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(200,200,200,0.3)', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={priorityData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,200,0.2)" />
              <XAxis dataKey="month" stroke="rgba(100,100,100,0.8)" />
              <YAxis stroke="rgba(100,100,100,0.8)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(200,200,200,0.3)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="tickets" stackId="1" stroke="#a855f7" fill="#c084fc" />
              <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10b981" fill="#6ee7b7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Avg Resolution Time</span>
              <span className="font-bold text-purple-600">2.3 days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Customer Satisfaction</span>
              <span className="font-bold text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Open Tickets</span>
              <span className="font-bold text-blue-600">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">Overdue Tickets</span>
              <span className="font-bold text-orange-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
