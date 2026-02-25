import React, { useEffect, useState, useCallback } from 'react';
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
  Award,
  Copy,
  Download,
  Check,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { CircularProgress } from '../../components/dashboard';
import { getLatestAnalysis, getAnalysisById, updateAnalysis, type HistoryEntry } from '../../utils/historyService';
import type { SkillConfidence } from '../../utils/skillExtractor';
import {
  copyToClipboard,
  formatPlanAsText,
  formatChecklistAsText,
  formatQuestionsAsText,
  generateFullReport,
  downloadAsTxt,
} from '../../utils/exportUtils';

export const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<HistoryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [skillConfidence, setSkillConfidence] = useState<Record<string, SkillConfidence>>({});
  const [liveScore, setLiveScore] = useState(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    let result: HistoryEntry | null = null;

    if (id) {
      result = getAnalysisById(id);
    } else {
      result = getLatestAnalysis();
    }

    if (result) {
      const confidenceMap = result.skillConfidenceMap || {};
      setSkillConfidence(confidenceMap);
      setLiveScore(result.readinessScore);
    }

    setAnalysis(result);
    setLoading(false);
  }, [searchParams]);

  // Calculate live score based on skill confidence
  const calculateLiveScore = useCallback((baseScore: number, confidence: Record<string, SkillConfidence>) => {
    let score = baseScore;
    Object.values(confidence).forEach(status => {
      if (status === 'know') score += 2;
      else score -= 2;
    });
    return Math.max(0, Math.min(100, score));
  }, []);

  const handleSkillToggle = (skillName: string) => {
    if (!analysis) return;

    const newConfidence: Record<string, SkillConfidence> = {
      ...skillConfidence,
      [skillName]: skillConfidence[skillName] === 'know' ? 'practice' : 'know',
    };

    setSkillConfidence(newConfidence);
    const newScore = calculateLiveScore(analysis.readinessScore, newConfidence);
    setLiveScore(newScore);

    // Persist to localStorage
    const updatedAnalysis = {
      ...analysis,
      skillConfidenceMap: newConfidence,
    };
    updateAnalysis(updatedAnalysis);
    setAnalysis(updatedAnalysis);
  };

  const handleCopy = async (section: string, content: string) => {
    await copyToClipboard(content);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownload = () => {
    if (!analysis) return;
    const report = generateFullReport({ ...analysis, readinessScore: liveScore, skillConfidenceMap: skillConfidence });
    const filename = `${analysis.company.replace(/\s+/g, '_')}_${analysis.role.replace(/\s+/g, '_')}_Report.txt`;
    downloadAsTxt(filename, report);
  };

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

  const { extractedSkills, plan, checklist, questions, company, role, createdAt } = analysis;

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

  // Get weak skills (marked as practice)
  const weakSkills = allSkills
    .filter(s => skillConfidence[s.name] !== 'know')
    .slice(0, 3)
    .map(s => s.name);

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
              <p className="text-3xl font-bold text-gray-900">{liveScore}/100</p>
              {liveScore !== analysis.readinessScore && (
                <p className="text-xs text-gray-400">
                  Base: {analysis.readinessScore}
                  {liveScore > analysis.readinessScore ? ' +' : ' '}
                  {liveScore - analysis.readinessScore}
                </p>
              )}
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
              <CircularProgress value={liveScore} max={100} />
            </div>
          </div>

          {/* Extracted Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Key Skills Extracted
              <span className="text-xs font-normal text-gray-400 ml-2">(Click to toggle)</span>
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
                        {categorySkills.map((skill, idx) => {
                          const confidence = skillConfidence[skill.name] || 'practice';
                          const isKnown = confidence === 'know';
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSkillToggle(skill.name)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                                isKnown
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {isKnown ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5" />
                              )}
                              {skill.name}
                              <span className="text-xs opacity-75">
                                {isKnown ? 'I know' : 'Practice'}
                              </span>
                            </button>
                          );
                        })}
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
                    <button
                      key={idx}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                        skillConfidence[skill] === 'know'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {skillConfidence[skill] === 'know' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      {skill}
                      <span className="text-xs opacity-75">
                        {skillConfidence[skill] === 'know' ? 'I know' : 'Practice'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 7-Day Plan */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                7-Day Preparation Plan
              </h2>
              <button
                onClick={() => handleCopy('plan', formatPlanAsText(plan))}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-600 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {copiedSection === 'plan' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Round-wise Preparation Checklist
              </h2>
              <button
                onClick={() => handleCopy('checklist', formatChecklistAsText(checklist))}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-600 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {copiedSection === 'checklist' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Likely Interview Questions
              </h2>
              <button
                onClick={() => handleCopy('questions', formatQuestionsAsText(questions))}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-600 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {copiedSection === 'questions' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
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

      {/* Export Tools */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Report</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download as TXT
          </button>
          <button
            onClick={() => handleCopy('plan', formatPlanAsText(plan))}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy 7-Day Plan
          </button>
          <button
            onClick={() => handleCopy('checklist', formatChecklistAsText(checklist))}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy Checklist
          </button>
          <button
            onClick={() => handleCopy('questions', formatQuestionsAsText(questions))}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy 10 Questions
          </button>
        </div>
      </div>

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Action Next
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-amber-700 mb-2">Top skills needing practice:</p>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <p className="text-amber-800">
                Start with <strong>Day 1</strong> of your preparation plan now.
              </p>
              <button
                onClick={() => navigate('/dashboard/practice')}
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Start Day 1
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
