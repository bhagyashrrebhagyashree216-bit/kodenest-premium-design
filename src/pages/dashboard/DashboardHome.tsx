import React from 'react';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

const stats = [
  { label: 'Problems Solved', value: '124', icon: Target, color: 'bg-blue-50 text-blue-600' },
  { label: 'Mock Interviews', value: '8', icon: Clock, color: 'bg-green-50 text-green-600' },
  { label: 'Current Streak', value: '12 days', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
  { label: 'Rank', value: '#342', icon: Award, color: 'bg-purple-50 text-purple-600' },
];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Student!
        </h1>
        <p className="text-gray-600">
          Here's your progress overview. Keep up the great work!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'Solved', problem: 'Two Sum', time: '2 hours ago', status: 'Easy' },
            { action: 'Completed', problem: 'Mock Interview - Frontend', time: '5 hours ago', status: 'Passed' },
            { action: 'Solved', problem: 'Binary Search', time: '1 day ago', status: 'Medium' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-gray-900 font-medium">
                  {item.action} <span className="text-primary">{item.problem}</span>
                </p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
