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

  // ✅ 1. API Base URL safety fix (Ensure /api prefix)
  const envBase = (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const API_BASE = envBase.endsWith('/api') ? envBase : `${envBase}/api`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ 2. Clean endpoint hit: http://localhost:5000/api/auth/login
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password
      });

      // Save credentials
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to explore/dashboard
      navigate("/");
    } catch (err: unknown) {
      // ✅ 3. Extract exact error message from Axios Response
      if (axios.isAxiosError(err)) {
        const backendMessage = err.response?.data?.message || err.response?.data?.error;
        setError(backendMessage || "Invalid email or password.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during login.");
      }
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