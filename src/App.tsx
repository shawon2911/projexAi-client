import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AddProjectPage from './pages/AddProjectPage';
import ManageProjectsPage from './pages/ManageProjectsPage';
import DetailsPage from './pages/DetailsPage';
// Assume you have or will make a basic LoginPage placeholder
import LoginPage from './pages/LoginPage'; 
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';

// A small layout wrapper that hides the footer on the /login path node
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex-grow">
        {children}
      </div>
      {/* Renders everywhere EXCEPT when the path exactly matches /login */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/items/add" element={<AddProjectPage />} />
          <Route path="/dashboard" element={<ManageProjectsPage />} />
          <Route path="/projects/:id" element={<DetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}