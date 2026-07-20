
import { Link, useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../lib/auth-client';
import { Terminal, LogOut, LayoutDashboard, Compass, PlusCircle, LogIn } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/');
        }
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-brandNavy/90 backdrop-blur-md border-b border-slate-850 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-brandTeal font-bold text-xl tracking-tight">
        <Terminal className="w-6 h-6" />
        <span>VeloAgent</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-slate-300 hover:text-brandTeal text-sm font-medium transition-colors">Home</Link>
        <Link to="/explore" className="text-slate-300 hover:text-brandTeal text-sm font-medium flex items-center gap-1 transition-colors">
          <Compass className="w-4 h-4" /> Explore
        </Link>

        {session?.user ? (
          <>
            <Link to="/items/add" className="text-slate-300 hover:text-brandTeal text-sm font-medium flex items-center gap-1 transition-colors">
              <PlusCircle className="w-4 h-4" /> New Project
            </Link>
            <Link to="/items/manage" className="text-slate-300 hover:text-brandTeal text-sm font-medium flex items-center gap-1 transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Manage
            </Link>
            <button 
              onClick={handleLogout}
              className="text-slate-300 hover:text-brandCoral text-sm font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <span className="text-xs bg-slate-800 text-brandTeal px-3 py-1 rounded-full border border-slate-700 font-mono">
              {session.user.name}
            </span>
          </>
        ) : (
          <Link to="/login" className="bg-brandTeal hover:bg-teal-600 text-brandNavy font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-1 transition-colors">
            <LogIn className="w-4 h-4" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
}