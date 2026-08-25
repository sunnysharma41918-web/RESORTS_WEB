export function filterGallery(items, category = 'All') {
  if (!items) return [];
  if (category === 'All') return items;
  return items.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}
