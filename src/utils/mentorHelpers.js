export function mergeMentorsWithSamples(liveMentors, sampleMentors) {
  const byEmail = new Map();

  [...sampleMentors, ...liveMentors].forEach((mentor) => {
    const key = mentor?.email || mentor?.id || mentor?.name;
    if (!key) return;
    byEmail.set(key, mentor);
  });

  return Array.from(byEmail.values());
}
