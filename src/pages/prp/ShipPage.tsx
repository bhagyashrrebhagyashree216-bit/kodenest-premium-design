import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  Github
} from 'lucide-react';
import { isAllTestsPassed, getCheckedCount, resetTestChecklist } from '../../utils/testChecklistService';

export const ShipPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(true);
  const [checkedCount, setCheckedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if all tests are passed
    const allPassed = isAllTestsPassed();
    setIsLocked(!allPassed);
    setCheckedCount(getCheckedCount());
    setIsLoading(false);
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset all test checklist items? You will be redirected to the test checklist.')) {
      resetTestChecklist();
      navigate('/prp/07-test');
    }
  };

  const handleGoBack = () => {
    navigate('/prp/07-test');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Locked state
  if (isLocked) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-red-900 mb-3">
            Shipping Locked
          </h1>
          
          <p className="text-red-700 mb-2">
            You must complete all 10 tests before shipping.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-red-200 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="font-medium text-red-700">
              Tests Passed: {checkedCount} / 10
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Test Checklist
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full text-red-600 hover:text-red-700 px-6 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Checklist
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked state - Ready to ship
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-green-900 mb-3">
          Ready to Ship!
        </h1>
        
        <p className="text-green-700 mb-4">
          All 10 tests passed. The Placement Readiness Platform is ready for deployment.
        </p>

        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="font-medium text-green-700">
            Tests Passed: 10 / 10
          </span>
        </div>
      </div>

      {/* Ship Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          Deployment Actions
        </h2>

        <div className="space-y-3">
          <a
            href="https://github.com/bhagyashrrebhagyashree216-bit/kodenest-premium-design"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-600 group-hover:text-primary" />
              <div>
                <p className="font-medium text-gray-900">View Repository</p>
                <p className="text-sm text-gray-500">GitHub - kodenest-premium-design</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
          </a>

          <button
            onClick={() => alert('Deploy functionality would integrate with your CI/CD pipeline here.')}
            className="flex items-center justify-center gap-2 w-full bg-primary text-white px-6 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <Rocket className="w-5 h-5" />
            Deploy to Production
          </button>
        </div>
      </div>

      {/* Post-Ship Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Post-Deployment Checklist
        </h2>
        <ul className="space-y-3">
          {[
            'Verify site loads on production URL',
            'Test JD Analyzer on production',
            'Confirm history persistence works',
            'Check all export buttons function',
            'Monitor for console errors',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Option */}
      <div className="text-center">
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1.5 mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset test checklist
        </button>
      </div>
    </div>
  );
};
