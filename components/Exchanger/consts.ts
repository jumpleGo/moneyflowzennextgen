export const usdtNet = [
  {
    name: 'TON',
    key: 'ton'
  },
  {
    name: 'TRC-20',
    key: 'trc20'
  },
  {
    name: 'Optimism',
    key: 'op'
  },
  {
    name: 'SOL',
    key: 'sol'
  }
]

export const VAT_PLUS_BIG: number = 1.1
export const VAT_PLUS_SMALL: number = 1.05
export const VAT_MINUS_BIG: number = 0.9
export const VAT_MINUS_SMALL: number = 0.95

export const countMaskaOptionsSmall = {
  mask: '0.1',
  tokens: {
    0: { pattern: /0|[1-9][0-9]?/, optional: false, multiple: true }, // Целая часть (0, 1-99)
    1: { pattern: /\d/, optional: true, multiple: true },             // Одна цифра в дробной части
  },
};

export const countMaskaOptionsBig = {
  mask  : '1.2',
  tokens: {
    1: { pattern : /[1-9]/, optional: true, multiple: true },
    2: { pattern : /[0-9]/, optional: true, multiple: true },
  }
};

export const memoMaskaOptions = {
  mask  : '9',
  tokens: {
    9: { pattern : /[0-9]/, repeated: true },
  }
}
