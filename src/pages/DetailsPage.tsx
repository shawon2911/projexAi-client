import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, DollarSign, Calendar, ShieldCheck, Cpu, Terminal, CheckCircle } from 'lucide-react';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);

  return (
    <div className="min-h-screen bg-brandNavy text-slate-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        
        <Link 
          to="/explore" 
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-brandTeal mb-8 font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Task Registry Matrix
        </Link>

        {/* Master Inspection Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Context Breakdown Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brandNavyLight border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono bg-brandTeal/10 border border-brandTeal/20 text-brandTeal px-2 py-0.5 rounded uppercase tracking-wider">
                  Active Operational Brief
                </span>
                <span className="text-[10px] font-mono text-slate-500">Node ID: {id || "unknown-node"}</span>
              </div>

              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                Autonomous Market Analysis Pipeline Configuration Routine
              </h1>

              <div className="mt-6 border-t border-slate-800 pt-6">
                <h3 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider mb-2">Scope of Operations</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We require a dedicated system architecture expert to build out custom task allocation swarms. The setup needs to ingest raw markdown strings, compute sentiment variables across isolated node clusters, and write real-time metric models straight to our persistent MongoDB store hook layer without blocking concurrent active client processes.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider mb-2">System Stack Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Tailwind CSS v4', 'TypeScript', 'Node.js Middleware'].map((tech, i) => (
                    <span key={i} className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Checklist Container */}
            <div className="bg-brandNavyLight border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brandTeal" /> Escrow Execution Rules
              </h3>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brandTeal shrink-0 mt-0.5" />
                  <span>Build must pass 100% of integration test layers during staging deployment pipelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brandTeal shrink-0 mt-0.5" />
                  <span>Source files need strict type compilation declarations to pass linting verification check hooks.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Side Control Panel Parameters */}
          <div className="space-y-6">
            <div className="bg-brandNavyLight border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Financial Allocation Metric */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Financial Funding</p>
                <p className="text-2xl font-black text-brandCoral mt-1 flex items-baseline">
                  <DollarSign className="w-5 h-5 -mr-0.5 text-brandCoral self-center" />2,450
                  <span className="text-[11px] font-mono text-slate-500 font-normal ml-1">USD Locked</span>
                </p>
              </div>

              {/* Deadline Metric */}
              <div className="flex items-center gap-3 border-t border-b border-slate-800/80 py-4">
                <Calendar className="w-5 h-5 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Target Resolution</p>
                  <p className="text-xs font-bold text-white mt-0.5">September 30, 2026</p>
                </div>
              </div>

              {/* Execution Action Button */}
              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`w-full font-bold py-3 rounded-xl transition-all text-xs text-center uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  applied 
                    ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-brandTeal text-brandNavy hover:bg-teal-400 shadow-brandTeal/5'
                }`}
              >
                {applied ? (
                  <>✓ Allocation Request Logged</>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" /> Initialize Agent Swarm
                  </>
                )}
              </button>
            </div>

            {/* Diagnostic Logs Panel */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-850 font-mono text-[10px] text-slate-500">
              <div className="flex items-center gap-1 text-slate-400 mb-2">
                <Terminal className="w-3.5 h-3.5 text-brandTeal" /> <span>SECURITY INFRASTRUCTURE</span>
              </div>
              <p>• STATUS: SECURE_ISOLATION</p>
              <p>• VERIFICATION: HMAC_SHA256 PASS</p>
              <p>• LEDGER: COMPATIBLE</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}