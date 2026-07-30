import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api';

export default function DeployMatrixBrief() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    budget: '',
    shortDescription: '',
    description: '',
    skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first to deploy a project brief.');
      setLoading(false);
      return;
    }

    try {
      await createProject(
        {
          ...formData,
          budget: Number(formData.budget),
          skills: formData.skills.split(',').map((s) => s.trim()),
        },
        token
      );
      navigate('/projects'); // Navigate to real list upon success
    } catch (err: any) {
      setError(err.message || 'Failed to submit project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Deploy Matrix Brief</h2>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border p-2.5 rounded-lg mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border p-2.5 rounded-lg mt-1"
            >
              <option value="Web Development">Web Development</option>
              <option value="AI Integration">AI Integration</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
            <input
              type="number"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full border p-2.5 rounded-lg mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (Comma separated)</label>
          <input
            type="text"
            placeholder="React, TypeScript, Node.js"
            required
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full border p-2.5 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Summary</label>
          <input
            type="text"
            required
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full border p-2.5 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Description</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2.5 rounded-lg mt-1"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition"
        >
          {loading ? 'Deploying...' : 'Deploy Brief'}
        </button>
      </form>
    </div>
  );
}