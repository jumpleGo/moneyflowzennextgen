<template>
  <div v-if="selectedGift" class="mfz__gift_result_popup">
    <img src="assets/gift.png" class="mfz__gift_result_popup__img-gift" />
    <img src="assets/pages/gifts/lightBlick.svg" class="mfz__gift_result_popup__img-blick-second" />
    <img src="assets/pages/gifts/lightBlick.svg" class="mfz__gift_result_popup__img-blick-first" />
    <img src="assets/pages/gifts/lightBlick.svg" class="mfz__gift_result_popup__img-blick-third" />


    <div class="mfz__gift_result_popup__content">
      <h2 class="mfz__gift_result_popup__title">{{ selectedGift.title }}</h2>
      <span v-if="selectedGift.description" class="mfz__gift_result_popup__description">
        {{ selectedGift.description }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useGiftStore } from '@/stores/gift'

const {selectedGift} = storeToRefs(useGiftStore())
</script>
<style lang="scss" scoped>
.mfz__gift_result_popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 400px;
  height: fit-content;
  padding: 30px;
  background: white;
  border-radius: 16px;

  &__img-gift {
    width: 40%;
    height: auto;

    @include not-mobile {
      width: 20%;
    }
  }

  &__img-blick-second {
    position: absolute;
    right: 10%;
  }
  &__img-blick-first {
    position: absolute;
    left: 10%;
    top: 10%;
  }
  &__img-blick-third {
    position: absolute;
    left: 7%;
    top: 60%;
  }

  &__content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px
  }

  &__title {
    font-size: 22px;
    text-transform: uppercase;
  }
  &__description {
    font-size: 16px;
    text-align: center;
    width: 80%;
  }
}
</style>