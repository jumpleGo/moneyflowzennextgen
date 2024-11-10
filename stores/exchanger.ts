import { computed, ref } from 'vue'
import type { IActiveTransactionWithKey, IExchangerSettings, Selected, Status } from '~/stores/exchangerTypes'


export const useExchangerStore = defineStore('exchanger', () => {
  const coins = ref<Selected[]>([])
  const valutes = ref<Selected[]>([])
  const activeTransaction = ref<IActiveTransactionWithKey | null>(null)
  const updateStatus = (status: Status) => activeTransaction.value!.status = status
  const time = ref()
  const selectedSell = ref<Partial<Selected>>({})
  const selectedBuy = ref<Partial<Selected>>({})

  const clearSelected = () => {
    selectedSell.value = {}
    selectedBuy.value = {}
  }

  const exchangerSettings = ref<IExchangerSettings>({
    adminHash: '',
    maxLimit: 0,
    minLimit: 0,
    notificationType: '',
    showOffer: false
  })


  const enabledCoins = computed<Selected[]>(() => {
    return Object.values(coins.value).filter(item => item.enabled)
  })

  const enabledValutes = computed<Selected[]>(() => {
    return Object.values(valutes.value).filter(item => item.enabled)
  })

  const valutesForSell = computed<Selected[]>(() => {
    return enabledValutes.value?.filter(item => item.options?.includes('sell')) || []
  })
  const valutesForBuy = computed<Selected[]>(() => {
    return enabledValutes.value?.filter(item => item.options?.includes('buy')) || []
  })




  const isUSDTSell = computed(() => selectedSell.value.key === 'usdt')
  const isUSDTBuy = computed(() => selectedBuy.value.key === 'usdt')

  const isCryptoForSell = computed(() => {
    return selectedSell.value?.key && Object.values(enabledCoins.value)?.map((i: Selected) => i.key).includes(selectedSell.value?.key)
  })
  const isValuteForSell = computed(() => {
    return selectedSell.value?.key && Object.values(enabledValutes.value)?.map((i: Selected ) => i.key).includes(selectedSell.value?.key)
  })
  const isCryptoForBuy = computed(() => {
    return selectedBuy.value?.key && Object.values(enabledCoins.value)?.map((i: Selected) => i.key).includes(selectedBuy.value.key)
  })
  const isValuteForBuy = computed(() => {
    return selectedBuy.value?.key && Object.values(enabledValutes.value)?.map((i: Selected ) => i.key).includes(selectedBuy.value?.key)
  })

  const isSelectedBothItem = computed(() => selectedBuy.value?.key && selectedSell.value?.key)



  return { clearSelected, exchangerSettings, time, valutes, coins, selectedSell, selectedBuy, enabledCoins, enabledValutes, isUSDTSell, isCryptoForSell, isValuteForSell, isSelectedBothItem, activeTransaction, isValuteForBuy, isCryptoForBuy, valutesForSell, valutesForBuy, updateStatus, isUSDTBuy}
})
