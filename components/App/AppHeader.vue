<template>
  <header class="mfz_wrapper__header">
    <div class="mfz_wrapper__header-wrapper">
      <img class="mfz_wrapper__header--logo logo" src="/assets/logo/logo.png">
      <nav class="mfz_wrapper__header_navbar">
        <nuxt-link class="mfz_wrapper__header_navbar--link" to="/">
          главная
        </nuxt-link>
        <nuxt-link  class="mfz_wrapper__header_navbar--link" to="/test">
          проверка знаний
        </nuxt-link>
        <nuxt-link class="mfz_wrapper__header_navbar--link" to="/products">
          продукты
        </nuxt-link>
        <nuxt-link class="mfz_wrapper__header_navbar--link" to="/blog">
          блог
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  showTest?: boolean
}>(), {
  showTest: true
})
</script>
<style lang="scss" scoped>
.mfz_wrapper__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 2;
  background: transparent;

  &-wrapper {
    display: flex;
    align-items: center;
    flex: 1;

    @include mobile {
      padding: 30px 15px;
      width: 100%;
    }

    @include mobile-xs {
      padding: 30px 15px;
      width: 100%;
    }

    @include tablet {
      padding: 30px 15px;
      width: 100%;
    }

    @include desktop {
      padding: 32px 40px;
    }

    @include desktop-lg {
      padding: 32px 40px;
    }
  }
}
.mfz_wrapper__header--logo {
  @include mobile {
    display: none;
  }

  @include mobile-xs {
    display: none;
  }

  @include tablet {
    width: 40px;
  }

  @include desktop {
    width: 60px;
  }

  @include desktop-lg {
    width: 100px;
  }

}
.mfz_wrapper__header_navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  z-index: 10;
  @include mobile-all {
    flex-wrap: wrap;
    gap: 30px;
    justify-content: flex-start;
  }
}

.mfz_wrapper__header_navbar--link {
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  color: white;
  text-transform: uppercase;

  @include mobile {
    font-size: 14px;
  }

  @include mobile-xs {
    font-size: 12px;
  }
  @include tablet {
    font-size: 18px;
  }

  @include desktop {
    font-size: 22px;
  }

  @include desktop-lg {
    font-size: 24px;
  }

  &:hover {
    border-bottom-color: $brand_yellow;
    background: transparent;

  }
}
.deactive {
  pointer-events: none;
  position: relative;
  opacity: 0.5;
  &:after {
    content: '';
    position: absolute;
    display: block;
    top: -5px;
    right: -10px;
    width: 15px;
    height: 15px;
    background-image: url("/assets/clock.png");
    background-size: cover;
  }
}
</style>