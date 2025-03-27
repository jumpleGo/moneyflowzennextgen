<template>
  <div class="prev-next-article">
    <h3>Читать далее:</h3>
    <div :class="['prev-next-article__body', classByArticles]">
      <nuxt-link v-if="prevArticle" :to="`/blog/${prevArticle.key}`" class="prev-next-article__prev">
        <nuxt-img :src="chevron" class="prev-next-article__image prev-next-article__image-prev" />
        <div class="prev-next-article__prev-title">
          {{ prevArticle.title }}
        </div>
      </nuxt-link>
      <nuxt-link v-if="nextArticle" :to="`/blog/${nextArticle.key}`" class="prev-next-article__next">
        <div class="prev-next-article__next-title">
          {{ nextArticle.title }}
        </div>
        <nuxt-img :src="chevron" class="prev-next-article__image" />
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBlogItem } from '~/types/pages/blog'
import { chevron } from 'assets/imagesSrc'

const props = defineProps<{
  prevArticle?: IBlogItem,
  nextArticle?: IBlogItem
}>()

const classByArticles = computed(() => {
  if (props.prevArticle && !props.nextArticle) return 'prev-next-article__only-prev'
  if (!props.prevArticle && props.nextArticle) return 'prev-next-article__only-next'
})
</script>
<style  lang="scss" scoped>
.prev-next-article {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__only-next {
    justify-content: flex-end;
  }

  &__image-prev {
    transform: rotate(180deg);
  }

  &__prev, &__next {
    width: 45%;
    border: 2px solid white;
    border-radius: 16px;
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      border-color: $brand-yellow;
    }
  }

  &__prev-title {
    text-align: right;
  }
  &__prev {
    padding: 10px 15px 10px 0;
  }
  &__next {
    padding: 10px 0 10px 15px;
  }
}
</style>