'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Pending', value: 12 },
  { name: 'In Progress', value: 24 },
  { name: 'On Hold', value: 8 },
  { name: 'Resolved', value: 34 },
  { name: 'Review', value: 6 },
];

export function TicketStatusChart() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Ticket Status Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,200,0.2)" />
          <XAxis dataKey="name" stroke="rgba(100,100,100,0.8)" />
          <YAxis stroke="rgba(100,100,100,0.8)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(200,200,200,0.3)',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
