import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  PlusCircle, 
  FolderKanban, 
  Briefcase, 
  LogOut, 
  User as UserIcon,
  Compass,
  Home
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'developer';
}


const getUserFromStorage = (): UserData | null => {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  if (token && savedUser) {
    try {
      return JSON.parse(savedUser) as UserData;
    } catch {
      return null;
    }
  }
  return null;
};

export default function Navbar() {
  const [user, setUser] = useState<UserData | null>(getUserFromStorage);
  
  const navigate = useNavigate();
  const location = useLocation();

 
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setUser(getUserFromStorage());
  }


  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-slate-200 sticky top-0 z-50 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-lg tracking-tight hover:opacity-90 transition-opacity">
          <Terminal className="w-6 h-6 text-teal-400" />
          <span>PROJEX<span className="text-teal-400">AI</span></span>
        </Link>

        {/* Dynamic Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium">
          
          {/* COMMON NAV ITEMS */}
          <Link to="/" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
            <Home className="w-4 h-4 text-slate-400" />
            <span>Home</span>
          </Link>

          <Link to="/explore" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Explore Projects</span>
          </Link>

          {/* CLIENT ONLY NAV ITEMS */}
          {user && user.role === 'client' && (
            <>
              <Link to="/items/add" className="flex items-center gap-1.5  font-semibold hover:text-teal-400 transition-colors">
                <PlusCircle className="w-4 h-4" />
                <span>Post Project</span>
              </Link>
              
              <Link to="/manage-projects" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
                <FolderKanban className="w-4 h-4 text-slate-400" />
                <span>My Projects</span>
              </Link>
            </>
          )}

          {/* DEVELOPER ONLY NAV ITEMS */}
          {user && user.role === 'developer' && (
            <>
              <Link to="/my-bids" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>My Bids</span>
              </Link>

              <Link to="/workspace" className="flex items-center gap-1.5  font-semibold hover:text-teal-400 transition-colors">
                <Terminal className="w-4 h-4" />
                <span>Dev Workspace</span>
              </Link>
            </>
          )}
        </div>

        {/* User Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
                <UserIcon className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-semibold text-slate-300">{user.name}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-xl border border-red-500/20 transition-all cursor-pointer"
                title="Sign out of your account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}