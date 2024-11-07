<template>
<div class="mfz-gift-game">
  <img src="../assets/borderCoins.png" class="mfz_welcome-gift--coins" />
  <div class="mfz-gift-game__content">
    <img v-for="index in 9" :key="index" src="../assets/gift.png" :class="['mfz-gift-game__item', {'--shaked': selectedIndex === index}]" @click="selectGift(index)" />
  </div>
  <p class="mfz_welcome-gift--text">выбирай свой подарок! ({{giftCount}})</p>
</div>
</template>
<script lang="ts" setup>
import { useGiftStore } from '@/stores/gift'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { Getter } from '~/helpers/getter'
import { Setter } from '~/helpers/setter'

const emits = defineEmits<{
  (e: 'goBack'): void
}>()

const {selectedGift, giftCount, giftHash, giftKey} = storeToRefs(useGiftStore())
const {showModal, showModalType} = storeToRefs(useMainStore())

const selectedIndex = shallowRef<number | null>(null)

const {data} = await  useAsyncData(async () => {
  const currentHash = await Getter.getByKey('currentGifts/', giftKey.value!)
  const gifts =  await Getter.getFromDB('gifts/')

  return {
    currentHash,
    gifts: Object.values(gifts)
  }
})

const partsHash = computed(() => `${giftHash.value}${giftCount.value}`)

process.client && onMounted(() => {
  if (data.value?.currentHash !== partsHash.value) {
    console.log('ERROR')
    reset()
  }
})

const reset = () => {
  localStorage.removeItem('giftCount')
  localStorage.removeItem('giftHash')
  localStorage.removeItem('giftKey')

  giftCount.value = 0
  giftHash.value = ''
  giftKey.value = ''

  emits('goBack')
}
const selectGift = async (index: number) => {
  selectedIndex.value = index

  const currentHash = await Getter.getByKey('currentGifts/', giftKey.value!)
  const lsGiftCount = localStorage.getItem('giftCount')
  const lsGiftHash = localStorage.getItem('giftHash')

  if (currentHash !== `${lsGiftHash}${lsGiftCount}`) {
    await Setter.updateToDb({[`currentGifts/${giftKey.value}`]: null})
    reset()
    return
  }
  setTimeout(() => {
    showModal.value = true
    showModalType.value = 'GiftResultPopup'
  }, 1000)

  selectedGift.value = data.value?.gifts[index-1]

  const myGifts = localStorage.getItem('myGifts')
  if (!myGifts) {
    localStorage.setItem('myGifts', JSON.stringify([selectedGift.value]))
  } else {
    const tokenGifts = JSON.parse(myGifts)
    const newArrayGifts = [...tokenGifts, selectedGift.value]
    localStorage.setItem('myGifts', JSON.stringify(newArrayGifts))
  }


  giftCount.value!--
  if (giftCount.value === 0) {
    reset()
    await Setter.updateToDb({[`currentGifts/${giftKey.value}`]: null})
  } else {
    localStorage.setItem('giftCount', String(giftCount.value))
    await Setter.updateToDb({[`currentGifts/${giftKey.value}`]: partsHash.value})
  }


}
</script>
<style lang="scss" scoped>
.mfz_welcome-gift--text {
  text-transform: uppercase;
  color: $brand_yellow;
  font-weight: 600;
  margin-top: 30px;
}
.mfz-gift-game {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

}
.mfz_welcome-gift--coins {
  position: absolute;
  bottom: 0;
  right: 0;

  @include not-mobile {
    display: none;
  }
}

.mfz-gift-game__content {
  display: flex;
  flex-wrap: wrap;
  z-index: 5;
  width: 90%;
  justify-content: space-between;
  row-gap: 16px;
  padding: 0 30px;
  margin-top: 40px;
  @include tablet {
    width: 80%;
  }
  @include desktop {
    margin-top: 120px;
    gap: 16px;
    width: 40%;
  }
}
.mfz-gift-game__item {
  width: 30%;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
  }

}

.--shaked {
  animation: shake 2s linear;
}
</style>