import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface ProjectFormData {
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  budget: string;
  deadline: string;
  skills: string;
}

interface ApiResponse {
  success?: boolean;
  generatedDescription?: string;
  message?: string;
}

const RAW_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// Safe URL formatter - redundant /api prevent করার জন্য
const API_BASE_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL}/api`;

export const AddProjectPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: 'Web Development',
    shortDescription: '',
    fullDescription: '',
    budget: '',
    deadline: '',
    skills: '',
  });

  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // AI Scope Generator
  const handleGenerateAiScope = async (): Promise<void> => {
    if (!formData.title.trim() && !formData.shortDescription.trim()) {
      setAiError('Please enter a Project Title or Short Summary first!');
      return;
    }

    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          shortDescription: formData.shortDescription,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate AI scope');
      }

      if (data.generatedDescription) {
        setFormData((prev) => ({
          ...prev,
          fullDescription: data.generatedDescription || '',
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong with AI generation.';
      setAiError(errorMessage);
    }  finally {
      setIsGeneratingAi(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // LocalStorage থেকে Auth Token চেক
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');

    if (!token) {
      alert('You are not authorized! Please log in first to post a project.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    // 💡 Safe Skills Array & String split handling
    const skillsArray = formData.skills
      ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    // Safe Payload
    const payload = {
      title: formData.title,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.fullDescription,
      fullDescription: formData.fullDescription,
      budget: Number(formData.budget),
      deadline: formData.deadline,
      skills: skillsArray, // String array for clean MongoDB integration
      tags: skillsArray,
      requirements: formData.fullDescription,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Authorization header pass
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        console.error('Backend Error Details:', data);
        throw new Error(data.message || 'Failed to post project');
      }

      alert('🎉 Project posted successfully!');

      // Redirect to Manage / My Projects page
      navigate('/my-projects');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Create New Project</h1>
        <p className="text-slate-400 text-sm mb-8">
          Fill out the details below to post your project and receive proposals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-300">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Build an E-commerce Mobile App"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI / Machine Learning">AI / Machine Learning</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
          </div>

          {/* Short Summary */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Short Summary</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Briefly state what you need in 1-2 sentences"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Required Skills (Comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, TypeScript, Tailwind"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Full Scope & AI Button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Detailed Scope of Work</label>
              <button
                type="button"
                onClick={handleGenerateAiScope}
                disabled={isGeneratingAi}
                className="flex items-center gap-2 bg-brandTeal hover:bg-teal-400 text-brandNavy text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Enhance Scope with AI
                  </>
                )}
              </button>
            </div>

            {aiError && <p className="text-xs text-rose-400 mt-1">{aiError}</p>}

            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={8}
              placeholder="Provide full details or click 'Enhance Scope with AI' to auto-generate..."
              required
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed font-mono"
            />
          </div>

          {/* Budget & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Budget ($)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="500"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brandTeal hover:bg-teal-400 text-brandNavy font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Post Project <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};