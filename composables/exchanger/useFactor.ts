import { storeToRefs } from 'pinia'
import type { IModel } from '~/components/Exchanger/types'

export const useFactor = (model: IModel) => {
  const { vats, isValuteForSell, selectedSell, selectedBuy} = storeToRefs(useExchangerStore())
  const defaultValue = {
    VAT_BIG: 1,
    VAT_SMALL: 1
  }
  const factor = ref<number>(1)

  const calculateFactor = (calculateAmount: number) => {
    if (isValuteForSell.value) {
      const {VAT_BIG = 1, VAT_SMALL = 1} = vats.value?.[selectedBuy.value?.key] || defaultValue
      factor.value = 1 + (+model.count < 3000 ? VAT_BIG/100 : VAT_SMALL/100)
    } else {
      const {VAT_BIG, VAT_SMALL } = vats.value?.[selectedSell.value?.key] || defaultValue
      factor.value = 1 - (calculateAmount < 3000 ? VAT_BIG/100 : VAT_SMALL/100)
    }
  }
  return {
    factor,
    calculateFactor
  }
}