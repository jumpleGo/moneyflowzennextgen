<template>
  <header class="mfz-blog-header">
    <div class="mfz-blog-header__block">
      <AppImage class="mfz-blog-header__logo logo" width="50" height="50" image="logos/knowledges.jpeg" />
      <span class="mfz-blog-header__title">mfz-знания</span>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.mfz-blog-header {
  display: flex;
  align-items: center;
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