import React from 'react';
import { BookOpen, FileText, Video, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Study Guides',
    icon: BookOpen,
    items: [
      { title: 'Data Structures Cheat Sheet', type: 'PDF', size: '2.4 MB' },
      { title: 'Algorithm Complexity Guide', type: 'PDF', size: '1.8 MB' },
      { title: 'Frontend Interview Questions', type: 'PDF', size: '3.2 MB' },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      { title: 'System Design Fundamentals', duration: '45 min', author: 'Tech Lead' },
      { title: 'React Patterns & Best Practices', duration: '60 min', author: 'Senior Dev' },
      { title: 'Behavioral Interview Tips', duration: '30 min', author: 'HR Manager' },
    ],
  },
  {
    category: 'Articles',
    icon: FileText,
    items: [
      { title: 'How to Ace Technical Interviews', readTime: '8 min read' },
      { title: 'Resume Writing for Developers', readTime: '5 min read' },
      { title: 'Negotiating Your Offer', readTime: '6 min read' },
    ],
  },
];

export const ResourcesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-600">
          Curated study materials, guides, and tutorials to help you prepare.
        </p>
      </div>

      <div className="space-y-6">
        {resources.map((section, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <section.icon className="w-5 h-5 text-primary" />
              {section.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {'size' in item && `${item.type} • ${item.size}`}
                    {'duration' in item && `${item.duration} • ${item.author}`}
                    {'readTime' in item && item.readTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
