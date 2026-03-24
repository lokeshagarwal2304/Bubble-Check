'use client';

import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeEntry {
  id: string;
  user: string;
  hours: number;
  note: string;
  date: string;
}

export function TicketTimeEntries() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      user: 'John Doe',
      hours: 2.5,
      note: 'Reviewed design mockups',
      date: 'Today, 10:32 AM',
    },
    {
      id: '2',
      user: 'Sarah Khan',
      hours: 1.5,
      note: 'Fixed CSS layout issues',
      date: 'Today, 9:45 AM',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ hours: '', note: '' });

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  const handleAddEntry = () => {
    if (formData.hours && formData.note) {
      setEntries((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          user: 'You',
          hours: parseFloat(formData.hours),
          note: formData.note,
          date: 'Just now',
        },
      ]);
      setFormData({ hours: '', note: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">Time Tracking</h3>
          <p className="text-sm text-gray-600 mt-1">
            Total: <span className="font-bold text-purple-600">{totalHours.toFixed(1)}h</span>
          </p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Time
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
          <div className="space-y-3">
            <input
              type="number"
              step="0.5"
              value={formData.hours}
              onChange={(e) => setFormData((prev) => ({ ...prev, hours: e.target.value }))}
              placeholder="Hours (e.g., 2.5)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
            />
            <textarea
              value={formData.note}
              onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
              placeholder="Note (e.g., what did you work on?)"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none resize-none"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddEntry}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Save
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-sm text-gray-900">{entry.user}</p>
                <p className="text-sm text-purple-600 font-bold">{entry.hours}h</p>
              </div>
              <p className="text-sm text-gray-600">{entry.note}</p>
              <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
