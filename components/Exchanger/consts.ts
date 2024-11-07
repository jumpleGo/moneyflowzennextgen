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

export const countMaskaOptions = {
  mask  : '91.00',
  tokens: {
    9: { pattern : /[1-9]/},
    1: { pattern : /[0-9]/, optional: true, multiple: true},
    0: { pattern : /[0-9]/, multiple: true },
  }
};

export const memoMaskaOptions = {
  mask  : '9',
  tokens: {
    9: { pattern : /[0-9]/, repeated: true },
  }
}
