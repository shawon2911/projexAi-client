import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Briefcase, Trash2, Edit2, ShieldAlert, FileCode2, CheckCircle, Clock } from 'lucide-react';

// Type matching our project schema
interface ManagedProject {
  id: string;
  title: string;
  category: string;
  budget: number;
  status: 'Pending' | 'Active' | 'Completed';
  dateCreated: string;
}

// Initial administrative project mock nodes
const INITIAL_MANAGED: ManagedProject[] = [
  {
    id: "node-841",
    title: "Build Autonomous Market Analysis Pipeline",
    category: "AI Agent Development",
    budget: 2450,
    status: "Active",
    dateCreated: "2026-07-10"
  },
  {
    id: "node-209",
    title: "Vite + Tailwind v4 Optimization Audit",
    category: "Frontend Architecture",
    budget: 850,
    status: "Pending",
    dateCreated: "2026-07-18"
  }
];

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<ManagedProject[]>(INITIAL_MANAGED);
  const [showNotification, setShowNotification] = useState(false);

  // Administrative action to slice the array state
  const handleDeleteNode = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brandNavy">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Dashboard Title Metrics Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Console Command</h1>
            <p className="text-slate-400 text-xs mt-1">Manage, update, or purge operational briefs deployed by your profile.</p>
          </div>
          
          <div className="flex gap-4 text-xs font-mono">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-slate-300">
              Total Nodes: <span className="text-brandTeal font-bold">{projects.length}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-slate-300">
              Funding Escrow: <span className="text-brandCoral font-bold">${projects.reduce((acc, curr) => acc + curr.budget, 0)}</span>
            </div>
          </div>
        </div>

        {/* Dynamic State Alert Notification */}
        {showNotification && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono rounded-xl flex items-center gap-2 animate-fade-in">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" /> WARNING: Project brief removed from local runtime cache.
          </div>
        )}

        {/* Managed Elements Data Grid Display */}
        {projects.length > 0 ? (
          <div className="bg-brandNavyLight border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-6">Brief Descriptor</th>
                    <th className="py-4 px-6">Framework System</th>
                    <th className="py-4 px-6">Status Marker</th>
                    <th className="py-4 px-6">Budget Pool</th>
                    <th className="py-4 px-6 text-right">Operational Overrides</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-900/30 transition-colors">
                      
                      {/* Title + Identification Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <FileCode2 className="w-5 h-5 text-brandTeal/70 shrink-0" />
                          <div>
                            <p className="font-bold text-white text-sm leading-tight line-clamp-1">{project.title}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-0.5">ID Ref: {project.id} • Created: {project.dateCreated}</p>
                          </div>
                        </div>
                      </td>

                      {/* Framework Strategy Tag */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-[11px] font-mono bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
                          {project.category}
                        </span>
                      </td>

                      {/* Status Badging Row */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {project.status === 'Active' && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" /> Core Running
                          </span>
                        )}
                        {project.status === 'Pending' && (
                          <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                            <Clock className="w-3.5 h-3.5" /> Queue Stage
                          </span>
                        )}
                        {project.status === 'Completed' && (
                          <span className="flex items-center gap-1 text-[11px] text-blue-400 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" /> Executed
                          </span>
                        )}
                      </td>

                      {/* Financial Metrics */}
                      <td className="py-4 px-6 whitespace-nowrap font-mono text-white font-semibold">
                        ${project.budget.toLocaleString()}
                      </td>

                      {/* Administrative Option Button Groups */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            title="Edit project parameters"
                            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-brandTeal rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteNode(project.id)}
                            title="Purge project from ledger"
                            className="p-1.5 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          
          /* Empty Administrative Log State Block */
          <div className="text-center py-20 bg-brandNavyLight/20 border border-dashed border-slate-800 rounded-2xl max-w-xl mx-auto">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-400">No Projects Registered Under Credentials</h3>
            <p className="text-slate-500 text-xs mt-0.5">Deploy new job descriptions via the input pipeline interface module.</p>
          </div>
        )}

      </main>
    </div>
  );
}