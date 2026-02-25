import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Target, 
  CheckCircle, 
  Calendar, 
  HelpCircle,
  Building2,
  Briefcase,
  Clock,
  Award
} from 'lucide-react';
import { CircularProgress } from '../../components/dashboard';
import { getLatestAnalysis, getAnalysisById, type HistoryEntry } from '../../utils/historyService';

export const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<HistoryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    let result: HistoryEntry | null = null;

    if (id) {
      result = getAnalysisById(id);
    } else {
      result = getLatestAnalysis();
    }

    setAnalysis(result);
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Found</h2>
        <p className="text-gray-500 mb-6">Analyze a job description to see results here.</p>
        <button
          onClick={() => navigate('/dashboard/analyzer')}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Analyze a JD
        </button>
      </div>
    );
  }

  const { extractedSkills, readinessScore, plan, checklist, questions, company, role, createdAt } = analysis;

  // Flatten skills for display
  const allSkills = [
    ...extractedSkills.coreCS.map(s => ({ name: s, category: 'Core CS' })),
    ...extractedSkills.languages.map(s => ({ name: s, category: 'Languages' })),
    ...extractedSkills.web.map(s => ({ name: s, category: 'Web' })),
    ...extractedSkills.data.map(s => ({ name: s, category: 'Data' })),
    ...extractedSkills.cloudDevOps.map(s => ({ name: s, category: 'Cloud/DevOps' })),
    ...extractedSkills.testing.map(s => ({ name: s, category: 'Testing' })),
  ];

  const hasAnySkills = allSkills.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/analyzer')}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Title Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Building2 className="w-4 h-4" />
              {company}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              {role}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Clock className="w-4 h-4" />
              Analyzed on {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Readiness Score</p>
              <p className="text-3xl font-bold text-gray-900">{readinessScore}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Readiness Score */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Readiness</h2>
            <div className="flex justify-center">
              <CircularProgress value={readinessScore} max={100} />
            </div>
          </div>

          {/* Extracted Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Key Skills Extracted
            </h2>
            {hasAnySkills ? (
              <div className="space-y-4">
                {['Core CS', 'Languages', 'Web', 'Data', 'Cloud/DevOps', 'Testing'].map(category => {
                  const categorySkills = allSkills.filter(s => s.category === category);
                  if (categorySkills.length === 0) return null;
                  return (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">General Fresher Stack</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {['Java/Python', 'SQL', 'Basic Web', 'DSA'].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 7-Day Plan */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              7-Day Preparation Plan
            </h2>
            <div className="space-y-3">
              {plan.map((day) => (
                <div key={day.day} className="border-l-2 border-primary-200 pl-4 py-2">
                  <h3 className="font-medium text-gray-900">Day {day.day}: {day.title}</h3>
                  <ul className="mt-2 space-y-1">
                    {day.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Round-wise Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Round-wise Preparation Checklist
            </h2>
            <div className="space-y-4">
              {checklist.map((round) => (
                <div key={round.round} className="border border-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Round {round.round}: {round.title}
                  </h3>
                  <ul className="space-y-2">
                    {round.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <input type="checkbox" className="mt-1 rounded text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Questions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Likely Interview Questions
            </h2>
            <div className="space-y-3">
              {questions.map((question, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{question}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
