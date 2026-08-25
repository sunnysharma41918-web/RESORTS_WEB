export function filterRooms(rooms, propertyId = null) {
  if (!rooms) return [];
  if (!propertyId) return rooms;
  return rooms.filter((r) => r.propertyId === propertyId);
}
