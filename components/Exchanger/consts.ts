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

export const VAT_PLUS_BIG: number = 1.07
export const VAT_PLUS_SMALL: number = 1.04
export const VAT_MINUS_BIG: number = 0.93
export const VAT_MINUS_SMALL: number = 0.96


export const countMaskaOptions = {
  mask  : '0.2',
  tokens: {
    0: { pattern : /[0-9]/, optional: true, multiple: true },
    2: { pattern : /[0-9]/, optional: true, multiple: true },
  }
};

export const memoMaskaOptions = {
  mask  : '9',
  tokens: {
    9: { pattern : /[0-9]/, repeated: true },
  }
}
