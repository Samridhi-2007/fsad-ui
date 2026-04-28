import { Link } from "react-router-dom";
import { competitionItems } from "../../data/competitionData";

function UserCompetitions() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Competitions & Opportunities</h1>
        <p className="mt-1 text-slate-600">
          Explore hackathons, conferences, AI summits, and prize-winning student competitions.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {competitionItems.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                {item.type}
              </span>
              <span className="text-xs font-medium text-slate-500">{item.mode}</span>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{item.organizer}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Prize / Benefit</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.prize}</p>
            </div>

            <Link
              to={`/user/competitions/${item.id}`}
              className="mt-4 inline-flex w-full justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
            >
              Explore Opportunity
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UserCompetitions;
