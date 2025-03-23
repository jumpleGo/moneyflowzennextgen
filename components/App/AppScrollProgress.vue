<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '../../helpers/debounce.js'

const scrollProgress = ref(0)

const updateScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollTop / winHeight) * 100
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped lang="scss">
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px; /* толщина линии */
  background-color: transparent;
  z-index: 9999;
}

.progress-bar {
  height: 100%;
  width: 0;
  background-color: $brand_yellow;
  transition: width 0.1s ease-out;
}
</style>
