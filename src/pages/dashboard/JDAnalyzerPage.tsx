import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, FileText, Sparkles } from 'lucide-react';
import { analyzeJD } from '../../utils/skillExtractor';
import { saveAnalysis } from '../../utils/historyService';

const SAMPLE_JD = `Software Engineer - Full Stack

We are looking for a skilled Software Engineer to join our growing team. The ideal candidate will have strong experience in React, Node.js, and modern web development practices.

Requirements:
- 2+ years of experience with React and JavaScript/TypeScript
- Strong understanding of Node.js and Express framework
- Experience with SQL databases (PostgreSQL, MySQL)
- Knowledge of REST APIs and GraphQL
- Familiarity with AWS services (EC2, S3, Lambda)
- Experience with Docker and containerization
- Understanding of DSA and algorithmic problem solving
- Knowledge of OOP principles and design patterns
- Experience with Git and CI/CD pipelines
- Familiarity with testing frameworks (Jest, Cypress)

Responsibilities:
- Develop and maintain scalable web applications
- Collaborate with cross-functional teams
- Write clean, maintainable code
- Participate in code reviews
- Optimize application performance

Nice to have:
- Experience with Python
- Knowledge of MongoDB
- Understanding of microservices architecture`;

export const JDAnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay for UX
    setTimeout(() => {
      const result = analyzeJD(company, role, jdText);
      saveAnalysis(result);
      setIsAnalyzing(false);
      navigate('/dashboard/results');
    }, 1000);
  };

  const loadSample = () => {
    setCompany('TechCorp Inc.');
    setRole('Software Engineer - Full Stack');
    setJdText(SAMPLE_JD);
  };

  const isValid = jdText.trim().length > 50;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          JD Analyzer
        </h1>
        <p className="text-gray-600">
          Paste a job description to extract skills, generate a preparation plan, and assess your readiness.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Name
              </span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Role / Position
              </span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* JD Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Job Description
            </span>
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y font-mono text-sm"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {jdText.length} characters
            </span>
            <button
              onClick={loadSample}
              className="text-sm text-primary hover:text-primary-600 font-medium"
            >
              Load Sample JD
            </button>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!isValid || isAnalyzing}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Job Description
            </>
          )}
        </button>

        {!isValid && jdText.length > 0 && (
          <p className="text-sm text-amber-600 text-center">
            Please enter at least 50 characters for meaningful analysis.
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="bg-primary-50 rounded-xl p-6">
        <h3 className="font-semibold text-primary-900 mb-3">Tips for Best Results</h3>
        <ul className="space-y-2 text-sm text-primary-800">
          <li>• Include the complete job description for accurate skill extraction</li>
          <li>• Mention specific technologies (React, Python, AWS, etc.)</li>
          <li>• Include requirements, responsibilities, and nice-to-have sections</li>
          <li>• Longer JDs (800+ characters) improve readiness score accuracy</li>
        </ul>
      </div>
    </div>
  );
};
