'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  return (
    <main className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-3xl font-bold">
              NU
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Noreply User</h3>
              <p className="text-gray-600">noreply@example.com</p>
              <Button className="mt-2 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                Change Avatar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <Input type="text" defaultValue="Noreply User" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <Input type="email" defaultValue="noreply@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
              <Input type="tel" placeholder="+1 (555) 123-4567" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
              <Input type="text" placeholder="Engineering" />
            </div>
          </div>

          <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg">
            Save Changes
          </Button>
        </div>

        {/* Password Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>

          <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Update Password
          </Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Email Notifications</label>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Ticket Updates</label>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Weekly Reports</label>
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Team Activity</label>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
