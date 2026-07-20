import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './lib/auth-client';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import AddProjectPage from './pages/AddProjectPage';
import ManageProjectsPage from './pages/ManageProjectsPage';
import DetailsPage from './pages/DetailsPage';

// Protected Route Guard driven by Better Auth session state
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-brandNavy flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brandTeal"></div>
      </div>
    );
  }

  return session ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects/:id" element={<DetailsPage />} />
        
        {/* Protected Operational Routes */}
        <Route path="/items/add" element={<ProtectedRoute><AddProjectPage /></ProtectedRoute>} />
        <Route path="/items/manage" element={<ProtectedRoute><ManageProjectsPage /></ProtectedRoute>} />
        
        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}