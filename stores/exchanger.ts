import { ref } from 'vue'


export type Selected = {
  title: string,
  image: string,
  key: 'btc' | 'ton' | 'not' | 'usdt',
  type: 'valute' | 'crypto'
}

export const useExchangerStore = defineStore('exchanger', () => {
  const coins = ref<Selected[]>([])
  const valutes = ref<Selected[]>([])

  const selectedSell = ref<Partial<Selected>>({})
  const selectedBuy = ref<Partial<Selected>>({})

  const activeTransaction = ref<string>('')

  return { valutes, coins, selectedSell, selectedBuy}
})
