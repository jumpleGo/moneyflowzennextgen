<template>
  <div class="product-banner">
    <div class="product-banner__logo">
      <nuxt-img :src="logo" alt="Логотип" class="product-banner__logo-img" width="48px"  height="48px" />
    </div>

    <div class="product-banner__content">
      <div class="product-banner__badge">
        <slot name="badge">Старт 15 мая!</slot>
      </div>
      <p class="product-banner__title">
        <slot name="title">Заголовок</slot>
      </p>

    </div>

    <div class="product-banner__action">
      <AppButton :to="link" size="xs" title="продолжить" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'

defineProps<{
  logo: string
  link: string
}>()
</script>

<style scoped lang="scss">
.product-banner {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 10px;
  gap: 10px;
  width: 100%;
  @include mobile-all {
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }

  &__logo {
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 50%;

    &-img {
      object-fit: cover;
      display: block;
    }
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    @include mobile-all {
      align-items: center;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #111;
    margin: 0;

    @include mobile-all {
      text-align: center;
    }
  }

  &__badge {
    background-color: #864d20;
    color: white;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 2px;
    width: max-content;
    font-size: 12px;
  }

  &__action {
    flex-shrink: 0;
  }
}
</style>