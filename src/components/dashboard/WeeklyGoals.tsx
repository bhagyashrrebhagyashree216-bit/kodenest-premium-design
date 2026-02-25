import React from 'react';

const days = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: true },
  { day: 'Thu', active: false },
  { day: 'Fri', active: true },
  { day: 'Sat', active: false },
  { day: 'Sun', active: false },
];

interface WeeklyGoalsProps {
  solved: number;
  target: number;
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ solved, target }) => {
  const percentage = Math.min((solved / target) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Progress Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Problems Solved</span>
        <span className="text-sm font-semibold text-gray-900">
          {solved}/{target} this week
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Day Circles */}
      <div className="flex items-center justify-between pt-2">
        {days.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                item.active
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {item.day.charAt(0)}
            </div>
            <span className="text-xs text-gray-500">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
