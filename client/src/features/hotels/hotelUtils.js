export function filterHotels(hotels, filter = 'all') {
  if (!hotels) return [];
  if (filter === 'all') return hotels;
  if (filter === 'featured') return hotels.filter((h) => h.featured);
  return hotels.filter((h) =>
    h.location.toLowerCase().includes(filter.toLowerCase()) ||
    h.city.toLowerCase().includes(filter.toLowerCase())
  );
}

export function sortHotels(hotels, sortBy = 'default') {
  if (!hotels) return [];
  const copy = [...hotels];
  if (sortBy === 'alphabetical') {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === 'rating') {
    return copy.sort((a, b) => b.rating - a.rating);
  }
  return copy;
}
