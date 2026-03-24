'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const events = {
  '15': [{ id: '1', title: 'BC-1024: UI Redesign', priority: 'High' }],
  '18': [
    { id: '2', title: 'BC-1023: Contact Form', priority: 'Medium' },
    { id: '3', title: 'BC-1021: Mobile Fix', priority: 'Medium' },
  ],
  '22': [{ id: '4', title: 'BC-1022: Analytics', priority: 'Low' }],
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-blue-100 text-blue-700',
  };

  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <p className="text-gray-600 mt-1">View tickets by due dates and deadlines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {DAYS.map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-2 rounded-lg border transition-all ${
                    day
                      ? 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                      : 'bg-gray-50 border-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <p className="text-sm font-bold text-gray-900 mb-2">{day}</p>
                      <div className="space-y-1">
                        {events[day as keyof typeof events]?.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${
                              priorityColors[event.priority as keyof typeof priorityColors]
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Upcoming Events */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg h-fit">
          <h3 className="font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {Object.entries(events).map(([date, eventList]) =>
              eventList.map((event) => (
                <div key={event.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">April {date}, 2025</p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{event.title}</p>
                  <Badge
                    className={`${priorityColors[event.priority as keyof typeof priorityColors]} border-0 text-xs font-medium`}
                  >
                    {event.priority}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
