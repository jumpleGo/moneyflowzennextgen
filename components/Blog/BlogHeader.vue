<template>
  <header class="mfz-blog-header">
    <div class="mfz-blog-header__block">
      <nuxt-img class="mfz-blog-header__logo logo" width="50" height="50" src="https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/logo%2Fknowledges.jpeg?alt=media&token=b05e38d2-d03c-48c6-9264-9ea8a6d3834b" />
      <span class="mfz-blog-header__title">mfz-знания</span>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.mfz-blog-header {
  display: flex;
  align-items: center;
  width: 100%;
  @include mobile {
    padding: 30px 15px;
  }

  @include mobile-xs {
    padding: 30px 15px;

  }

  @include tablet {
    padding: 30px 15px;
  }

  @include desktop {
    padding: 32px 40px;
  }

  @include desktop-lg {
    padding: 32px 40px;
  }
  &__block {
    display: flex;
    align-items: center;
  }
  &__title {
    text-transform: uppercase;
    color: white;
    font-size: 22px;
  }
}
</style>
<script setup lang="ts">
</script>