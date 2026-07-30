import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Loader2 } from 'lucide-react';
import { ProjectCard, type Project } from '../components/ProjectCard'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ManageProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProjects = async () => {
      // 🔑 localStorage থেকে সব সম্ভাব্য Token Key চেক করা
      const token = localStorage.getItem('token') || localStorage.getItem('userToken');

      if (!token) {
        setError('Authorization token missing! Please log in.');
        setLoading(false);
        return;
      }

      try {
        // API Base URL Safe Formatting
        const baseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;

        const response = await fetch(`${baseUrl}/projects/my-projects`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch your projects.');
        }

        // 💡 Data extraction with multi-fallback checks
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else if (data.data && Array.isArray(data.data)) {
          setProjects(data.data);
        } else {
          setProjects([]);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching projects.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Posted Projects</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your project listings and view incoming proposals.
          </p>
        </div>

        <Link
          to="/items/add"
          className="flex items-center gap-2 bg-brandTeal hover:bg-teal-400 text-brandNavy text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" /> Post New Project
        </Link>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {/* Project List / Empty State */}
      {projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No projects posted yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            You haven't created any projects under this account. Click below to create your first brief.
          </p>
          <Link
            to="/items/add"
            className="inline-flex items-center gap-2 bg-brandTeal hover:bg-teal-400 text-brandNavy text-sm font-medium px-4 py-2 rounded-xl"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard 
              key={proj._id} 
              project={{
                ...proj,
                // Safe date formatting check to prevent rendering crash
                deadline: proj.deadline ? proj.deadline : new Date().toISOString()
              }} 
              showStatus={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};