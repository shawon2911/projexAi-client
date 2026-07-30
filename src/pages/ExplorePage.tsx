import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, DollarSign, Calendar, Briefcase, Loader2, ArrowRight } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
  budget: number;
  deadline: string;
  skills?: string[];
  createdAt?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ExplorePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load projects');
        }

        // Response Array Validation
        const projectList = Array.isArray(data) ? data : data.projects || [];
        setProjects(projectList);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching projects';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Filtered projects based on Search and Category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.skills && project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      selectedCategory === 'All' || project.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Web Development', 'Mobile App', 'AI / Machine Learning', 'UI/UX Design'];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Explore Projects</h1>
        <p className="text-slate-400 text-sm md:text-base">
          Browse open client briefs, filter by technology or domain, and find your next opportunity.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-8 shadow-xl space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, description, or skills (e.g. React, Node)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No projects found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'All'
              ? 'Try adjusting your search query or selected category.'
              : 'There are no active projects listed at the moment.'}
          </p>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const desc = project.shortDescription || project.description || project.fullDescription || '';

            return (
              <div
                key={project._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg hover:shadow-indigo-500/5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.title}
                  </h2>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {desc}
                  </p>

                  {/* Skills Tag List */}
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md">
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 font-bold text-white text-sm">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>${project.budget}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    to={`/projects/${project._id}`}
                    className="w-full bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-700 hover:border-indigo-500"
                  >
                    View Details & Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;