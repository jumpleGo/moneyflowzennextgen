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


export const countMaskaOptionsStartsFromZero = {
  mask  : '0.2',
  tokens: {
    0: { pattern : /[0-9]/, optional: true, multiple: true },
    2: { pattern : /[0-9]/, optional: true, multiple: true },
  }
};

export const countMaskaOptionsNotStartsFromZero = {
  mask  : '0.2',
  tokens: {
    0: { pattern : /[1-9]/, optional: true, multiple: true },
    2: { pattern : /[0-9]/, optional: true, multiple: true },
  }
};

export const memoMaskaOptions = {
  mask  : '9',
  tokens: {
    9: { pattern : /[0-9]/, repeated: true },
  }
}
