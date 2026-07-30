import { Link } from 'react-router-dom';

export default function DevWorkspace() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Workspace Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Developer Workspace</h1>
          <p className="text-gray-600 text-sm">Overview of your ongoing AI tasks and project briefs.</p>
        </div>
        <Link 
          to="/items/add" 
          className="bg-brandTeal hover:bg-teal-400 text-brandNavy font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          + Deploy New Brief
        </Link>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase">Active Projects</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">0</h2>
        </div>
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase">Pending Bids</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">0</h2>
        </div>
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase">Completed Deliveries</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">0</h2>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Workflows</h3>
          <div className="border border-dashed rounded-lg p-8 text-center text-gray-500 text-sm">
            No active workflows found in your workspace. Start by submitting a proposal or creating a brief!
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick AI Tools</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 flex justify-between items-center cursor-pointer hover:bg-sky-50 transition">
              <span>🤖 Project Brief Generator</span>
              <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">AI Agent</span>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 flex justify-between items-center cursor-pointer hover:bg-sky-50 transition">
              <span>⚡ Proposal Optimizer</span>
              <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">AI Agent</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}