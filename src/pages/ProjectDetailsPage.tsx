import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project } from '../components/ProjectCard';
import { ProjectDetailsView } from '../components/ProjectDetailsView';
import { Loader2, Send, DollarSign, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

// Environment variable handling safely
const API_BASE_URL = (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Proposal Form State
  const [bidAmount, setBidAmount] = useState<string>('');
  const [deliveryDays, setDeliveryDays] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // User Info Check (Safe parsing)
  const token = localStorage.getItem('token') || localStorage.getItem('userToken');
  let userRole = 'guest';
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const userObj = JSON.parse(rawUser);
      userRole = userObj.role || 'developer';
    }
  } catch {
    userRole = 'guest';
  }

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch project details.');
        }

        setProject(data);
        if (data.budget) {
          setBidAmount(data.budget.toString());
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error loading project');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to submit a proposal.');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    setSubmitSuccess(null);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: id,
          bidAmount: Number(bidAmount),
          deliveryDays: Number(deliveryDays),
          coverLetter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit proposal.');
      }

      setSubmitSuccess('🎉 Proposal submitted successfully!');
      setCoverLetter('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit proposal');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl mb-6">
          <AlertCircle className="w-10 h-10 mx-auto mb-2" />
          <h3 className="text-lg font-bold">{error || 'Project not found!'}</h3>
        </div>
        <button
          onClick={() => navigate('/explore')}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Reusable Project Details */}
        <div className="lg:col-span-2">
          <ProjectDetailsView project={project} />
        </div>

        {/* Right 1 Column: Developer Bid / Proposal Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-6 space-y-6">
            <h2 className="text-xl font-bold text-white">Submit a Proposal</h2>

            {submitSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs">
                {submitSuccess}
              </div>
            )}

            {userRole === 'client' ? (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-4 rounded-xl text-xs">
                Clients cannot submit bids on projects. Switch to a Developer account to apply.
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                    Your Bid Amount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="number"
                      required
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                    Delivery Time (In Days)
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="number"
                      required
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      placeholder="e.g. 7"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                    Cover Letter / Proposal
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Describe why you are the best fit for this project..."
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Proposal
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;