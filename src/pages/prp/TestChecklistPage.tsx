import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckSquare, 
  Square, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck
} from 'lucide-react';
import { 
  getTestChecklist, 
  toggleTestItem, 
  resetTestChecklist,
  type TestChecklist,
  type TestItem,
} from '../../utils/testChecklistService';

export const TestChecklistPage: React.FC = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<TestChecklist | null>(null);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);

  useEffect(() => {
    setChecklist(getTestChecklist());
  }, []);

  const handleToggle = (itemId: string) => {
    toggleTestItem(itemId);
    setChecklist(getTestChecklist());
  };

  const handleReset = () => {
    if (window.confirm('Reset all test checklist items?')) {
      resetTestChecklist();
      setChecklist(getTestChecklist());
    }
  };

  if (!checklist) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const checkedCount = checklist.items.filter(item => item.checked).length;
  const allPassed = checkedCount === 10;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ClipboardCheck className="w-7 h-7 text-primary" />
          Pre-Ship Test Checklist
        </h1>
        <p className="text-gray-600">
          Complete all tests before shipping the Placement Readiness Platform.
        </p>
      </div>

      {/* Summary Card */}
      <div className={`rounded-xl border p-6 ${allPassed ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${allPassed ? 'bg-green-100' : 'bg-amber-100'}`}>
              {allPassed ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tests Passed</p>
              <p className={`text-3xl font-bold ${allPassed ? 'text-green-700' : 'text-amber-700'}`}>
                {checkedCount} / 10
              </p>
            </div>
          </div>
          
          <div className="text-right">
            {!allPassed && (
              <p className="text-amber-700 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Fix issues before shipping.
              </p>
            )}
            {allPassed && (
              <p className="text-green-700 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Ready to ship!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Test Items */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Test Items</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {checklist.items.map((item, index) => (
            <TestItemRow
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedHint === item.id}
              onToggle={() => handleToggle(item.id)}
              onToggleHint={() => setExpandedHint(expandedHint === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset checklist
        </button>

        <button
          onClick={() => navigate('/prp/08-ship')}
          disabled={!allPassed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            allPassed
              ? 'bg-primary text-white hover:bg-primary-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Ship
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface TestItemRowProps {
  item: TestItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleHint: () => void;
}

const TestItemRow: React.FC<TestItemRowProps> = ({ item, index, isExpanded, onToggle, onToggleHint }) => {
  return (
    <div className={`p-4 transition-colors ${item.checked ? 'bg-green-50/50' : 'hover:bg-gray-50'}`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-0.5"
        >
          {item.checked ? (
            <CheckSquare className="w-6 h-6 text-green-600" />
          ) : (
            <Square className="w-6 h-6 text-gray-300 hover:text-gray-400" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium w-6">{index + 1}.</span>
            <span className={`font-medium ${item.checked ? 'text-gray-700 line-through' : 'text-gray-900'}`}>
              {item.label}
            </span>
          </div>

          {/* Hint */}
          {isExpanded && (
            <div className="mt-3 ml-9 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-medium">How to test:</span> {item.hint}
              </p>
            </div>
          )}
        </div>

        {/* Hint Toggle */}
        <button
          onClick={onToggleHint}
          className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
            isExpanded ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
          title="How to test"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
