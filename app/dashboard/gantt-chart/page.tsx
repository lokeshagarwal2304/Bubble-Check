'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ganttData = [
  {
    name: 'BC-1024: UI Redesign',
    start: 10,
    duration: 8,
    progress: 65,
  },
  {
    name: 'BC-1023: Contact Form Bug',
    start: 12,
    duration: 5,
    progress: 40,
  },
  {
    name: 'BC-1022: Dashboard Analytics',
    start: 15,
    duration: 10,
    progress: 25,
  },
  {
    name: 'BC-1021: Mobile Responsive',
    start: 8,
    duration: 6,
    progress: 75,
  },
  {
    name: 'BC-1020: Login Validation',
    start: 5,
    duration: 3,
    progress: 100,
  },
];

export default function GanttChartPage() {
  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gantt Chart / Timeline</h1>
        <p className="text-gray-600 mt-1">Visual timeline of ticket progress and deadlines</p>
      </div>

      {/* Chart */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={ganttData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,200,0.2)" />
            <XAxis type="number" stroke="rgba(100,100,100,0.8)" />
            <YAxis dataKey="name" type="category" stroke="rgba(100,100,100,0.8)" width={190} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(200,200,200,0.3)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="duration" fill="url(#colorGradient)" radius={[0, 8, 8, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {ganttData.map((item) => (
          <div
            key={item.name}
            className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              <span className="text-sm font-bold text-purple-600">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Duration: {item.duration} days • Started: Day {item.start}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
