import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
// import AddProjectPage from "./pages/AddProjectPage";
import ManageProjectsPage from "./pages/ManageProjectsPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyBids from "./pages/MyBids";
import DevWorkspace from "./pages/DevWorkspace";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; 
import { Chatbot } from "./components/Chatbot";
import { AddProjectPage } from "./pages/AddProjectPage";


// Navigation and Layout Wrapper
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen justify-between">
      
      {!isAuthPage && <Navbar />}

      <div className="flex-grow">{children}</div>
      <Chatbot />

      
      {!isAuthPage && <Footer />}
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
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/workspace" element={<DevWorkspace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}