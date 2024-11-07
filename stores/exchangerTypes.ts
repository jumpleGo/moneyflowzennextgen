export type CryptoKeys = 'btc' | 'ton' | 'not' | 'usdt'
export type ValuteKeys = 'ozon' | 'sber' | 'yandex' | 'tbank'
export type Selected = {
  title: string,
  enabled: boolean,
  key: CryptoKeys,
  image: string,
  type: 'valute' | 'crypto',
  options: ['sell', 'buy']
}
export type Status =  'created' | 'rejected' | 'done' | 'timeout' | 'payed'
export type IActiveTransaction = {
  id: number,
  sell: CryptoKeys | ValuteKeys,
  buy: CryptoKeys | ValuteKeys,
  countSell: number,
  countBuy: number,
  address: string,
  memo: string,
  net: string,
  telegram: string,
  status: Status
}

export type IExchangerSettings = {
  adminHash: string,
  maxLimit: number,
  minLimit: number,
  notificationType: string,
  showOffer: boolean,

}

export type IActiveTransactionWithKey = IActiveTransaction & {key?: string}

