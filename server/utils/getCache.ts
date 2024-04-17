export default async (type: string, id?: string) => {
  // Use the correct storage
  const storage = useStorage(type);
  // Get the ids
  const ids = id ? [id] : await storage.getKeys();

  // If no ids given / found, return
  if (!ids.length) {
    return;
  }

  // Get all the cached items from the storage
  const items = await Promise.all(ids.map((id: string) => storage.getItem(id)));
  console.warn(`Cache hit for ${type}${id ? '#' + id : ''}`);

  // If there is only 1 item, just return that single item
  if (items.length === 1) {
    return items[0];
  }
  return items;
};
