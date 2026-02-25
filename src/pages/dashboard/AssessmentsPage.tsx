import React from 'react';
import { Play, Clock, CheckCircle, Lock } from 'lucide-react';

const assessments = [
  {
    title: 'Frontend Fundamentals',
    description: 'HTML, CSS, JavaScript basics and DOM manipulation',
    duration: '45 min',
    questions: 30,
    status: 'available',
    difficulty: 'Easy',
  },
  {
    title: 'React & Modern JS',
    description: 'React hooks, state management, and ES6+ features',
    duration: '60 min',
    questions: 40,
    status: 'available',
    difficulty: 'Medium',
  },
  {
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, and algorithms',
    duration: '90 min',
    questions: 50,
    status: 'locked',
    difficulty: 'Hard',
  },
  {
    title: 'System Design Basics',
    description: 'Scalability, databases, and API design principles',
    duration: '60 min',
    questions: 25,
    status: 'completed',
    difficulty: 'Hard',
    score: '85%',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-50';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'Hard':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const AssessmentsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-gray-600">
          Test your knowledge with timed assessments and track your improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl border border-gray-200 p-6 ${
              assessment.status === 'locked' ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {assessment.title}
                </h3>
                <p className="text-sm text-gray-500">{assessment.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                {assessment.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {assessment.duration}
              </div>
              <div>{assessment.questions} questions</div>
            </div>

            {assessment.status === 'available' && (
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                <Play className="w-4 h-4" />
                Start Assessment
              </button>
            )}

            {assessment.status === 'locked' && (
              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-2.5 rounded-lg font-medium cursor-not-allowed">
                <Lock className="w-4 h-4" />
                Locked
              </button>
            )}

            {assessment.status === 'completed' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Completed</span>
                </div>
                <span className="text-2xl font-bold text-primary">{assessment.score}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
