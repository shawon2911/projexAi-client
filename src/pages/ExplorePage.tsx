import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  budget: number;
  skills: string[];
}

export default function ExploreProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects(search, category);
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching real data:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/4 bg-black"
        >
          <option value="All">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="AI Integration">AI Integration</option>
          <option value="Mobile App">Mobile App</option>
        </select>
      </div>

      {/* Grid view - 3 Cards per row */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No real projects found in MongoDB database. Be the first to post one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((item) => (
            <div key={item._id} className="border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-100 text-sky-800">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mt-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.shortDescription}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.skills?.map((skill, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t flex justify-between items-center">
                <span className="font-bold text-lg text-emerald-600">${item.budget}</span>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}