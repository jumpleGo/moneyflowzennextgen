<template>
  <div class="blog-card">
    <span class="blog-card--read product__attention">прочитано</span>
    <nuxt-img height="150px" fit src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" />
    <div class="blog-card__content">
      <nuxt-link :to="`blog/${item.key}`" class="blog-card__title">{{ item.title }}</nuxt-link>
      <div class="blog-card__footer">
        <div class="blog-card__time">
          <nuxt-img src="https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/ui%2Fclock.png?alt=media&token=4e7d5657-245e-4e05-b834-4ce03a6db797" />
          {{ item.time }}
          мин.
        </div>
        <div :class="['blog-card__level', level.className]">{{ level.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const levelObject: {[key: number]: Record<string, string>;} = {
  1: {
    text: 'базовый',
    className: 'yellow-text'
  },
  2: {
    text: 'продвинутый',
    className: 'blue-text'
  },
  3: {
    text: 'опытный',
    className: 'purple-text'
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
  item: IBlogItem
}>()

const level = computed(() => {
  return levelObject[props.item.level]
})
</script>
<style lang="scss" scoped>
.blog-card {
  border-radius: 20px;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 300px;

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

  &__title {

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
    gap: 3px
  }
  &__level {

  }
}
</style>