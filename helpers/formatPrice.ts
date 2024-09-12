interface FormatPriceOptions {
  separator: string,
  fraction: number,
  isRound: boolean
  direction: 'up' | 'down'
}
export const formatPrice = (value: unknown, options?: FormatPriceOptions): string => {
  let priceNumber: number = 0;

  const separator = options?.separator ?? ' ';
  const fraction  = Math.pow(10, options?.fraction ?? 2);
  const isRound   = options?.isRound ?? true;
  const direction = options?.direction || 'down';

  // Приводим к числу
  priceNumber = +value

  // Округляем
  if (isRound) {
    const roundFn = direction === 'down' ? Math.floor : Math.ceil;
    priceNumber   = roundFn(priceNumber * fraction) / fraction;
  }

  // Форматируем по разрядам
  return priceNumber.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
};