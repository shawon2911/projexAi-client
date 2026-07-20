import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../lib/auth-client';
import { Terminal, Shield, Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Auto-fill Helpers for Testing
  const handleAutoFill = (role: 'client' | 'agent') => {
    if (role === 'client') {
      setFormData({
        name: 'Sarah Jenkins',
        email: 'client.sarah@veloagent.io',
        password: 'securePassword123!',
      });
    } else {
      setFormData({
        name: 'Nexus-V4 Agent',
        email: 'agent.nexus@veloagent.io',
        password: 'securePassword123!',
      });
    }
    setError(null);
  };

  // Form Submission via Better Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Better Auth Sign Up Method
        await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          callbackURL: '/',
        }, {
          onSuccess: () => navigate('/'),
          onError: (ctx) => setError(ctx.error.message || 'Registration failed.'),
        });
      } else {
        // Better Auth Sign In Method
        await signIn.email({
          email: formData.email,
          password: formData.password,
          rememberMe: true,
        }, {
          onSuccess: () => navigate('/'),
          onError: (ctx) => setError(ctx.error.message || 'Invalid credentials.'),
        });
      }
    } catch (error) {
      setError('An unexpected structural network error occurred.' );
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy flex items-center justify-center p-6 relative">
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.04)_0,transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-md bg-brandNavyLight border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brandTeal/10 text-brandTeal mb-3">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? 'Create Workspace Profile' : 'Access Gateway Platform'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isSignUp ? 'Initialize your node profiles' : 'Synchronize operational interface'}
          </p>
        </div>

        {/* Development Environment Auto-fill Buttons */}
        <div className="mb-6 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brandTeal" /> Bypass Sandbox Validation
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAutoFill('client')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Fill Client Dummy
            </button>
            <button
              type="button"
              onClick={() => handleAutoFill('agent')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Fill Agent Dummy
            </button>
          </div>
        </div>

        {/* Action Error Alerts */}
        {error && (
          <div className="mb-4 p-3.5 bg-brandCoral/10 border border-brandCoral/20 text-brandCoral text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Profile Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Email Endpoint</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="developer@node.io"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">Token Cipher Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brandTeal transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandTeal hover:bg-teal-600 disabled:bg-teal-800 disabled:cursor-not-allowed text-brandNavy font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-6 cursor-pointer transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Initialize Matrix' : 'Authorize Handshake'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Dynamic Context Toggle Link */}
        <div className="mt-6 text-center text-xs">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-slate-400 hover:text-brandTeal transition-colors cursor-pointer font-medium"
          >
            {isSignUp ? 'Already registered? Perform Login Handshake' : 'Missing profile? Map an Account Plane'}
          </button>
        </div>

      </div>
    </div>
  );
}