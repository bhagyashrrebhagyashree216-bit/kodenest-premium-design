import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const assessments = [
  {
    title: 'DSA Mock Test',
    date: 'Tomorrow',
    time: '10:00 AM',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'System Design Review',
    date: 'Wed',
    time: '2:00 PM',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'HR Interview Prep',
    date: 'Friday',
    time: '11:00 AM',
    color: 'bg-green-50 text-green-600',
  },
];

export const UpcomingAssessments: React.FC = () => {
  return (
    <div className="space-y-4">
      {assessments.map((assessment, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
        >
          <div className={`w-12 h-12 rounded-lg ${assessment.color} flex items-center justify-center flex-shrink-0`}>
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">
              {assessment.title}
            </h4>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span>{assessment.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {assessment.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
