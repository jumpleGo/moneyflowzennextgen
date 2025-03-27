<template>
  <div class="blog-wrapper">
    <BlogCard v-for="blogItem in data" :item="blogItem" :read="getRead(blogItem.key)" class="blog-wrapper__card" />
  </div>
</template>
<script lang="ts" setup>
import { Getter } from '~/helpers/getter'

const {data} = useAsyncData(async () => {
  return await Getter.getFromDB('/blog')
})
const readArticles = useCookie<string[]>('readArticles', {
  default: () => []
})
const getRead = (key: string) => {
  return readArticles.value.some(item => item === key)
}

useHead({
  title: 'Блог | Money Flow Zen'
})
</script>
<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 100px 40px;
  max-width: 1240px;
  margin: 0 auto;

  @include mobile-all {
    padding: 30px 20px;
  }

  @include tablet {

  }
}
</style>
