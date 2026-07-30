import { useEffect, useState } from 'react';

interface Bid {
  _id: string;
  projectTitle: string;
  bidAmount: number;
  deliveryTime: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export default function MyBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: ব্যাকএন্ডের GET /api/bids/my-bids এপিআই থেকে ডেটা ফেচ করা হবে
    // বর্তমানে ডাটাবেজ খালি থাকলে এটি একটি খালি স্টেট দেখাবে
    setLoading(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Submitted Bids</h1>
        <p className="text-gray-600 text-sm">Track and manage all project proposals you have submitted.</p>
      </div>

      {loading ? (
        <div className="h-48 bg-gray-100 animate-pulse rounded-xl"></div>
      ) : bids.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-500 font-medium">You haven't submitted any bids yet.</p>
          <p className="text-gray-400 text-sm mt-1">Explore open projects and place your first proposal!</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Bid Amount</th>
                <th className="p-4">Delivery Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bids.map((bid) => (
                <tr key={bid._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{bid.projectTitle}</td>
                  <td className="p-4 text-emerald-600 font-bold">${bid.bidAmount}</td>
                  <td className="p-4">{bid.deliveryTime}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      bid.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      bid.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(bid.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}