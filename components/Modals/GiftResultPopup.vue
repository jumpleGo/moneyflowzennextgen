<template>
  <div v-if="selectedGift" class="mfz__gift_result_popup">
    <h2>Поздравляю! Ты выбрал {{ selectedGift.title }}</h2>
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
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>