
import { Link } from 'react-router-dom';
import { Terminal, Shield, GitBranch, LucideNetwork } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-850 py-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-white font-black tracking-tight">
            <Terminal className="w-5 h-5 text-brandTeal" />
            <span>SWARM<span className="text-brandTeal">GRID</span></span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Decentralized computational pipeline triaging structured project briefs to automated execution runtimes. Engineered with strict end-to-end performance parameters.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-3">Workspace</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-brandTeal transition-colors">Portal Home</Link></li>
            <li><Link to="/explore" className="hover:text-brandTeal transition-colors">Explore Nodes</Link></li>
            <li><Link to="/items/add" className="hover:text-brandTeal transition-colors">Deploy Brief</Link></li>
            <li><Link to="/dashboard" className="hover:text-brandTeal transition-colors">Console Log</Link></li>
          </ul>
        </div>

        {/* Credentials / Links Column */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-3">System Node</h4>
          <div className="flex gap-3 text-slate-400 mb-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl transition-colors border border-slate-800">
              <GitBranch className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl transition-colors border border-slate-800">
              <LucideNetwork className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Sec-Protocol Verified
          </p>
        </div>

      </div>

      {/* Terminal Base Ribbon */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-600">
        <p>© {currentYear} SwarmGrid. All compute cycles reserved.</p>
        <p className="tracking-tight text-slate-500">SYS_LOC // 221400012_NODE</p>
      </div>
    </footer>
  );
}