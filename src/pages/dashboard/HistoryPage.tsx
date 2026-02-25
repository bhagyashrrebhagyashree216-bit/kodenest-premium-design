import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  Trash2, 
  Building2, 
  Briefcase, 
  Calendar, 
  Award,
  Search,
  X
} from 'lucide-react';
import { getHistory, deleteAnalysis, clearHistory, type HistoryEntry } from '../../utils/historyService';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteAnalysis(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
    }
  };

  const handleEntryClick = (id: string) => {
    navigate(`/dashboard/results?id=${id}`);
  };

  const filteredHistory = history.filter(entry => 
    entry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <History className="w-6 h-6 text-primary" />
            Analysis History
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your past job description analyses.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No matches found' : 'No History Yet'}
          </h2>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Try a different search term' 
              : 'Analyze job descriptions to build your history.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/dashboard/analyzer')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Analyze a JD
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((entry) => (
            <div
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="truncate">{entry.company}</span>
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{entry.role}</span>
                  </p>
                  
                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      ...entry.extractedSkills.coreCS.slice(0, 2),
                      ...entry.extractedSkills.languages.slice(0, 2),
                      ...entry.extractedSkills.web.slice(0, 2),
                    ].slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {allSkillsCount(entry.extractedSkills) > 4 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{allSkillsCount(entry.extractedSkills) - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Score */}
                  <div className={`px-4 py-2 rounded-lg ${getScoreColor(entry.finalScore ?? entry.readinessScore ?? 0)}`}>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span className="font-bold">{entry.finalScore ?? entry.readinessScore ?? 0}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(entry.id, e)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function allSkillsCount(skills: HistoryEntry['extractedSkills']): number {
  return (
    skills.coreCS.length +
    skills.languages.length +
    skills.web.length +
    skills.data.length +
    skills.cloud.length +
    skills.testing.length +
    skills.other.length
  );
}
