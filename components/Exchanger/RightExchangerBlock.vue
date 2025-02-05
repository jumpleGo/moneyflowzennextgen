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
            :error="v$.count.$dirty && !countValidate"
            placeholder="Сумма обмена"
            :label="sumLabel">
            <template v-if="v$.count.$dirty && !countValidate" #error>
              {{ (!countValidate && translates.limit(isCryptoForSell ? minmaxLimit[selectedSell.key] : minmaxLimit[selectedBuy.key])) }}
            </template>
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
         <div class="exchanger__inputs__address">
           <AppInput
             v-if="!isStarsBuy"
             v-model="v$.address.$model"
             paste
             class="exchanger__inputs__address__address-input"
             :error="v$.address.$error"
             :isOKAddress="isOKAddress"
             :isAddressChecked="isAddressChecked"
             id="address"
             :placeholder="placeholderAddress"
             :label="placeholderAddress">
             <template v-if="v$.address.$error" #error><span>{{ v$.address.$error && translates.address }}</span></template>
           </AppInput>
           <AppInput
             v-if="isMemoShow"
             v-model="v$.memo.$model"
             :maska-options="memoMaskaOptions"
             class="exchanger__inputs__address__memo"
             :error="v$.memo.$error"
             id="memo"
             placeholder="Memo"
             label="Memo">
             <template v-if="v$.memo.$error" #error>{{ v$.memo.$error && translates.memo }}</template>
           </AppInput>
         </div>
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
import { computed, type ComputedRef, reactive } from 'vue'
import type { IPrices } from '~/types/pages/exchangerTypes'
import { translates } from '../../helpers/i18n'
import {
  memoMaskaOptions,
  usdtNet
} from '~/components/Exchanger/consts'

import AppBackButton from '~/components/App/AppBackButton.vue'
import { Setter } from '~/helpers/setter'
import type { CryptoKeys, IActiveTransaction } from '~/stores/exchangerTypes'
import { storeToRefs } from 'pinia'
import { useFactor } from '~/composables/exchanger/useFactor'
import { useExchangerSettings } from '~/composables/exchanger/useExchanger'
import type { IModel } from '~/components/Exchanger/types'
import { useValidationByRules } from '~/composables/exchanger/useValidationByRules'
import { calculateExpirationTime } from '~/components/Exchanger/helpers/exchanger'
import { sendNotification } from '~/components/Exchanger/helpers/notificationSender'
import { checkTonAddress, checkTronAddress } from '~/api/checkAddress'


const emit = defineEmits<{
  (e: 'back'): void
}>()

const {exchangerSettings, minmaxLimit, priceUsd, isTonForBuy, pricesList, time, selectedBuy, selectedSell, isStarsBuy, isTonForSell, isCryptoForSell, isSelectedBothItem, activeTransaction} = storeToRefs(useExchangerStore())

const model = reactive<IModel>({
  memo: '',
  net: '',
  count: 1,
  telegram: '',
  address: '',
  reset: function () {
    this.address = '';
    this.memo = '';
    this.count = 1;
  }
});

const {
  maskaOptions,
  netModel,
  placeholderAddress,
  calculateItem,
  isMemoShow,
  isNetShow,
  sumLabel,
  prices
} = useExchangerSettings(model)

const {v$} = useValidationByRules(model)

const {factor, calculateFactor} = useFactor(model)
const isOKAddress = shallowRef(false)
const isAddressChecked = shallowRef(false)


const enabledButton = computed(() => !v$.value.$errors.length && isCountValid.value && model.telegram)

const isCountValid = computed(() => {
  const cryptoPrice = prices.value[(selectedSell.value.key as CryptoKeys)]

  if (isStarsBuy.value && isTonForSell.value) {
    const tonCount = model.count * cryptoPrice
    return tonCount >= minmaxLimit.value['stars'].min && tonCount <= minmaxLimit.value['stars'].max
  }

  const valueToCheck = isCryptoForSell.value
    ? calculateAmount.value
    : model.count;

  if (isCryptoForSell.value) {
    return valueToCheck >= minmaxLimit.value[selectedSell.value?.key]?.min && valueToCheck <= minmaxLimit.value[selectedSell.value?.key]?.max;
  }

  return valueToCheck >= minmaxLimit.value[selectedBuy.value?.key]?.min && valueToCheck <= minmaxLimit.value[selectedBuy.value?.key]?.max;
})

const countValidate = computed(() => model.count > 0 && isCountValid.value);

const withVat = computed<IPrices>(() => ({
  ton: prices.value.ton*factor.value,
  not: prices.value.not*factor.value,
  usdt: prices.value.usdt*factor.value,
}))

const calculateAmount: ComputedRef<number> = computed(() => {
  if (!prices.value?.usdt) return 0
  const starsRate = exchangerSettings.value?.starsRate || 0.65;

  if (isStarsBuy.value) {
    const symbolPrice = pricesList.value.find(
      (item) => item.symbol === `${selectedSell.value?.key?.toUpperCase()}USDT`
    )?.price || 0;

    return isTonForSell.value
      ? +(model.count * symbolPrice / starsRate).toFixed(0)
      : Math.floor(model.count / priceUsd.value / starsRate);
  }

  if (!selectedSell.value?.key || !selectedBuy.value?.key) return 0;

  const keyForVat: CryptoKeys = isCryptoForSell.value ? (selectedSell.value?.key as CryptoKeys) : (selectedBuy.value?.key as CryptoKeys)
  const vatValue = withVat.value[keyForVat] || 1;

  return isCryptoForSell.value
    ? +(model.count * vatValue).toFixed(2)
    : +(model.count / vatValue).toFixed(selectedBuy.value?.key === 'btc' ? 6 : 2);
})


const additionalText  = computed<string>(() => `Вы получите: ${new Intl.NumberFormat('ru-RU').format(calculateAmount.value)} ${calculateItem.value}`)

watch(() => model.count, () => calculateFactor(calculateAmount.value))
watch(() => [selectedSell.value, selectedBuy.value], () => {
  model.reset()
  isOKAddress.value = false
  isAddressChecked.value = false
})
watch(() => model.address, async (address) => {
  if (!address) {
    isOKAddress.value = false
    isAddressChecked.value = false
  } else {
    if(isTonForBuy.value || model.net === 'ton'){
      isOKAddress.value = await checkTonAddress(address)
      isAddressChecked.value = true
    }
    if (model.net === 'trc20') {
      isOKAddress.value = await checkTronAddress(model.address)
      isAddressChecked.value = true
    }
  }
})
watch(() => model.net, async (net) => {
  if (!model.address) return
  if (net === 'ton' && model.address) {
    isOKAddress.value = await checkTonAddress(model.address)
    isAddressChecked.value = true
  } else if (net === 'trc20') {
    isOKAddress.value = await checkTronAddress(model.address)
    isAddressChecked.value = true
  } else {
    isOKAddress.value = false
    isAddressChecked.value = false
  }
})
onMounted(() => calculateFactor(calculateAmount.value))

const validateForm = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    await sendForm()
  }
}

const sendForm = async () => {
  const payload = createPayload();
  const expirationTime = calculateExpirationTime();

  try {
    await Setter.pushToDb('transactions', payload).then((data) => {
      handleTransactionSuccess(data, payload, expirationTime);
    })
    if (!process.dev) sendNotification(payload);
  } catch (err) {
    console.error('Ошибка при отправке формы:', err);
  }
};

const createPayload = (): IActiveTransaction => ({
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
  status: 'created',
});

const handleTransactionSuccess = (
  data: Record<string, any>,
  payload: IActiveTransaction,
  expirationTime: Date
) => {
  const transactionData = { ...payload, key: data.key };

  window.localStorage.setItem('transaction', JSON.stringify(transactionData));
  window.localStorage.setItem('expTime', expirationTime.toString());

  time.value = expirationTime;
  activeTransaction.value = transactionData;
};
</script>
<style lang="scss" scoped>
@import '../../style/exchanger/rightExchangerBlock.scss';
</style>