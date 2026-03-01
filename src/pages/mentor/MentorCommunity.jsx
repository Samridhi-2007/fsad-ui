function MentorCommunity() {
  const communityItems = [
    {
      id: 1,
      title: "Mentor Collaboration Forum",
      description: "Discuss mentoring strategies and learner support.",
      members: 142,
    },
    {
      id: 2,
      title: "Weekly Project Review Group",
      description: "Review intern project submissions every Friday.",
      members: 89,
    },
    {
      id: 3,
      title: "Career Guidance Circle",
      description: "Share placement insights and mock interview plans.",
      members: 77,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Mentor Community</h1>
        <p className="mt-1 text-slate-600">
          Participate in mentor groups and collaborate with peers.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {communityItems.map((item) => (
          <article key={item.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{item.description}</p>
            <p className="text-sm text-slate-500 mt-3">{item.members} members</p>
            <button
              type="button"
              className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              Open Community
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MentorCommunity;
