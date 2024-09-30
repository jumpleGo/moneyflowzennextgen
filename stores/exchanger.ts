import { computed, ref } from 'vue'

export type CryptoKeys = 'btc' | 'ton' | 'not' | 'usdt'
export type ValuteKeys = 'ozon' | 'sber' | 'yandex' | 'tbank'
export type Selected = {
  title: string,
  enabled: boolean,
  key: CryptoKeys,
  image: string,
  type: 'valute' | 'crypto'
}
type Status =  'created' | 'rejected' | 'done' | 'timeout' | 'payed'
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

type IActiveTransactionWithKey = IActiveTransaction & {key?: string}


export const useExchangerStore = defineStore('exchanger', () => {
  const coins = ref<Selected[]>([])
  const valutes = ref<Selected[]>([])
  const activeTransaction = ref<IActiveTransactionWithKey | null>(null)
  const updateStatus = (status: Status) => activeTransaction.value!.status = status
  const time = ref()

  const enabledCoins = computed<Record<string, Selected >>(() => {
    return Object.values(coins.value).filter(item => item.enabled).reduce((acc, item) => {
      acc[item.key] = item
      return acc
    }, {})
  })

  const enabledValutes = computed<Record<string, Selected >>(() => {
    return Object.values(valutes.value).filter(item => item.enabled).reduce((acc, item) => {
      acc[item.key] = item
      return acc
    }, {})
  })


  const selectedSell = ref<Partial<Selected>>({})
  const selectedBuy = ref<Partial<Selected>>({})

  const isUSDTSell = computed(() => selectedSell.value.key === 'usdt')
  const isCryptoForSell = computed(() => {
    return selectedSell.value?.key && Object.values(enabledCoins.value)?.map((i: Selected) => i.key).includes(selectedSell.value?.key)
  })
  const isValuteForSell = computed(() => {
    return selectedSell.value?.key && Object.values(enabledValutes.value)?.map((i: Selected ) => i.key).includes(selectedSell.value?.key)
  })
  const isCryptoForBuy = computed(() => {
    return selectedBuy.value?.key && Object.values(enabledCoins.value)?.map((i: Selected) => i.key).includes(selectedBuy.value?.key)
  })
  const isValuteForBuy = computed(() => {
    return selectedBuy.value?.key && Object.values(enabledValutes.value)?.map((i: Selected ) => i.key).includes(selectedBuy.value?.key)
  })

  const isSelectedBothItem = computed(() => selectedBuy.value.key && selectedSell.value.key)

  const exchangerSettings = ref<Record<string, any>>()

  return { exchangerSettings, time, valutes, coins, selectedSell, selectedBuy, enabledCoins, enabledValutes, isUSDTSell, isCryptoForSell, isValuteForSell, isSelectedBothItem, activeTransaction, isValuteForBuy, isCryptoForBuy, updateStatus}
})
