export type CryptoKeys = 'btc' | 'ton' | 'not' | 'usdt'
export type ValuteKeys = 'ozon' | 'sber' | 'yandex' | 'tbank' | 'sbp'
export type Others = 'stars'
export type Selected = {
  title: string,
  enabled: boolean,
  key: CryptoKeys | Others | ValuteKeys,
  image: string,
  type: 'valute' | 'crypto' | 'telegram',
  options: ['sell', 'buy']
}
export type Status =  'created' | 'rejected' | 'done' | 'timeout' | 'payed'
export type IActiveTransaction = {
  id: number,
  sell: CryptoKeys | ValuteKeys,
  buy: CryptoKeys | ValuteKeys | Others,
  countSell: number,
  countBuy: number,
  address: string,
  memo: string,
  net: string,
  telegram: string,
  status: Status
}

export interface IAdmin {key: string, privileges: string}

export type IExchangerSettings = {
  adminHashes: IAdmin[],
  maxLimit: number,
  minLimit: number,
  starsRate: number,
  notificationType: string,
  showOffer: boolean,
  isSiteEnable: boolean
  disableSiteReason: string
  highloadImage: string

}

export type IActiveTransactionWithKey = IActiveTransaction & {key?: string}

