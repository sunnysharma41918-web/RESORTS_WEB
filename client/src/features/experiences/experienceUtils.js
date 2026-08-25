export function filterExperiences(experiences, category = 'all') {
  if (!experiences) return [];
  if (category === 'all') return experiences;
  return experiences.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}
