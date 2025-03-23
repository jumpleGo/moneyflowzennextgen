<template>
  <div class="blog-wrapper">
    <BlogCard v-for="blogItem in data" :item="blogItem" class="blog-wrapper__card" />
  </div>
</template>
<script lang="ts" setup>
import { Getter } from '~/helpers/getter'

const {data} =  useAsyncData(async () => {
  return await Getter.getFromDB( 'blog/')
})
</script>
<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* чтобы элементы были слева */
  gap: 16px;

  &__card {
    flex: 0 0 calc(33.333% - 10.66px);

    @include mobile {
      flex: 0 0 100%;
    }
  }


}
</style>
