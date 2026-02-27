import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-800 text-white">
        <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/70 mb-5">Remote Internship Management</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl mb-5">
          Bridge talent with opportunity, anywhere
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 leading-relaxed">
          A professional platform to manage internships, track tasks, and facilitate mentor feedback—built for modern remote teams.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auth" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-xl shadow-amber-500/25 hover:-translate-y-0.5">
            Get Started
          </Link>
          <a href="#features" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white/50 rounded-lg hover:bg-white/10 hover:border-white transition-all">
            Learn More
          </a>
        </div>
      </header>

      <section id="features" className="py-20 md:py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">Platform Features</h2>
          <p className="text-slate-600 text-center mb-12">Everything you need to run effective remote internship programs</p>
          <div className="grid md:grid-cols-2 gap-7">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-4">👔</div>
              <h3 className="text-lg font-semibold text-teal-700 mb-4">For Employers</h3>
              <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
                <li>Post and manage internship opportunities</li>
                <li>Track intern progress and performance</li>
                <li>Provide evaluations and structured feedback</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-lg font-semibold text-teal-700 mb-4">For Interns</h3>
              <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
                <li>Apply and discover internship opportunities</li>
                <li>Track assigned tasks and deadlines</li>
                <li>Receive mentor feedback and progress reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">About InternSync</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            InternSync is a modern platform for remote internship management and evaluation. We streamline task tracking, progress reporting, and mentor feedback to deliver seamless internship experiences.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to manage internships smarter?</h2>
          <p className="text-white/85 mb-8">Start organizing your internship program in minutes.</p>
          <Link to="/auth" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-xl shadow-amber-500/25">
            Enter Portal
          </Link>
        </div>
      </section>

      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-6 bg-slate-900 text-slate-400 text-sm">
        <span className="font-semibold text-white">InternSync</span>
        <span>© {new Date().getFullYear()} InternSync. Remote internship management.</span>
      </footer>
    </div>
  );
}

export default Landing;
