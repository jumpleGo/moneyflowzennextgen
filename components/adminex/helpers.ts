import type { IActiveTransaction } from '~/stores/exchangerTypes'

export const  totalIncome = (transactions: Record<string, IActiveTransaction>) => {
  return Object.values(transactions)
    .filter(item => item.status === 'payed')
    .reduce((acc, item) => {
      const rate = item.countSell < 3000 ? 1 / 10 : 4 / 100;

      // Условие для stars
      if (item.buy === 'stars') {
        acc[item.sell] = (acc[item.sell] || 0) + +item.countSell / 10;
      }
      // Условие для sber и tbank
      else if (['sber', 'tbank'].includes(item.sell)) {
        acc[item.sell] = (acc[item.sell] || 0) + +item.countSell * rate;
      }
      // Условие для остальных
      else {
        acc[item.sell] = (acc[item.sell] || 0) + +item.countSell * rate;
      }

      return acc;
    }, {});
}

export const  totalAmount = (transactions: Record<string, IActiveTransaction>) => {
  return Object.values(transactions)
    .filter(item => item.status === 'payed')
    .reduce((acc, item) => {
      if (['sber', 'tbank', 'sbp', 'ozon'].includes(item.sell)) {
        acc['RUB'] = (acc['RUB'] || 0) + +item.countSell
      } else {
        acc[item.sell] = (acc[item.sell] || 0) + +item.countSell
      }

      return acc;
    }, {});
}