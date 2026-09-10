export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export function formatPriceFrom(value: number) {
  return `от ${formatPrice(value)}`;
}
