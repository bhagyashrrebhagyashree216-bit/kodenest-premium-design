import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages';
import { DashboardLayout } from './components/dashboard';
import {
  DashboardHome,
  PracticePage,
  AssessmentsPage,
  ResourcesPage,
  ProfilePage,
  JDAnalyzerPage,
  ResultsPage,
  HistoryPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="analyzer" element={<JDAnalyzerPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
