<template>
  <div class="blog-wrapper">
    <BlogCard v-for="blogItem in data" :item="blogItem" :read="getRead(blogItem.key)" class="blog-wrapper__card" />
  </div>
</template>
<script lang="ts" setup>
import { Getter } from '~/helpers/getter'

const {data} =  useAsyncData(async () => {
  return await Getter.getBlog()
})
const readArticles = useCookie<string[]>('readArticles', {
  default: () => []
})
const getRead = (key: string) => {
  return readArticles.value.some(item => item === key)
}
</script>
<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @include mobile-all {
    padding: 30px 20px;
  }

  @include tablet {

  }

  &__card {
    flex: 0 0 calc(33.333% - 10.66px);

    @include mobile-all {
      flex: 0 0 100%;
    }
  }


}
</style>
