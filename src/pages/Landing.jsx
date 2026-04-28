import { Link } from "react-router-dom";

const stats = [
  { value: "4.8/5", label: "average intern experience rating" },
  { value: "320+", label: "applications tracked in one workflow" },
  { value: "48h", label: "average recruiter response window" },
];

const floatingReviews = [
  {
    quote: "We finally stopped tracking interns across spreadsheets and WhatsApp.",
    author: "Ritika",
    role: "HR Lead",
    tone: "from-white/16 to-white/6",
    position: "left-[4%] top-32 hidden xl:block",
    drift: "animate-float-slow",
  },
  {
    quote: "The task board made weekly mentoring much easier to manage remotely.",
    author: "Nikhil",
    role: "Engineering Mentor",
    tone: "from-cyan-300/18 to-teal-300/5",
    position: "right-[6%] top-52 hidden lg:block",
    drift: "animate-float-medium",
  },
  {
    quote: "Applying, tracking status, and reviewing recruiters all felt clear.",
    author: "Ayesha",
    role: "Intern Candidate",
    tone: "from-amber-300/18 to-white/6",
    position: "left-[12%] bottom-24 hidden lg:block",
    drift: "animate-float-fast",
  },
];

const pathways = [
  {
    title: "Explore openings",
    text: "Browse curated opportunities, recruiter-posted roles, and competition-ready experiences from one place.",
  },
  {
    title: "Run the workflow",
    text: "Assign tasks, monitor progress, and centralize updates without forcing everyone into scattered tools.",
  },
  {
    title: "Build trust faster",
    text: "Keep interns, recruiters, and admins aligned through clear visibility, feedback loops, and profile-based tracking.",
  },
];

const features = [
  {
    title: "Public-first discovery",
    text: "A clean landing experience explains the platform before anyone needs an account.",
    accent: "bg-cyan-100 text-cyan-800",
  },
  {
    title: "Recruiter-ready openings",
    text: "Recruiters can manage openings, evaluate applicants, and stay connected with active candidates.",
    accent: "bg-teal-100 text-teal-800",
  },
  {
    title: "Intern progress visibility",
    text: "Interns can follow tasks, applications, and outcomes without guessing what comes next.",
    accent: "bg-amber-100 text-amber-800",
  },
  {
    title: "Admin control layer",
    text: "Admins can manage platform people, coordinate roles, and keep the whole program organized.",
    accent: "bg-slate-200 text-slate-800",
  },
];

function Landing() {
  return (
    <div className="overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate min-h-screen border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_26%),linear-gradient(135deg,_#020617_0%,_#0f172a_42%,_#134e4a_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute left-1/2 top-44 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

        {floatingReviews.map((review) => (
          <article
            key={review.author}
            className={`absolute ${review.position} ${review.drift} max-w-xs rounded-3xl border border-white/15 bg-gradient-to-br ${review.tone} p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-md`}
          >
            <p className="text-sm leading-6 text-white/90">“{review.quote}”</p>
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-white/55">
              {review.author} • {review.role}
            </div>
          </article>
        ))}

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-32 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                Remote internship platform
              </div>
              <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                Make internships feel coordinated, visible, and exciting before login even starts.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
                InternSync brings together internship discovery, recruiter coordination, task tracking, and progress visibility in one polished workflow for interns, mentors, recruiters, and admins.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  Start with InternSync
                </Link>
                <a
                  href="#platform"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/90 transition-all hover:bg-white/10 hover:text-white"
                >
                  See the platform flow
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white">{item.value}</div>
                    <div className="mt-2 text-sm leading-6 text-white/65">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-300/20 via-transparent to-amber-300/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">Live snapshot</div>
                    <div className="mt-1 text-lg font-semibold text-white">InternSync platform map</div>
                  </div>
                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Public preview
                  </span>
                </div>

                <div className="mt-4 grid gap-4">
                  <div className="rounded-2xl bg-white p-5 text-slate-900">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Candidate lane</div>
                        <h3 className="mt-2 text-2xl font-bold">Apply, track, and grow</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Public-facing discovery moves smoothly into account-based applications, status tracking, and mentorship.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-right">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Open roles</div>
                        <div className="text-2xl font-bold text-slate-900">24</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/12 bg-slate-950/50 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">Recruiter panel</div>
                      <p className="mt-3 text-2xl font-bold">Openings + applicants</p>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        Review candidate interest, manage role visibility, and stay aligned with hiring goals.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-slate-950/50 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Admin control</div>
                      <p className="mt-3 text-2xl font-bold">People + structure</p>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        Keep interns, recruiters, and platform workflows organized from a single control layer.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/6 p-5">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                      <span className="rounded-full bg-white/10 px-3 py-1">Discover openings</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Apply faster</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Track work</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Share feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="bg-[#f6fbfa] px-6 py-24 text-slate-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">How the platform flows</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              A clearer public entrance into the full internship workflow
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The landing page should earn attention first, then naturally guide people into account-based actions when they are ready.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pathways.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white px-6 py-24 text-slate-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Why it feels better</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Built for more than login screens and static feature lists
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              This public experience now explains value through movement, proof, and platform structure instead of only a headline and two cards.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-[1.8rem] border border-slate-200 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_28px_80px_-46px_rgba(2,6,23,0.45)]"
              >
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${feature.accent}`}>
                  InternSync
                </span>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-slate-100 px-6 py-24 text-slate-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">Social proof</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Reviews and reactions that make the platform feel lived-in
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {floatingReviews.map((review, index) => (
              <article key={review.author} className="rounded-[1.8rem] bg-white p-7 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.35)]">
                <div className="text-4xl font-bold text-slate-200">0{index + 1}</div>
                <p className="mt-5 text-base leading-8 text-slate-700">“{review.quote}”</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="font-semibold text-slate-900">{review.author}</div>
                  <div className="text-sm text-slate-500">{review.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,148,136,0.18),rgba(15,23,42,0.92),rgba(251,191,36,0.12))] p-8 shadow-2xl shadow-black/30 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Open without login</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Let the landing page sell the experience before the portal asks for credentials.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Visitors can explore the platform story, reviews, and workflow value immediately, then move into the portal when they are ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Enter Portal
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
            >
              Revisit features
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-6 text-sm text-white/55 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <span className="font-semibold text-white">InternSync</span>
          <span>© {new Date().getFullYear()} InternSync. Built for remote internship programs that need clarity.</span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
