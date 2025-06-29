import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DesignSystemLayout } from '@/layouts/DesignSystemLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import SystemBreakdownPage from '@/pages/SystemBreakdownPage'; // Added this line
import PortfolioEditorPage from '@/pages/PortfolioEditorPage'; // Added this line

// Design System pages
import { OverviewPage } from '@/pages/dev/OverviewPage';
import { FoundationsPage } from '@/pages/dev/FoundationsPage';
import { ComponentsPage } from '@/pages/dev/ComponentsPage';
import { PatternsPage } from '@/pages/dev/PatternsPage';
import { ShowcasePage } from '@/pages/dev/ShowcasePage';

import './App.css';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="system-breakdown" element={<SystemBreakdownPage />} />

          {/* Portfolio Editor - only accessible in dev mode, but outside /dev path for easier access */}
          {isDevelopment && <Route path="/portfolio-editor" element={<PortfolioEditorPage />} />}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Design System routes - only accessible in dev mode */}
        {isDevelopment ? (
          <Route path="/dev" element={<DesignSystemLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="foundations" element={<FoundationsPage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="patterns" element={<PatternsPage />} />
            <Route path="showcase" element={<ShowcasePage />} />
            {/* You could also nest it here if preferred: <Route path="portfolio-editor" element={<PortfolioEditorPage />} /> */}
          </Route>
        ) : (
          <Route path="/dev/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
