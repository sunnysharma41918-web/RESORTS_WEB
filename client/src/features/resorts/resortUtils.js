export function filterResorts(resorts, filter = 'all') {
  if (!resorts) return [];
  if (filter === 'all') return resorts;
  if (filter === 'featured') return resorts.filter((r) => r.featured);
  return resorts.filter((r) =>
    r.location.toLowerCase().includes(filter.toLowerCase()) ||
    (r.region && r.region.toLowerCase().includes(filter.toLowerCase()))
  );
}

export function sortResorts(resorts, sortBy = 'default') {
  if (!resorts) return [];
  const copy = [...resorts];
  if (sortBy === 'alphabetical') {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === 'rating') {
    return copy.sort((a, b) => b.rating - a.rating);
  }
  return copy;
}
