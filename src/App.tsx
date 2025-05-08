import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import DevPage from '@/pages/dev/DevPage';
import './App.css';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Development routes - only accessible in dev mode */}
          {isDevelopment ? (
            <Route path="dev/*" element={<DevPage />} />
          ) : (
            <Route path="dev/*" element={<Navigate to="/" replace />} />
          )}
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
