<template>
  <div class="blog-author">
      <div class="blog-author__author">
        <AppImage width="30" height="30" class="logo" :image="logoSrc" />
        <span>Money Flow Zen</span>
      </div>
    <div class="blog-author__buttons">
      <AppButton size="xs" title="подписаться" @click="emit('openTgList')" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.blog-author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid gray;

  &__author {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 20px
  }
}
</style>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
import { logoSrc } from 'assets/imagesSrc'


const emit = defineEmits<{
  (e: 'openTgList'): void
}>()
</script>