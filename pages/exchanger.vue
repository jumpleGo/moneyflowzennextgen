<template>
  <div class="wrapper exchanger">
    <div class="exchanger__left">
      <div class="exchanger__block">
        <p class="exchanger__title">что хотите продать</p>
        <div class="exchanger__items">
          <p class="exchanger__subtitle">криптовалюта</p>
          <div class="exchanger__items--list">
            <div v-for="(coin, index) in coins"
                 :key="index + 'coin--first'"
                 :class="['exchanger__item', {active: selectedSell.key === coin.key}]"
            @click="selectedSell = coin">
              <img :src="coin.image" />
              {{ coin.title }}
            </div>
          </div>
        </div>
        <div class="exchanger__items">
          <p class="exchanger__subtitle">фиат</p>
          <div>
            <div v-for="(valute, index) in valutes"
                 :key="index + 'valute--first'" class="exchanger__item"
                 :class="['exchanger__item', {active: selectedSell.title === valute.title}]"
                 @click="selectedSell = valute">
              <img :src="valute.image" />
              {{ valute.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="exchanger__block">
        <p class="exchanger__title">что хотите купить</p>
        <div class="exchanger__items">
          <p class="exchanger__subtitle">фиат</p>
          <div>
            <div
              v-for="(valute, index) in valutes"
              :key="index + 'valute--second'"
              class="exchanger__item"
              :class="['exchanger__item', {active: selectedBuy.key === valute.key}, {'--disabled': isValuteForSell}]"
              @click="selectForSell(valute)">
              <img :src="valute.image" />
              {{ valute.title }}
            </div>
          </div>
        </div>
        <div class="exchanger__items">
          <p class="exchanger__subtitle">криптовалюта</p>
          <div class="exchanger__items--list">
            <div v-for="(coin, index) in coins"
                 :key="index + 'coin--first'"
                 :class="['exchanger__item', {active: selectedBuy.key === coin.key}, {'--disabled': isCryptoForSell}]"
                 @click="selectForSell(coin)">
              <img :src="coin.image" />
              {{ coin.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightExchangerBlock />
  </div>
</template>
<script lang="ts" setup>
import { Getter } from '@/helpers/getter'

import { type Selected, useExchangerStore } from '~/stores/exchanger'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import RightExchangerBlock from '~/components/Exchanger/RightExchangerBlock.vue'

const { $databaseRef } = useNuxtApp()
const {coins, valutes, selectedBuy, selectedSell} = storeToRefs(useExchangerStore())

const {data} = useAsyncData(async () => {
  const {COINS, VALUTE} =  await Getter.getFromDB($databaseRef, 'exchangePairs/')
  coins.value = COINS
  valutes.value = VALUTE
})


watch(selectedSell, () => {
  if (selectedSell.value?.type === selectedBuy.value.type ) {
    selectedBuy.value = {}
  }
})
watch(selectedBuy, () => {
  if (selectedSell.value?.type === selectedBuy.value.type ) {
    selectedBuy.value = {}
  }
})

const isCryptoForSell = computed(() => {
  return selectedSell.value?.key && Object.values(coins.value)?.map(i => i.key).includes(selectedSell.value?.key)
})
const isValuteForSell = computed(() => {
  return selectedSell.value?.key && Object.values(valutes.value)?.map(i => i.key).includes(selectedSell.value?.key)
})


const selectForSell = (item: Selected) => {
  if (item.type === 'valute' && isValuteForSell.value) return
  if (item.type === 'crypto' && isCryptoForSell.value) return
  selectedBuy.value = item
}

</script>
<style lang="scss" scoped>


.exchanger {
  display: flex;
  justify-content: center;
  padding-top: 150px;
  width: 100%;
  gap: 100px;
}
.exchanger__title {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
}
.exchanger__subtitle {
  text-transform: uppercase;
  font-size: 14px;
}
.exchanger__left {
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

.exchanger__block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 40px;

  &:first-child {
    border-right: 1px solid rgba(128, 128, 128, 0.36);
  }

}
.exchanger__items--list {
  display: flex;
  flex-direction: column;
}
.exchanger__item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px solid rgba(0,0,0, 0.1);
  &:hover {
    cursor: pointer;
    border: 1px solid $brand_yellow;
    background: rgba(254,190,22,0.1);
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.23);
  }
}
.--disabled {
  position: relative;
  &:hover {
    cursor: not-allowed;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(254, 190, 22, 0.16);
    position: absolute;
    left: 0;
    top: 0
  }
}
.active {
  border: 1px solid $brand_yellow;
  background: rgba(254,190,22,0.1);
}
.exchanger__subtitle {
  margin: 10px
}

.--disabled-block {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: #cecece;
    opacity: 0.5;
    left: 0;
    top: 0;
  }
}
</style>