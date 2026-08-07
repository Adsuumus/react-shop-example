export function formatPrice(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
