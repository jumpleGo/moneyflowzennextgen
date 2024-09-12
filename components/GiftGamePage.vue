<template>
<div class="mfz-gift-game">
  <img src="../assets/borderCoins.png" class="mfz_welcome-gift--coins" />
  <div class="mfz-gift-game__content">
    <img v-for="index in 9" :key="index" src="../assets/gift.png" class="mfz-gift-game__item" @click="selectGift(index)" />
  </div>
</div>
</template>
<script lang="ts" setup>
import { useGiftStore } from '@/stores/gift'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const {selectedGift} = storeToRefs(useGiftStore())
const {showModal, showModalType} = storeToRefs(useMainStore())
const selectGift = (index: number) => {
  selectedGift.value = {
    title: String(index)
  }
  showModal.value = true
  showModalType.value = 'GiftResultPopup'
}
</script>
<style lang="scss" scoped>
.mfz-gift-game {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
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
  margin-top: -150px;
  z-index: 5;
  width: 100%;
  gap: 16px;
  padding: 30px;
  @include tablet {
    width: 80%;
  }
  @include desktop {
    width: 50%;
  }
}
.mfz-gift-game__item {
  width: 30%;
  &:hover {
    cursor: pointer;
    scale: 1.1;
    transition: 0.3s;
  }

}
</style>