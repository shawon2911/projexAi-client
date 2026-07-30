import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Terminal, ShieldAlert } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     
// Delete the import.meta.env line entirely and write it exactly like this:
const response = await axios.post(`${API_BASE}/auth/register`, {
  name,
  email,
  password,
  role
});
      // Save token and info down to local storage arrays
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect directly to workspace dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration routine failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-brandNavyLight border border-slate-850 p-8 rounded-2xl shadow-2xl">
        
        {/* Brand Core Identity Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white font-black text-xl tracking-tight mb-2">
            <Terminal className="w-6 h-6 text-brandTeal" />
            <span>SWARM<span className="text-brandTeal">GRID</span></span>
          </div>
          <p className="text-xs text-slate-400">Establish your secure computational credentials node</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Full Identity Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brandTeal w-full"
              placeholder="user"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Communications Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brandTeal w-full"
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Secure Access Code Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brandTeal w-full"
              placeholder="••••••••"
            />
          </div>

          {/* THE ROLE SELECTION BOX COMPONENT BLOCK */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Account Type / Operational Workspace
            </label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brandTeal w-full appearance-none cursor-pointer"
            >
              <option value="client">Client Node (Post briefs & deploy funds)</option>
              <option value="developer">Developer Node (Execute briefs & compile code)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandTeal hover:bg-teal-400 text-brandNavy font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider font-mono shadow-md mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Initializing Stream...' : 'Compile Account Node'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-brandTeal hover:underline transition-all">
            Execute Authorization Login
          </Link>
        </p>

      </div>
    </div>
  );
}