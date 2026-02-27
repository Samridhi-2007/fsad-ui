import { Link } from "react-router-dom";

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-slate-900/90 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-white/90 transition-colors">
        InternSync
      </Link>
      <div className="flex items-center gap-8">
        <a href="#features" className="hidden sm:inline text-sm font-medium text-white/85 hover:text-white transition-colors">Features</a>
        <a href="#about" className="hidden sm:inline text-sm font-medium text-white/85 hover:text-white transition-colors">About</a>
        <Link to="/auth" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg shadow-amber-500/20">
          Enter Portal
        </Link>
      </div>
    </nav>
  );
}

export default LandingNav;
