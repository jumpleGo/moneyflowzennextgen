<template>
  <div class="exchanger__wrapper">
    <div class="exchanger">
      <NotificationBlock v-if="exchangerSettings?.notificationType" :notify-type="exchangerSettings.notificationType" />
      <div v-if="!isLoadingResize" class="exchanger__content">
        <img class="exchanger__content--icon" src="/assets/icons/airdrop.png" @click="showModal = true" />
        <LeftExchangerBlock v-if="showLeftBlock" :class="['exchanger__left', {'--disabled-block': activeTransaction}]"  />
        <TransactionBlock v-if="activeTransaction" class="exchanger__right__payment"/>
        <RightExchangerBlock v-if="showRightBlock" class="exchanger__right" @back="backToPair" />
      </div>
    </div>
  </div>
  <AppPopup v-if="showModal">
    <div class="investment__offer">
      <h2 id="-mfz">Инвестиции в экосистему MFZ  | Donation</h2>
      <br><br>
      <p>Тут я предлагаю вам инвестировать в экосистему MFZ.</p>
      <br>
      <p>Продукты будут постоянно развиваться, а для этого нужно больше рук, чем 2. Вы можете поддержкать проект, и, как амбассадор, получить первые бенефиты.</p>
      <br>
      <br>
      <h3 id="-">Бенефиты:</h3>
      <ol>
        <li>Обмены без комиссий на протяжении 3 месяцев (после интеграции обменника с Telegram App)</li>
        <li>Ранние поинты, после введения их в экосистему</li>
      </ol>
      <p>Далее, по усмотрению автора</p>
      <br>
      <p><b>Старт от 100$</b></p>
      <br>
      <p>За подробностями <nuxt-link to="https://t.me/mfz_owner" target="_blank">@mfz_owner</nuxt-link></p>
      <p>Roadmap (скоро)</p>
    </div>
  </AppPopup>
</template>

<script lang="ts" setup>
import RightExchangerBlock from '~/components/Exchanger/RightExchangerBlock.vue'
import LeftExchangerBlock from '~/components/Exchanger/LeftExchangerBlock.vue'
import TransactionBlock from '~/components/Exchanger/TransactionBlock.vue'
import useResponsive from '~/composables/useResponsive'
import NotificationBlock from '~/components/Exchanger/NotificationBlock.vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '~/stores/main'
import { binance } from '~/api'
import { Getter } from '~/helpers/getter'
const { activeTransaction, isSelectedBothItem, selectedBuy, selectedSell, time, exchangerSettings} = storeToRefs(useExchangerStore())
const hideRightBlock = shallowRef(true)
const {isMobile, isLoadingResize} = useResponsive()
const {showModal} = storeToRefs(useMainStore())
const { $databaseRef } = useNuxtApp()
definePageMeta({
  middleware:['exchanger']
})

useAsyncData(async () => {
  exchangerSettings.value = await Getter.getFromDB('exchangerSettings/')
})

const showLeftBlock = computed(() => {
  if (isMobile.value) {
    return !isSelectedBothItem.value ? !activeTransaction.value : false
  }
  return true
})
const showRightBlock = computed(() => {
  if (isMobile.value) {
    return isSelectedBothItem.value && !activeTransaction.value
  } else {
    return !activeTransaction.value
  }
})

watch(isSelectedBothItem, (value) => {
  if (value) hideRightBlock.value = false
})

const backToPair = () => {
  selectedBuy.value = {}
  selectedSell.value = {}
}
</script>
<style lang="scss">
@import './../style/exchanger.scss';
.exchanger__wrapper {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  @include mobile-all {
    margin-top: 10px;
  }
}
.exchanger {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1300px;

  @include mobile-all {
    padding: 0 15px;
  }
}
.exchanger__content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 100px);
  gap: 100px;
  position: relative;

  @include mobile-all {
    position: relative;
    flex-direction: column;
    align-items: center;
    margin: unset;
    height: auto;
    gap: unset;
  }

  &--icon {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
    width: 25px;
    height: auto;
    background: rgba(254,190,22,0.1);
    padding: 5px;
    border: 1px solid #f1b000;
    border-radius: 10px;
    animation: boxShadowAnim 5s infinite;
  }
}

@keyframes boxShadowAnim {
  50% {box-shadow: 0 0 30px $brand_yellow;}
}

.investment__offer {
  max-width: 1000px;
  background: white;
  overflow-y: scroll;
  height: 70vh;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>