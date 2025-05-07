<template>
  <nuxt-link class="quiz-card" :to="`/test/quiz/${item.key}`">
<!--    <span v-if="read" class="quiz-card&#45;&#45;read product__attention">прочитано</span>-->
    <nuxt-img :src="item.preview" preload class="quiz-card__image" />
    <div class="quiz-card__content">
      <h3 class="quiz-card__title">{{ item.title }}</h3>
      <p class="quiz-card__description">{{ item.description }}</p>
      <div class="quiz-card__footer">
        <div v-if="level" :class="['quiz-card__level', level.className]">
          <div v-for="circle in item.level" class="quiz-card__level-circle" />
          <span class="quiz-card__level-text">ур. {{ level.text }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
import type { IQuizItem } from '~/types/pages/quiz'

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

const props = defineProps<{
  item: IQuizItem,
}>()

const level = computed(() => {
  return levelObject[props.item.level]
})
</script>
<style lang="scss" scoped>
.quiz-card {
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

  &__description {
    color: black;
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
    .quiz-card__level-circle {
      background-color: $brand_yellow;
    }
    .quiz-card__level-text {
      color: $brand_yellow;
    }
  }
  .blue {
    .quiz-card__level-circle {
      background-color: $blue;
    }
    .quiz-card__level-text {
      color: $blue;
    }
  }
  .purple {
    .quiz-card__level-circle {
      background-color: $purple;
    }
    .quiz-card__level-text {
      color: $purple;
    }
  }
}
</style>