<template>
  <div class="mfz_popup__gift">
    <h2 class="mfz_popup__gift--title">У вас есть<br> бесплатная попытка<br> в "Месте изобилия"!</h2>
    <app-button fluid title="перейти" class="mfz_popup__gift--button" to="/gift" @click="showModal = false" />
  </div>
</template>

<style lang="scss" scoped>
.mfz_popup__gift {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mfz_popup__gift--title {
  text-align: center;
  font-size: 28px;
}
.mfz_popup__gift--button {
  margin-top: 40px;
}
</style>
<script setup lang="ts">
import AppButton from '@/components/Buttons/AppButton.vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const {showModal} = storeToRefs(useMainStore())
</script>