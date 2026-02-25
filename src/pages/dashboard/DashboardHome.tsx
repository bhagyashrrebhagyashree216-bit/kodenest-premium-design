import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import {
  CircularProgress,
  SkillRadarChart,
  WeeklyGoals,
  UpcomingAssessments,
} from '../../components/dashboard';

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Student!
        </h1>
        <p className="text-gray-600">
          Here's your progress overview. Keep up the great work!
        </p>
      </div>

      {/* Main Grid - 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Overall Readiness
          </h3>
          <div className="flex justify-center">
            <CircularProgress value={72} max={100} />
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Skill Breakdown
          </h3>
          <SkillRadarChart />
        </div>

        {/* Continue Practice */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Continue Practice
          </h3>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                Dynamic Programming
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Master optimal substructure and overlapping subproblems
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">3/10 completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Goals
          </h3>
          <WeeklyGoals solved={12} target={20} />
        </div>

        {/* Upcoming Assessments - Full width on mobile, span 2 cols on large screens */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Assessments
          </h3>
          <UpcomingAssessments />
        </div>
      </div>
    </div>
  );
};
