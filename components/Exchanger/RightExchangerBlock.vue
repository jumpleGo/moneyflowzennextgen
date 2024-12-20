<template>
  <div :class="[{'--disabled-block': !isSelectedBothItem}]">
    <div class='exchanger__right__content-wrapper'>
      <div class="exchanger__right__content">
        <div class="exchanger__right__content--header">
          <AppBackButton @click="emit('back')" class="exchanger__right__content-back" />
          <div class="exchanger__content--title-wrapper">
            <h2 class="exchanger__content--title">Обмен <span>{{ selectedSell?.title || '...' }}</span></h2>
            <h2 class="exchanger__content--title">на <span>{{ selectedBuy?.title || '...' }}</span></h2>
          </div>
        </div>

       <div class="exchanger__inputs">
          <AppInput
            v-model="v$.count.$model"
            id="sum"
            :maska-options="maskaOptions"
            :error="!countValidate"
            placeholder="Сумма обмена"
            :label="sumLabel">
            <template v-if="!countValidate" #error>{{ (!countValidate && translates.limit(exchangerSettings)) }}</template>
            <span v-if="selectedBuy?.key && selectedSell?.key"> {{ additionalText }}</span>
          </AppInput>
          <AppInput
            v-model="v$.telegram.$model"
            :error="v$.telegram.$error"
            id="mail"
            placeholder="@user"
            label="Телеграм ник" >
            <template v-if="v$.telegram.$error" #error>{{ v$.telegram.$error && translates.telegram }}</template>
          </AppInput>
          <AppInput
            v-if="!isStarsBuy"
            v-model="v$.address.$model"
            paste
            :error="v$.address.$error"
            id="address"
            :placeholder="placeholderAddress"
            :label="placeholderAddress">
            <template v-if="v$.address.$error" #error><span>{{ v$.address.$error && translates.address }}</span></template>
          </AppInput>
          <AppInput
            v-if="isMemoShow"
            v-model="v$.memo.$model"
            :maska-options="memoMaskaOptions"
            :error="v$.memo.$error"
            id="memo"
            placeholder="memo"
            label="memo (необязательно)">
            <template v-if="v$.memo.$error" #error>{{ v$.memo.$error && translates.memo }}</template>
          </AppInput>
          <AppSelector
            v-if="isNetShow"
            v-model="netModel"
            :error="v$.net.$error"
            id="net"
            placeholder="сеть"
            :options="usdtNet" />
         <span v-if="isNetShow" class="tip">(комиссия оплачивается вами)</span>
        </div>
      </div>
      <AppButton title="создать заявку" :disabled="!enabledButton" @click="validateForm" />
      <NuxtLink v-if="(isTonForSell || isTonForBuy) && !isStarsBuy" to="https://t.me/mfz_official_crypto" target="_blank" class="exchanger__right__banner" >
        <nuxt-img :preload="{fetchPriority: 'high'}" class="exchanger__right__banner_img" src="https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/mfz_crypto.png?alt=media&token=48507781-be93-4815-9a12-11c966cf9fed" />
      </NuxtLink>
      <NuxtLink v-if="isStarsBuy" to="https://t.me/mfz_lostdogs" target="_blank" class="exchanger__right__banner" >
        <nuxt-img :preload="{fetchPriority: 'high'}" class="exchanger__right__banner_img" src="https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/mfz_lostdogs.png?alt=media&token=d1a846da-f5cf-4b65-892c-74c153ba4126" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
import AppInput from '~/components/App/AppInput.vue'
import { computed, type ComputedRef } from 'vue'
import type { IPrices, IVats } from '~/types/pages/exchangerTypes'
import { decimal, minLength, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { translates } from '../../helpers/i18n'
import type { IOption } from '~/components/App/types'
import {
  countMaskaOptionsNotStartsFromZero,
  countMaskaOptionsStartsFromZero, memoMaskaOptions,
  usdtNet
} from '~/components/Exchanger/consts'

import AppBackButton from '~/components/App/AppBackButton.vue'
import { Setter } from '~/helpers/setter'
import type { IActiveTransaction } from '~/stores/exchangerTypes'
import { storeToRefs } from 'pinia'
const mail = useMail()

const emit = defineEmits<{
  (e: 'back'): void
}>()

const {exchangerSettings, vats, priceUsd, isTonForBuy, pricesList, time, selectedBuy, selectedSell, isStarsBuy, isTonForSell, isCryptoForSell, isValuteForSell, isSelectedBothItem, activeTransaction, isUSDTBuy, isZeroAmountStarts} = storeToRefs(useExchangerStore())


const model = reactive({
  memo: '',
  net: '',
  count: 0,
  telegram: '',
  address: ''
})

const maskaOptions = computed(() => {
  return isZeroAmountStarts.value ? countMaskaOptionsStartsFromZero : countMaskaOptionsNotStartsFromZero
})

const netModel = computed({
  get: () => usdtNet.find(item => item.key === model.net) || {name: '', key: ''},
  set: (item: IOption) => model.net = item.key
})

const rubTransferValue = computed<number>(() => isCryptoForSell.value ? calculateAmount.value : model.count)
const rules = computed(() => {
  const ruleOptions = {
    memo: {minLength: minLength(6), decimal },
    count: { required, decimal },
    telegram: { required,  minLength: minLength(3)  },
  }

  if (!isStarsBuy.value) {
    ruleOptions.address ={ minLength: minLength(11), required }
  }

  if (isUSDTBuy.value) {
    ruleOptions.net = { required }
  }

  return ruleOptions
})

const v$ = useVuelidate(
  rules,
  model,
)

const countValidate = computed(() => model.count > 0 ? isCountValid.value : true )

const isCountValid = computed(() => {
  if (isStarsBuy.value) {
    if (isTonForSell.value) {
      return (model.count * prices.value[selectedSell.value.key]) >= exchangerSettings.value?.minLimit && (model.count * prices.value[selectedSell.value.key]) <= exchangerSettings.value?.maxLimit
    } else if (isValuteForSell.value) {
      return model.count  >= exchangerSettings.value?.minLimit && model.count <= exchangerSettings.value?.maxLimit
    }
  }
  else if (isCryptoForSell.value) {
    return rubTransferValue.value >= exchangerSettings.value?.minLimit && rubTransferValue.value <= exchangerSettings.value?.maxLimit
  } else if (isValuteForSell.value) {
   return model.count  >= exchangerSettings.value?.minLimit && model.count <= exchangerSettings.value?.maxLimit
  }
})


const enabledButton = computed(() => !v$.value.$errors.length && isCountValid.value && model.telegram)

const calculateItem = computed(() => {
  return selectedBuy.value?.type === 'valute' ? 'RUB' : selectedBuy.value?.key?.toUpperCase()
})

const isMemoShow = computed(() => {
  if (!selectedBuy.value?.key) return false
  return ['ton', 'not'].includes(selectedBuy.value?.key)
})
const isNetShow = computed(() => {
  if (!selectedBuy.value?.key) return false
  return selectedBuy.value?.key === 'usdt'
})

const sumLabel = computed(() => {
  if (isCryptoForSell.value || isValuteForSell.value) {
    return isCryptoForSell.value ? `Сумма (${selectedSell.value.key?.toUpperCase()})` : `Сумма (RUB)`
  }

  return 'Сумма'
})

const prices =  computed<IPrices>(() => {
  const usdt = priceUsd.value || 0
  const btc = (pricesList.value.find(item => item.symbol === 'BTCUSDT')?.price || 0) * usdt
  const ton = (pricesList.value.find(item => item.symbol === 'TONUSDT')?.price || 0) * usdt
  const not = (pricesList.value.find(item => item.symbol === 'NOTUSDT')?.price || 0) * usdt
  return {
    not,
    ton,
    usdt,
    btc,
  }
})

const factor = ref<number>(0)

const withVat = computed<IPrices>(() => ({
  ton: prices.value.ton*factor.value,
  not: prices.value.not*factor.value,
  usdt: prices.value.usdt*factor.value,
  btc: prices.value.btc*factor.value,
}))


const calculateAmount: ComputedRef<number> = computed(() => {
  if (!prices.value?.usdt) return 0
  if (isStarsBuy.value) {
    if (isTonForSell.value) {
      return (+model.count * (pricesList.value.find(item => item.symbol === `${selectedSell.value.key?.toUpperCase()}USDT`)?.price || 0) / exchangerSettings.value.starsRate).toFixed(0)
    } else if (isValuteForSell.value) {
      return Math.floor((+model.count / priceUsd.value / exchangerSettings.value.starsRate))
    }
  } else if (isCryptoForSell.value) {
    if (!selectedSell.value?.key) return 0
    return +(+model.count * withVat.value[selectedSell.value?.key]).toFixed(2)
  } else if (isValuteForSell.value) {
    if (!selectedBuy.value?.key) return 0
    return +(+model.count / withVat.value[selectedBuy.value?.key]).toFixed(selectedBuy.value.key === 'btc' ? 6 : 2)
  }
})



const placeholderAddress = computed(() => selectedBuy.value?.type === 'crypto' ? 'Адрес кошелька' : 'Телефон или номер карты')

const additionalText  = computed<string>(() => `Вы получите: ${new Intl.NumberFormat('ru-RU').format(calculateAmount.value)} ${calculateItem.value}`)
watch(() => [model.count, selectedSell.value, selectedBuy.value], () => calculateFactor())
onMounted(() => calculateFactor())

const validateForm = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    await sendForm()
  }
}
const calculateFactor = () => {
  if (isValuteForSell.value) {
    factor.value = model.count < 3000 ? vats.value?.VAT_PLUS_BIG : vats.value?.VAT_PLUS_SMALL
  } else {
    factor.value = calculateAmount.value < 3000 ? vats.value?.VAT_MINUS_BIG : vats?.value?.VAT_MINUS_SMALL
  }
}
const sendForm = async () => {
  const payload: IActiveTransaction = {
    sell: selectedSell.value?.key,
    buy: selectedBuy.value?.key,
    countSell: model.count,
    countBuy: calculateAmount.value,
    address: model.address,
    id: +new Date(),
    memo: model.memo,
    factor: factor.value,
    net: model.net,
    telegram: model.telegram.startsWith('@') ? model.telegram.slice(1) : model.telegram,
    status: 'created'
  }

  const currentTime = new Date()
  currentTime.setMinutes(currentTime.getMinutes() + 15)

  await Setter.pushToDb('transactions', payload).then((data) => {
    window.localStorage.setItem('transaction', JSON.stringify({ ...payload, key: data.key }))
    window.localStorage.setItem('expTime', currentTime.toString())

    time.value = currentTime
    activeTransaction.value = { ...payload, key: data.key }

    if (!process.dev) {
      mail.send({
        config: 'main',
        from: `Обмен ${isStarsBuy.value ? 'ЗВЕЗД' : ''} на MFZ-Exchanger`,
        subject: 'MFZ-Exchanger',
        text: `Новый обмен ${isStarsBuy.value ? 'ЗВЕЗД' : ''} от @${activeTransaction.value?.telegram} \n ${payload.sell.toUpperCase()} ${payload.countSell} → ${payload.buy.toUpperCase()} ${payload.countBuy} \n https://moneyflowzen.ru/adminex`
      })
    }
    // if (isStarsBuy.value) {
    //   mail.send({
    //     config: 'managerStars',
    //     from: `Обмен ЗВЕЗД на MFZ-Exchanger`,
    //     subject: 'MFZ-Exchanger',
    //     text: `Новый обмен ЗВЕЗД от @${activeTransaction.value?.telegram}, на ${payload.countBuy} STARS`
    //   })
    // }
  }).catch((err) => {
    console.log('err')
  })
}

</script>
<style lang="scss" scoped>
.exchanger__content--title {
  div {
    flex-wrap: nowrap;
  }
}
.exchanger__inputs {
  display: flex;
  flex-direction: column;
  gap: 10px
}
.exchanger__right__content-back {
  top: 47px;
  left: 20px;
}
.exchanger__right__content-wrapper {
  padding: 0 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  @include mobile-all {
    padding: 0 20px;
  }
}

.exchanger__right {
  &__banner {
    width: fit-content;
    margin-top: 20px;
    &_img {
      border-radius: 10px;
      width: 100%
    }
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;

    &--header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 40px;
    }
  }
}

.tip {
  font-size: 11px;
  color: gray
}

</style>