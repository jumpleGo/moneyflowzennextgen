<template>
  <div class="flat-blog-banner" :style="`background-color: ${bgColor}; color: ${color}`">
    <div class="flat-blog-banner__content">
      <h4 v-if="title" class="flat-blog-banner__title" v-html="title" />
      <p v-if="subtitle" class="flat-blog-banner__subtitle" v-html="subtitle" />
    </div>
    <AppButton v-if="link" size="xs" :to="link" :title="buttonTitle || ''"/>
  </div>
</template>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
defineProps<{
  link?: string,
  title?: string,
  subtitle?: string,
  buttonTitle?: string,
  bgColor?: string
  color?: string
}>()
</script>
<style lang="scss" scoped>
.flat-blog-banner {
  border-radius: 20px;
  padding: 20px 24px;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: black;
  @include  mobile-all {
    flex-direction: column;
    gap: 24px
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 14px;
    @include  mobile-all {
      gap: 18px
    }
  }

  &__title {
    font-size: 23px;
    margin: unset;
    max-width: 400px;
    @include  mobile-all {
      text-align: center;
    }
  }

  &__subtitle {
    @include  mobile-all {
      text-align: center;
    }
    font-size: 16px;
    margin: unset;
  }
}
</style>
