import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProfilePage from './pages/ProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import LabPage from './pages/LabPage';
import ConnectPage from './pages/ConnectPage';
import AskPage from './pages/AskPage';
import ThemeToggle from './components/ui/ThemeToggle';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <ThemeToggle />
      <div className="mobile-top-banner" aria-hidden="true">
        <div className="mobile-top-banner-track">
          <span>For an optimal viewing experience, I recommend using dark mode on a laptop or desktop.</span>
          <span>For an optimal viewing experience, I recommend using dark mode on a laptop or desktop.</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <div className="mobile-footer-banner" aria-hidden="true">
        <div className="mobile-top-banner-track">
          <span>For an optimal viewing experience, I recommend using dark mode on a laptop or desktop.</span>
          <span>For an optimal viewing experience, I recommend using dark mode on a laptop or desktop.</span>
        </div>
      </div>
    </>
  );
};

export default App;
