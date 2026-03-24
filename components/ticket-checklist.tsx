'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export function TicketChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', title: 'Review new header design', completed: true },
    { id: '2', title: 'Fix responsive issues (Mobile)', completed: true },
    { id: '3', title: 'Update color variables', completed: false },
    { id: '4', title: 'Cross-browser testing', completed: false },
  ]);

  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems((prev) => [
        ...prev,
        { id: Date.now().toString(), title: newItem, completed: false },
      ]);
      setNewItem('');
    }
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900">Checklist</h3>
          <span className="text-sm font-semibold text-purple-600">
            {completedCount} / {items.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className="w-4 h-4 rounded border-gray-300 text-purple-600 cursor-pointer"
            />
            <span
              className={`flex-1 text-sm ${
                item.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}
            >
              {item.title}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="p-1 hover:bg-red-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="Add new item..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
        />
        <Button
          onClick={addItem}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
