<template>
  <div>
    <div v-if="activeTransaction && activeTransaction?.status === 'created'" class="transaction__block-wrapper">
      <div class="transaction__block">
        <div class="exchanger__content--title-wrapper">
            <div  class="exchanger__content--title">
              Обмен {{ activeTransaction.countSell }}
              <span>{{ activeTransaction.sell }}</span>
            </div>
            <div  class="exchanger__content--title">
              на {{ activeTransaction.countBuy }} <span>{{ activeTransaction.buy }}</span>
            </div>
        </div>
        <div class="transaction__block--transactionId" >
          <span @click="copy($event, activeTransaction.id)">
            #{{activeTransaction.id}}
          </span>
        </div>
        <div class="transaction__block-payment-action">
          <h3>Переведите {{ activeTransaction.countSell }} {{ isValuteForSell ? `RUB ${activeTransaction.sell.toUpperCase()}` : activeTransaction.sell.toUpperCase() }} {{ activeTransaction.sell === 'usdt' ? '(TON)' : '' }} по реквизитам:</h3>
          <span>комментарий к переводу указывать не нужно!</span>
          <i v-if="isSBPSell" class="transaction__block-payment-action_sbp_tip">Перевод должен быть сделать только на банк OZON или Yandex. <br> В ином случае платеж обработан не будет.</i>
          <div class="transaction__block-payment-wrapper">
            <div v-if="isOkxPayment" class="transaction__block-payment-data">
              <span class="transaction__block-payment-data--address" @click="copy($event, uids['okx'])">OKX UID: {{ uids['okx']}}</span>
              <span class="transaction__block-payment-data--address" @click="copy($event, uids['bybit'])">BYBIT UID: {{ uids['bybit'] }}</span>
              <span>(копируется нажатием)</span>
            </div>
            <div v-else class="transaction__block-payment-data">
              <span v-if="getPayment?.address" class="transaction__block-payment-data--address" @click="copy($event, getPayment.address)">{{ getPayment?.address }}</span>
              <span v-if="getPayment?.memo" @click="copy($event, getPayment.memo)">мемо: <span class="transaction__block-payment-data--memo">{{ getPayment.memo }}</span></span>
              <span>(копируется нажатием)</span>
            </div>

            <div v-if="isTonForSell || isUSDTSell" class="transaction__block-button-okx">
              <AppButton size="xs" :title="isOkxPayment ? 'вернуться' : 'я оплачиваю с OKX/BYBIT' " @click="isOkxPayment = !isOkxPayment"/>
            </div>
          </div>
          <h4>И подтвердите оплату, нажав кнопку "оплачено"</h4>
          <span>по срочным вопросам: <a href="https://t.me/mfz_owner" target="_blank">@mfz_owner</a></span>
        </div>

      </div>
      <div ref="timer" class="timer" />
      <div class="transaction__block-buttons">
        <AppButton title="отменить" fluid @click="cancel('rejected')" type="black" />
        <AppButton title="оплачено" fluid @click="cancel('done')" />

      </div>
    </div>

    <div v-if="activeTransaction.status === 'done'"  class="transaction__block-result ">
      <div class="transaction__block">
        <AppFrame src="https://lottie.host/embed/223dc3fb-840e-4642-a3c4-1ade3616649b/SrGkLIjFq9.json" />
        <div class="exchanger__content--title">
          Ваша заявка в обработке <br> Мы уже проверяем оплату
        </div>
        <div class="transaction__block--transactionId" >
          <span @click="copy($event, activeTransaction.id)">
            #{{activeTransaction.id}}
          </span>
        </div>
        <span>В течение 30 минут вам будут переведены ваши средства</span>
        <span>({{ activeTransaction.countBuy }} {{ activeTransaction.buy.toUpperCase() }})</span>
        <span>На адрес {{ formatAddress }}</span>
        <span>по срочным вопросам: <a href="https://t.me/mfz_owner" target="_blank">@mfz_owner</a></span>
      </div>
    </div>

    <div v-else-if="activeTransaction.status === 'payed'"  class="transaction__block-result ">
      <div class="transaction__block">
        <AppFrame src=" https://lottie.host/embed/40310d6e-7d17-474b-881e-8a5dd30e6d78/pT4wni4qVz.json" />
       <div class="exchanger__content--title">
          Мы обработали ваш платеж!
        </div>
        <div class="transaction__block--transactionId" >
          <span @click="copy($event, activeTransaction.id)">
            #{{activeTransaction.id}}
          </span>
        </div>
        <span>Ваши {{ activeTransaction.countBuy }} {{ activeTransaction.buy.toUpperCase() }} уже летят к Вам!</span>
        <span>Вы можете оставить свой отзыв здесь! <nuxt-link target="_blank" to="https://t.me/mfz_exchanger">@mfz_exchanger</nuxt-link></span>
        <AppButton title="начать сначала" @click="back" />
      </div>
    </div>

    <div v-else-if="activeTransaction.status === 'rejected'"  class="transaction__block-result">
      <div class="transaction__block">
        <div class="exchanger__content--title">
          Ваша заявка удалена
        </div>
        <span>Возвращайтесь снова!</span>
        <AppButton title="начать сначала" @click="back" />
        </div>
    </div>

    <div v-else-if="activeTransaction.status === 'timeout'"  class="transaction__block-result">
      <div class="transaction__block">
        <div class="exchanger__content--title">
          Прошло слишком много времени с момента ожидания оплаты
        </div>
        <span>Если Вы все же оплатили заявку, то нажмите кнопку "я оплатил"</span>
        <span>Иначе, просто создайте новую заявку когда это будет нужно.</span>
        <div class="transaction__block-buttons">
          <AppButton title="все сначала" fluid type="black" @click="back"  />
          <AppButton title="я оплатил" fluid @click="cancel('done')" />
        </div>

      </div>
    </div>


  </div>
</template>
<script lang="ts" setup>
import { Getter } from '~/helpers/getter'
import AppButton from '~/components/Buttons/AppButton.vue'
import { Setter } from '~/helpers/setter'
import AppFrame from '~/components/App/AppFrame.vue'
import { copy } from '~/helpers/copy'
import { onValue, ref as dbRef } from 'firebase/database'
import { formatCryptoAddress } from '~/components/Exchanger/helpers/exchanger'
const { $database } = useNuxtApp()
const exchangerStore = useExchangerStore()
const {activeTransaction, time, isUSDTSell, isTonForSell, isValuteForSell, isSBPSell} = storeToRefs(exchangerStore)

const timer = ref()
const valueTransaction = ref(null)
const isOkxPayment = shallowRef<boolean>(false)
const uids = {
  okx: '268050657901203456',
  bybit: '26517026'
}

onMounted(() => {
  if (!time.value) {
    time.value = window.localStorage.getItem('expTime')
  }

  if (activeTransaction.value?.status === 'created') {
    initializeClock()
  } else if (activeTransaction.value?.status === 'payed') {
    window.localStorage.removeItem('transaction')
  }

  const request = dbRef($database, `transactions/${activeTransaction.value?.key}`)

  onValue(request, (snapshot) => {
    valueTransaction.value = snapshot.val()
  });
})

watch(valueTransaction, (val) => {
  if (val.status === 'payed') {
    activeTransaction.value!.status = 'payed'
    window.localStorage.removeItem('transaction')
  }
})

const { $databaseRef } = useNuxtApp()
const {data} = useAsyncData(async () => {
  const paymentData = await Getter.getFromDB( 'paymentData/')

  return {
    paymentData
  }
})

const getPayment = computed(() => data.value?.paymentData[activeTransaction.value!.sell])
const formatAddress = computed(() => activeTransaction.value?.buy === 'stars' ? '@' + activeTransaction.value.telegram : formatCryptoAddress(activeTransaction.value?.address!))


function getTimeRemaining(){
  var t = Date.parse(new Date(time.value)) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(){
  if (!time.value) return
  const timeinterval = setInterval(function(){
    const t = getTimeRemaining();
    if(t.total<=0){
      clearInterval(timeinterval);
      cancel('timeout')
    }

    if (timer.value) {
      timer.value.innerHTML = (t.minutes <10 ? '0'+t.minutes : t.minutes)  + ":" + (t.seconds < 10 ? '0'+t.seconds : t.seconds)
    }


  },1000);
}

const cancel = (status: 'rejected' | 'timeout' | 'done') => {
  exchangerStore.updateStatus(status)
  window.localStorage.removeItem('expTime')

  const updates: Record<string, Object> = {}
  updates[`transactions/${activeTransaction.value?.key}`] = {...activeTransaction.value, status}
  Setter.updateToDb(updates)
}

const back = () => {
  window.localStorage.removeItem('transaction')
  activeTransaction.value = null
}
</script>
<style lang="scss" scoped>
.timer {
  font-size: 40px;
  font-weight: 600;
  text-align: center;

  @include mobile-all {
    margin: 40px 0;
  }
}
.transaction__block-button-okx {
  width: 100%;
  display: flex;
  justify-content: center;
}
.transaction__block-wrapper {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.transaction__block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

  span {
    text-align: center;
  }

  &-payment-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 40px;

    &_sbp_tip {
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        left: -15px;
        top: 5px;
        border-radius: 50%;
        background: $error;
        box-shadow: 0 0 5px 1px $error;
      }
    }

    h3 {
      font-size: 18px;
      font-weight: 600;

      @include mobile-xs {
        font-size: 14px;
      }
    }

    h4 {
      @include mobile-xs {
        font-size: 14px;
      }
    }

    span, i {
      font-size: 14px;
      @include mobile-xs {
        font-size: 12px;
      }
    }
  }

  &--transactionId {
    text-align: center;
    color: gray;

  }
&-payment-wrapper {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  box-shadow: 0 0 5px 1px rgba(128, 128, 128, 0.42);
  width: 100%;
  row-gap: 16px;
}
  &-payment-data {
    display: flex;
    flex-direction: column;
    row-gap: 16px;


    &--address {
      font-weight: 600;
      font-size: 16px;
      word-break: break-all;
    }
    &--memo {
      font-weight: 600;
      font-size: 16px;
    }
  }

  &-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px
  }

  &-result {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
  }
}
.exchanger__content--title-wrapper {
  margin-left: unset;
}
</style>