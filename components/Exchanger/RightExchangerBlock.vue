<template>
  <div class="exchanger__right" :class="[{'--disabled-block': !isSelectedBothItem}]">
    <div class="exchanger__right__content">
      <h2 class="exchanger__right__content--title">Обмен <span>{{ selectedSell.title || '...' }}</span> на <span>{{ selectedBuy.title || '...' }}</span></h2>

      <div class="exchanger__inputs">
        <AppInput v-model="count" id="sum" placeholder="сумма обмена" label="Сумма">
          <span v-if="selectedBuy.key && selectedSell.key"> {{ additionalText }}</span>
        </AppInput>
        <AppInput v-model="email" id="mail" :rules="emailAttrs" placeholder="почта для связи" label="Почта (необязательно)" />
        <AppInput v-model="phone" id="num" :placeholder="placeholderAddress" :label="placeholderAddress" />
        <AppInput v-if="isMemoShow" v-model="memo" id="memo" placeholder="memo" label="memo (необязательно)" />
        <AppInput v-if="isNetShow" v-model="net" id="net" placeholder="сеть" label="сеть" />
      </div>
    </div>
    <AppButton title="продолжить"></AppButton>

  </div>
</template>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
import AppInput from '~/components/App/AppInput.vue'
import { computed, ref } from 'vue'
import type { IPrices } from '~/types/pages/exchangerTypes'
import { binance } from '~/api'
const { $databaseRef } = useNuxtApp()
import { Getter } from '~/helpers/getter'
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const schema = yup.object({
  email: yup.string().required().email(),
});

const { defineField, errors } = useForm({
  validationSchema: schema,
});
const [email, emailAttrs] = defineField('email');


const {selectedBuy, selectedSell} = storeToRefs(useExchangerStore())

const {data} = useAsyncData(async () => {
  const { data: prices } = await binance.getPriceByTickers()
  const { exchangerSettings } = await Getter.getFromDB($databaseRef, 'exchangerSettings/')

  return {
    prices,
    exchangerSettings
  }
})

const phone = ref<string>('')
const memo = ref<string>('')
const net = ref<string>('')
const count = ref<number>(0)



const calculateItem = computed(() => {
  return selectedBuy.value.type === 'valute' ? 'RUB' : selectedBuy.value.key?.toUpperCase()
})

const isMemoShow = computed(() => {
  if (!selectedBuy.value?.key) return false
  return ['ton', 'not'].includes(selectedBuy.value?.key)
})
const isNetShow = computed(() => {
  if (!selectedBuy.value?.key) return false
  return selectedBuy.value?.key === 'usdt'
})

const prices =  computed<IPrices>(() => {
  const usdt = data.value?.prices.find(item => item.symbol === 'USDTRUB')?.price || 0
  const btc = data.value?.prices.find(item => item.symbol === 'BTCRUB')?.price || 0
  const ton = (data.value?.prices.find(item => item.symbol === 'TONUSDT')?.price || 0) * usdt
  const not = (data.value?.prices.find(item => item.symbol === 'NOTUSDT')?.price || 0) * usdt

  return {
    not,
    ton,
    usdt: +usdt,
    btc: +btc
  }
})

const vat15 = computed<IPrices>(() => ({
  ton: prices.value.ton*1.15,
  not: prices.value.not*1.15,
  usdt: prices.value.usdt*1.15,
  btc: prices.value.btc*1.15,
}))

const vat7 = computed<IPrices>(() => ({
  ton: prices.value.ton*1.07,
  not: prices.value.not*1.07,
  usdt: prices.value.usdt*1.07,
  btc: prices.value.btc*1.07,
}))

const pricesValues = computed(() => {
  if (!selectedSell.value.key) return prices.value
  if (selectedBuy.value.type === 'valute') {
    return +count.value*prices.value[selectedSell.value.key] < 2000 ? vat15.value :vat7.value
  } else {
    return +count.value < 2000 ? vat15.value :vat7.value
  }
})

const calculateAmount = computed(() => {
  if (selectedBuy.value.type === 'valute') {
    if (!selectedSell.value?.key) return 0
    return (+count.value*pricesValues.value[selectedSell.value?.key]).toFixed(2)
  } else {
    if (!selectedBuy.value?.key) return
    return (+count.value/pricesValues.value[selectedBuy.value?.key]).toFixed(selectedBuy.value.key === 'btc' ? 6 : 2)
  }
})

const isSelectedBothItem = computed(() => selectedBuy.value.key && selectedSell.value.key)

const placeholderAddress = computed(() => selectedBuy.value.type === 'crypto' ? 'адрес кошелька' : 'телефон или номер карты')

const additionalText  = computed(() => `Вы получите: ${calculateAmount.value} ${calculateItem.value}`)

</script>
<style lang="scss" scoped>
.exchanger__inputs {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.exchanger__right {
  color: black;
  z-index: 1;
  background: rgba(255,255,255, 0.9);
  box-shadow: 0px 0px 36px -2px rgba(254,190,22,1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  width: calc(50vw - 300px);
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.exchanger__right {
  flex-direction: column;
  justify-content: unset;
  padding: 60px 40px;
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;

    &--title {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 40px;
      font-weight: 500;

      span {
        border-bottom: 4px dashed $brand_yellow;
        font-weight: 600;
      }
    }
  }
}

</style>