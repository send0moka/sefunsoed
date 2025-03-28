"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UsersIcon,
  DocumentTextIcon,
  CalendarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrograms: 0,
    totalContent: 0,
    totalMedia: 0,
  });

  const [recentActivity] = useState([
    { id: 1, type: "user", action: "registered", name: "John Doe", date: "2025-03-27T10:30:00Z" },
    { id: 2, type: "content", action: "created", name: "New Article About English", date: "2025-03-26T14:20:00Z" },
    { id: 3, type: "program", action: "updated", name: "Summer English Camp", date: "2025-03-25T09:45:00Z" },
    { id: 4, type: "media", action: "uploaded", name: "Event Photos", date: "2025-03-24T16:15:00Z" },
  ]);

  // Simulating data fetch
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setStats({
      totalUsers: 145,
      totalPrograms: 12,
      totalContent: 38,
      totalMedia: 57,
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'user':
        return <UsersIcon className="h-5 w-5 text-blue-500" />;
      case 'content':
        return <DocumentTextIcon className="h-5 w-5 text-green-500" />;
      case 'program':
        return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      case 'media':
        return <PhotoIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to the SEF UNSOED admin panel. Manage your website content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <UsersIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/users" className="font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <CalendarIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Programs</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalPrograms}</div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/programs" className="font-medium text-green-600 hover:text-green-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <DocumentTextIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Content</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalContent}</div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/content" className="font-medium text-purple-600 hover:text-purple-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <PhotoIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Media</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalMedia}</div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/media" className="font-medium text-yellow-600 hover:text-yellow-500">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Latest activities across the platform.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getIconForType(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="capitalize">{activity.action}</span> {activity.type}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {formatDate(activity.date)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Frequently used administrative tasks.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/admin/users/new" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add User</span>
            </Link>
            <Link href="/admin/programs/new" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <CalendarIcon className="h-8 w-8 text-green-500" />
              <span className="mt-2 text-sm font-medium text-gray-900">Create Program</span>
            </Link>
            <Link href="/admin/content/new" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <DocumentTextIcon className="h-8 w-8 text-purple-500" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Content</span>
            </Link>
            <Link href="/admin/media/upload" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <PhotoIcon className="h-8 w-8 text-yellow-500" />
              <span className="mt-2 text-sm font-medium text-gray-900">Upload Media</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
