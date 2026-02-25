import React from 'react';
import { Code2, CheckCircle, Circle } from 'lucide-react';

const problemSets = [
  {
    category: 'Arrays & Strings',
    problems: [
      { name: 'Two Sum', difficulty: 'Easy', completed: true },
      { name: 'Best Time to Buy/Sell Stock', difficulty: 'Easy', completed: true },
      { name: 'Contains Duplicate', difficulty: 'Easy', completed: false },
      { name: 'Product of Array Except Self', difficulty: 'Medium', completed: false },
    ],
  },
  {
    category: 'Linked Lists',
    problems: [
      { name: 'Reverse Linked List', difficulty: 'Easy', completed: false },
      { name: 'Merge Two Sorted Lists', difficulty: 'Easy', completed: false },
      { name: 'Linked List Cycle', difficulty: 'Easy', completed: false },
    ],
  },
  {
    category: 'Trees & Graphs',
    problems: [
      { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', completed: false },
      { name: 'Validate Binary Search Tree', difficulty: 'Medium', completed: false },
      { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', completed: false },
    ],
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

export const PracticePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Practice Problems</h1>
        <p className="text-gray-600">
          Sharpen your coding skills with curated problems across different topics.
        </p>
      </div>

      <div className="space-y-6">
        {problemSets.map((set, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              {set.category}
            </h3>
            <div className="space-y-3">
              {set.problems.map((problem, pIndex) => (
                <div
                  key={pIndex}
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {problem.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={`font-medium ${problem.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {problem.name}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
