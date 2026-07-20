import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Terminal, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     // Replace your login post line exactly with this:
const response = await axios.post(`${API_BASE}/api/auth/register`, {
  email,
  password
});

      // 2. Commit the active verification token and user profile structure directly to storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 3. Forward the initialized credentials node safely to the application dashboard console
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Authorization failed. Credentials matrix mismatch.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-brandNavyLight border border-slate-850 p-8 rounded-2xl shadow-2xl">
        {/* Identity Branding Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white font-black text-xl tracking-tight mb-2">
            <Terminal className="w-6 h-6 text-brandTeal" />
            <span>
              SWARM<span className="text-brandTeal">GRID</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Authenticate session logs to enter compute space
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Verification Email
            </label>
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
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Access Security Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brandTeal w-full"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandTeal hover:bg-teal-400 text-brandNavy font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider font-mono shadow-md mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying Log..." : "Authorize Workspace Entry"}
          </button>
        </form>

        {/* REDIRECTION UPDATE SPECIFICALLY FOR THE NEW REGISTER PAGE */}
        <p className="text-center text-xs text-slate-500 mt-6">
          New node operator?{" "}
          <Link
            to="/register"
            className="text-brandTeal hover:underline transition-all font-semibold"
          >
            Deploy New Account Matrix
          </Link>
        </p>
      </div>
    </div>
  );
}
