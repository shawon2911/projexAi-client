import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, DollarSign, Plus, Loader2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string;
  status?: string;
  createdAt?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ManageProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProjects = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('userToken');

      if (!token) {
        setError('Authorization token missing! Please log in.');
        setLoading(false);
        return;
      }

      try {
        // 📡 ব্যাকএন্ডের /projects/my-projects বা /projects পয়েন্টে কল
        const response = await fetch(`${API_BASE_URL}/projects/my-projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch your projects.');
        }

        // Response Array check
        setProjects(Array.isArray(data) ? data : data.projects || []);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Posted Projects</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your project listings and view incoming proposals.
          </p>
        </div>

        <Link
          to="/items/add"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" /> Post New Project
        </Link>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No projects posted yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            You haven't created any projects under this account. Click below to create your first brief.
          </p>
          <Link
            to="/items/add"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium capitalize bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {project.status || 'open'}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white line-clamp-1">{project.title}</h2>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 font-semibold text-slate-200">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>${project.budget}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};