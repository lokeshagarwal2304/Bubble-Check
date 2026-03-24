'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { AssignAgentSelect } from '@/components/assign-agent-select';

export default function AddNewTicketPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
    customer: '',
    assignAgent: '',
    tags: '',
    dueDate: '',
    dueTime: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/tickets');
  };

  return (
    <main className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/tickets">
          <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Ticket</h1>
          <p className="text-gray-600 mt-1">Create a new project/ticket with all details</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter ticket subject"
              required
              className="text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write description here..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400 resize-none"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-purple-500 focus:outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Customer
            </label>
            <Input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Search customer by name or email"
              className="text-base"
            />
          </div>

          {/* ✅ Assign Agent — with live dropdown + Add Agent modal */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Assign Agent
            </label>
            <AssignAgentSelect
              value={formData.assignAgent}
              onChange={(val) => setFormData((prev) => ({ ...prev, assignAgent: val }))}
            />
            {formData.assignAgent && (
              <p className="mt-1.5 text-xs text-purple-600 font-medium">
                ✓ Agent selected
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tags
            </label>
            <Input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Type tag and press Enter..."
              className="text-base"
            />
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Due Date
              </label>
              <Input
                type="text"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                className="text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Due Time
              </label>
              <Input
                type="text"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
                placeholder="--:-- --"
                className="text-base"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <p className="text-gray-600">Choose Files</p>
              <p className="text-xs text-gray-500">No file chosen</p>
            </div>
          </div>

          {/* Customer Notification */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notify"
              defaultChecked
              className="w-4 h-4 rounded border-gray-300 text-purple-600"
            />
            <label htmlFor="notify" className="text-sm text-gray-700">
              Disable Customer Notification
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
