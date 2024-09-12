<template>
  <div class="mfz_app_popup__bg"></div>
  <div class="mfz_app_popup__template">
    <img src="../assets/close.png" class="close" alt="" @click="showModal = false">
    <component v-if="showModalType" :is="component" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import GiftPopup from '@/components/Modals/GiftPopup.vue'
import GiftResultPopup from '@/components/Modals/GiftResultPopup.vue'
const {showModal, showModalType} = storeToRefs(useMainStore())
const components: Record<string, any> = {
  'GiftPopup': GiftPopup,
  'GiftResultPopup': GiftResultPopup
}
console.log(showModalType.value)
const component = computed(() => showModalType.value && components[showModalType.value])

</script>
<style lang="scss" scoped>
.close {
  width: 20px;
  height: auto;
}
.mfz_app_popup__bg {
  position: fixed;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  z-index: 100;
  pointer-events: none;
}
.mfz_app_popup__template {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 600px;
  width: calc(100% - 30px);
  height: fit-content;
  padding: 30px;
  background: white;
  border-radius: 16px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1000;
}
</style>
