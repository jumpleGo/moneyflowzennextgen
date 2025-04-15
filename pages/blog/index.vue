<template>
  <div class="blog">
    <h1 class="blog__title">Блог</h1>
    <div class="blog__chips">
      <AppChip v-for="levelFilter in levelFilters" :key="`level-filter-${levelFilter.key}`" :item="levelFilter"/>
    </div>

  <div class="blog-wrapper">
    <BlogCard v-for="blogItem in data" :item="blogItem" :read="getRead(blogItem.key)" class="blog-wrapper__card" />
  </div>
  </div>
</template>
<script lang="ts" setup>
const levelFilters = [
  {
    key: 1,
    text: 'новичок',
    image: 'level1.svg'
  },
  {
    key: 2,
    text: 'продвинутый',
    image: 'level2.svg',
  },
  {
    key: 3,
    text: 'сложный',
    image: 'level3.svg',
  }
]
const { data } = await useFetch('/api/blog')
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
.blog {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__title {
    font-size: 28px;
    margin-bottom: 45px;
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  &__chips {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
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
