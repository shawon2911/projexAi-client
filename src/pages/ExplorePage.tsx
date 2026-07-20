import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Search, SlidersHorizontal, Tag, DollarSign, ArrowUpRight, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Type definition for freelance tasks
interface Project {
  id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string;
  description: string;
  tags: string[];
}

// Dummy array matching production schema
const DUMMY_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Build Autonomous Market Analysis Pipeline",
    category: "AI Agent Development",
    budget: 2450,
    deadline: "2026-08-15",
    description: "Seeking an engineer to build a pipeline utilizing multi-agent swarms to parse incoming financial reports and stream tokenized sentiment vectors.",
    tags: ["Python", "LangChain", "Vector DB"]
  },
  {
    id: "proj-2",
    title: "Vite + Tailwind v4 Optimization Audit",
    category: "Frontend Architecture",
    budget: 850,
    deadline: "2026-07-30",
    description: "Refactor an enterprise SPA workspace from old Webpack configurations down to lightning-fast Vite compilation utilizing modern CSS variables.",
    tags: ["React", "Tailwind v4", "TypeScript"]
  },
  {
    id: "proj-3",
    title: "Secure Auth Sandbox Node Implementation",
    category: "Cybersecurity & Backend",
    budget: 1800,
    deadline: "2026-09-02",
    description: "Map a secure authentication perimeter using Better Auth middleware to handle custom validation schema callbacks safely.",
    tags: ["Node.js", "Better Auth", "MongoDB"]
  }
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Logics
  const filteredProjects = DUMMY_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brandNavy">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Project Matrix</h1>
            <p className="text-slate-400 text-sm mt-1">Discover computational briefs ready for optimization routines.</p>
          </div>
          
          {/* Active Counters */}
          <div className="text-xs font-mono text-brandTeal bg-brandTeal/10 border border-brandTeal/20 px-3 py-1.5 rounded-lg self-start md:self-auto">
            Active Deployments: {filteredProjects.length} nodes
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Query tasks, tags, or parameters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brandNavyLight border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-brandNavyLight border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors appearance-none cursor-pointer"
            >
              <option value="All">All Frameworks</option>
              <option value="AI Agent Development">AI Agent Development</option>
              <option value="Frontend Architecture">Frontend Architecture</option>
              <option value="Cybersecurity & Backend">Cybersecurity & Backend</option>
            </select>
          </div>
        </div>

        {/* Responsive Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 p-6 flex flex-col justify-between h-full rounded-xl border border-slate-700">
                <div>
                  
                  {/* Category + ID badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {project.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white hover:text-brandTeal transition-colors mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description Description */}
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Matrix Layer */}
                <div>
                  
                  {/* Tags Group */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1 text-[11px] font-mono bg-slate-900 text-brandTeal px-2 py-0.5 rounded border border-slate-800/80">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Execution Metrics and Button */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-500">Allocation Pool</p>
                      <p className="text-base font-black text-brandCoral flex items-center">
                        <DollarSign className="w-4 h-4 -mr-0.5 shrink-0" />
                        {project.budget.toLocaleString()}
                      </p>
                    </div>
                    
                    <Link 
                      to={`/projects/${project.id}`}
                      className="bg-slate-800 hover:bg-brandTeal hover:text-brandNavy text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          
          
          <div className="text-center py-24 bg-brandNavyLight/20 border border-dashed border-slate-800 rounded-2xl max-w-xl mx-auto">
            <FolderOpen className="w-12 h-12 text-slate-650 mx-auto mb-4 animate-pulse" />
            <h3 className="text-base font-bold text-slate-300">No Computational Nodes Match Query</h3>
            <p className="text-slate-500 text-xs mt-1 px-4">Adjust your string parameters or select a different framework matrix drop down.</p>
          </div>
        )}
      </main>
    </div>
  );
}