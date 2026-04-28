import { Link } from "react-router-dom";

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3 text-white transition-colors hover:text-white/90">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-300 to-amber-300 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            IS
          </span>
          <span className="text-xl font-bold tracking-tight">InternSync</span>
        </Link>
        <div className="flex items-center gap-8">
          <a href="#platform" className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline">
            Platform
          </a>
          <a href="#features" className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline">
            Features
          </a>
          <a href="#reviews" className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline">
            Reviews
          </a>
          <Link to="/auth" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-cyan-100">
            Enter Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
