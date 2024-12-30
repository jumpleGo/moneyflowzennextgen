import { storeToRefs } from 'pinia'
import type { IModel } from '~/components/Exchanger/types'

export const useFactor = (model: IModel) => {
  const { vats, isValuteForSell} = storeToRefs(useExchangerStore())

  const factor = ref<number>(1)

  const calculateFactor = (calculateAmount: number) => {
    if (isValuteForSell.value) {
      factor.value = +model.count < 3000 ? vats.value?.VAT_PLUS_BIG : vats.value?.VAT_PLUS_SMALL
    } else {
      factor.value = calculateAmount < 3000 ? vats.value?.VAT_MINUS_BIG : vats?.value?.VAT_MINUS_SMALL
    }
  }
  return {
    factor,
    calculateFactor
  }
}