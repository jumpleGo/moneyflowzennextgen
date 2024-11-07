<template>
  <div class="mfz_app_popup__bg"></div>
  <div class="mfz_app_popup__template">
    <div class="mfz_app_popup__wrapper-content">
      <img src="/assets/close.png" class="close" alt="" @click="showModal = false">
      <component v-if="showModalType" :is="component" />
      <slot />
    </div>
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
const component = computed(() => showModalType.value && components[showModalType.value])

</script>
<style lang="scss" scoped>
.close {
  width: 20px;
  height: auto;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
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
  top: 0;
  left: 0

}
.mfz_app_popup__template {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1000;
  width: 100%;
}

.mfz_app_popup__wrapper-content {
  position: relative;
}
</style>
