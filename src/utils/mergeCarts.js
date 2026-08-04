export function mergeCarts(serverCart, localCart) {
  const merged = new Map();

  [...serverCart, ...localCart].forEach((item) => {
    const existing = merged.get(item.id);

    if (!existing) {
      merged.set(item.id, item);
    } else {
      merged.set(item.id, {
        ...existing,
        quantity: Math.max(existing.quantity, item.quantity),
      });
    }
  });

  return [...merged.values()];
}
