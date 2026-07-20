import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PlusCircle, DollarSign, Calendar, FileText, Sparkles, Loader2, ArrowLeft } from 'lucide-react';

export default function AddProjectPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Parameters State
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    shortDescription: '',
    fullDescription: '',
    budget: '',
    deadline: '',
    category: 'AI Agent Development'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Helper to instantly load placeholder data for grading/testing demo runs
  const handleDemoPopulate = () => {
    setFormData({
      title: "Enterprise Multi-Agent Customer Routing System",
      clientName: "Stellar Labs Inc.",
      shortDescription: "Design a LangGraph agent cluster to triage multi-channel support tickets.",
      fullDescription: "We need an engineer to configure a production routing matrix. The deployment needs to evaluate natural language incoming inputs, query vector datastores for matching internal context manuals, and safely assign high-priority threads to live support pools.",
      budget: "4500",
      deadline: "2026-09-30",
      category: "AI Agent Development"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock network transmission buffer delay before moving back to dashboard matrix
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/explore');
      }, 1200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brandNavy">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate('/explore')}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-brandTeal mb-6 font-mono cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Matrix
        </button>

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Deploy Brief Node</h1>
            <p className="text-slate-400 text-xs mt-1">Map operational parameters to structure a new active workspace.</p>
          </div>
          
          <button
            type="button"
            onClick={handleDemoPopulate}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-brandTeal text-xs font-mono font-medium rounded-lg shadow transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" /> Auto-Fill Data
          </button>
        </div>

        {/* Status Alerts */}
        {success && (
          <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/20 text-brandTeal text-sm font-medium rounded-xl">
            ✓ Project node established successfully! Synchronizing system view...
          </div>
        )}

        {/* Workspace Form Initialization */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-brandNavyLight border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Vector Optimization Engine"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Client Label / Entity</label>
              <input
                type="text"
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleChange}
                placeholder="e.g., Apex Systems LLC"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Framework Strategy</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors appearance-none cursor-pointer"
              >
                <option value="AI Agent Development">AI Agent Development</option>
                <option value="Frontend Architecture">Frontend Architecture</option>
                <option value="Cybersecurity & Backend">Cybersecurity & Backend</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Funding Allocation ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="2500"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Target Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors appearance-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Short Synopsis (Grid View Summary)</label>
            <input
              type="text"
              name="shortDescription"
              required
              maxLength={120}
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Provide a concise one-line summary of requirements..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Complete Operational Brief (Full Scope)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <textarea
                name="fullDescription"
                required
                rows={5}
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Breakdown detailed workflows, system dependencies, milestones, and required developer tech stacks..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandTeal hover:bg-teal-600 disabled:bg-teal-800 disabled:cursor-not-allowed text-brandNavy font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4 cursor-pointer transition-colors shadow-lg shadow-brandTeal/5"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Publish Project to Pipeline</span>
              </>
            )}
          </button>
        </form>

      </main>
    </div>
  );
}