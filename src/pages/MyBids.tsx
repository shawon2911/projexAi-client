import  { useEffect, useState } from 'react';

interface Bid {
  _id: string;
  projectId?: {
    _id: string;
    title: string;
    budget: number;
  } | string;
  projectTitle?: string;
  amount: number;
  deliveryTime: number; // in days
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: string;
}

const RAW_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL}/api`;

export default function MyBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const token =
          localStorage.getItem('token') ||
          localStorage.getItem('userToken') ||
          localStorage.getItem('accessToken');

        if (!token) {
          setError('Please log in to view your submitted bids.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/bids/my-bids`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch your bids.');
        }

        setBids(Array.isArray(data) ? data : []);
      } catch  {
        console.error('Error fetching my bids:');
        setError(  'Something went wrong while fetching bids.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400 font-medium animate-pulse">
          Loading your submitted bids...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6">
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-center">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Submitted Bids</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track and manage all the proposals you have placed on projects.
          </p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
          Total Bids: {bids.length}
        </span>
      </div>

      {bids.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
          <div className="text-slate-500 mb-3 text-4xl">📄</div>
          <h3 className="text-lg font-medium text-slate-300">No Bids Placed Yet</h3>
          <p className="text-sm text-slate-500 mt-1">
            Explore open projects and submit proposals to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bids.map((bid) => {
            const projectTitle =
              typeof bid.projectId === 'object' && bid.projectId?.title
                ? bid.projectId.title
                : bid.projectTitle || 'Untitled Project';

            return (
              <div
                key={bid._id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{projectTitle}</h3>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                      {bid.proposal}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                      bid.status === 'accepted'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : bid.status === 'rejected'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {bid.status || 'pending'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  <div>
                    Bid Amount: <span className="text-white font-semibold">${bid.amount}</span>
                  </div>
                  <div>
                    Delivery Time: <span className="text-white font-semibold">{bid.deliveryTime} Days</span>
                  </div>
                  {bid.createdAt && (
                    <div className="ml-auto text-slate-500">
                      Submitted on: {new Date(bid.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}