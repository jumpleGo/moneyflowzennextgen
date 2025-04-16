<template>
  <div class="mfz__footer">
    <div class="mfz__footer-wrapper">
      <div class="mfz__footer_left_block">
        <AppImage class="mfz__footer__logo logo" :image="logoSrc" />
        <div class="mfz__footer__text">
          <h1>mfz</h1>
          <h3>money flow zen</h3>
        </div>
      </div>
      <div class="mfz__footer__links">
        <nuxt-link to="/" class="mfz__footer__link">Главная</nuxt-link>
        <nuxt-link to="/products" class="mfz__footer__link">Обучения</nuxt-link>
        <nuxt-link to="/blog" class="mfz__footer__link">Блог</nuxt-link>
      </div>
      <div class="mfz__footer_right_block">
        <div class="mfz__footer__social_media">
          <nuxt-link to="https://t.me/mfz_official_crypto" target="_blank" class="mfz__footer_social">
            <AppImage image="socials/telegram.svg" />
          </nuxt-link>
          <nuxt-link to="https://www.youtube.com/@money_flow_zen" target="_blank" class="mfz__footer_social">
            <AppImage image="socials/youtube.svg" />
          </nuxt-link>
        </div>
        <p class="mfz__footer__info">
          для связи с автором <a href="https://t.me/mfz_owner">@mfz_owner</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { logoSrc } from 'assets/imagesSrc'
</script>
<style lang="scss" scoped>
.mfz__footer {
  background: black;
  z-index: 5;
  display: flex;

  &-wrapper {
    display: flex;
    flex: 1;

    @include mobile-xs {
      padding: 30px 15px;
      flex-direction: column;
      width: 100%;
      gap: 40px;
    }

    @include mobile {
      padding: 30px 15px;
      flex-direction: column;
      width: 100%;
      gap: 40px;
    }

    @include tablet {
      padding: 30px 15px;
      justify-content: space-between;
      width: 100%;
    }

    @include desktop {
      padding: 60px 40px;
      justify-content: space-between;
    }

    @include desktop-lg {
      padding: 60px 40px;
      justify-content: space-between;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__link {
    color: white;
    text-decoration: none;
    &:hover {
      color: $brand_yellow;
    }
  }
}
.mfz__footer_left_block {
  display: flex;
  align-items: center;
}
.mfz__footer__logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.mfz__footer__text {
  text-transform: uppercase;
  margin-left: 10px;
  color: $brand_yellow;
  h1 {
    font-size: 25px;
    line-height: 25px;
    font-weight: 700;
    margin: unset;
  }
  h3 {
    font-size: 18px;
    line-height: 20px;
    margin: unset;
  }
}

.mfz__footer__social_media {
  display: flex;
  column-gap: 5px;
}
.mfz__footer_social {
  height: auto;
  padding: unset;
  text-decoration: unset;
  background: transparent;
  img {
    height: 30px;
    width: 30px;
    border-radius: 10px;
  }
}
.mfz__footer__info {
  color: white;
  margin-top: 5px;
  a {
    text-decoration: none;
    color: $brand_yellow
  }
}
</style>