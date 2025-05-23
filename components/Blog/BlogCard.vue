<template>
  <nuxt-link  :class="['blog-card', {'blog-card--private': item.private}]" :to="`blog/${item.key}`">
    <nuxt-img v-if="item.private" src="https://cdn.moneyflowzen.ru/ui/padlock.png" preload class="blog-card__private-image" />
    <span v-if="read" class="blog-card--read product__attention">прочитано</span>
    <nuxt-img :src="item.preview" preload class="blog-card__image" />
    <div class="blog-card__content">
      <h3 class="blog-card__title">{{ item.title }}</h3>
      <div class="blog-card__footer">
        <div class="blog-card__time">
          <AppImage :image="grayClock" />
          {{ item.time }}
          мин.
        </div>
        <div v-if="item?.views" class="blog-card__views"><AppImage image="ui/visible.png" /> {{ item?.views }}</div>
        <div v-if="level" :class="['blog-card__level', level.className]">
          <div v-for="circle in item.level" class="blog-card__level-circle" />
          <span class="blog-card__level-text">ур. {{ level.text }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
import { grayClock } from 'assets/imagesSrc'

const levelObject: {[key: number]: Record<string, string>;} = {
  1: {
    className: 'yellow',
    text: 'новичок'
  },
  2: {
    className: 'blue',
    text: 'средний'
  },
  3: {
    className: 'purple',
    text: 'высокий'
  }
}
interface IBlogItem {
  title: string,
  text: string,
  time: number,
  level: number,
  key: string,
  private: boolean
}
const props = defineProps<{
  item: IBlogItem,
  read?: Boolean
}>()

const level = computed(() => {
  return levelObject[props.item.level]
})
</script>
<style lang="scss" scoped>
.blog-card {
  border-radius: 10px;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 400px;
  max-width: 400px;
  text-decoration: none;
  @include mobile-all {
    width: 100%;
  }

  &--private {
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      position: absolute;
    }
  }

  &--read {
    background-color: rgba(0,0,0, 0.4);
    color: white;
    top: 10px;
    right: 10px;
    position: absolute;
  }

  &__content {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  &__private-image {
    position: absolute;
    top: calc(50% - 36px/2);
    left: calc(50% - 36px/2);
    width: 36px;
    height: 36px;
  }

  &__image {
    background-size: cover;
    background-position: top;
    max-width: 400px;
    height: auto;
    max-height: 220px;
    aspect-ratio: 400 / 220;
    @include mobile-all {
      width: 100%;
    }
  }

  &__title {
    text-decoration: none;
    color: black;
    font-weight: 600;
    margin: 0;
    &:hover {
      color: $brand_yellow
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
  }
  &__time {
    display: flex;
    align-items: center;
    color: #6A6A6A;
    font-size: 12px;
    gap: 3px
  }
  &__level {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__level-text {
    font-size: 14px;
  }
  &__views {
    color: gray;
    display: flex;
    align-items: center;
    color: #6A6A6A;
    gap: 3px;
    font-size: 12px;
  }
  &__level-circle {
    height: 5px;
    width: 5px;
    border-radius: 50%;
  }
  .yellow {
    .blog-card__level-circle {
      background-color: $brand_yellow;
    }
    .blog-card__level-text {
      color: $brand_yellow;
    }
  }
  .blue {
    .blog-card__level-circle {
      background-color: $blue;
    }
    .blog-card__level-text {
      color: $blue;
    }
  }
  .purple {
    .blog-card__level-circle {
      background-color: $purple;
    }
    .blog-card__level-text {
      color: $purple;
    }
  }
}
</style>