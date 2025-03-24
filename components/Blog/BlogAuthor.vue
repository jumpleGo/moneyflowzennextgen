<template>
  <div class="blog-author">
      <div class="blog-author__author">
        <nuxt-img width="30" height="30" class="logo" :src="logoSrc" />
        <span>Money Flow Zen</span>
      </div>
    <AppButton size="xs" title="подписаться" to="https://t.me/mfz_official_crypto" />
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
}
</style>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
import { logoSrc } from 'assets/imagesSrc'
</script>