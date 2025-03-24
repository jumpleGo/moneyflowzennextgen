<template>
  <AppScrollProgress v-if="article" read-block="article" @read80percent="markAsRead" />
  <div class="article-wrapper" :key="postId">
    <div class="article-wrapper__body">
      <BlogAuthor />
      <div id="article" class="article-wrapper__article-body" ref="article">
        <div class="article-wrapper__body-header">
          <h2 class="article-wrapper__body-title">{{ data?.title }}</h2>
          <span v-if="data?.updatedAt" class="article-wrapper__body-date">{{ new Date(data?.updatedAt * 1000).toLocaleDateString() }}</span>
          <span v-if="data?.views" class="article-wrapper__body-view">{{ getNumberWithWordEnding(data?.views, ['просмотр', 'просмотра', 'просмотров']) }}</span>
          <span v-if="data?.views" class="article-wrapper__body-view">{{ getNumberWithWordEnding(data?.reads, ['дочитывание', 'дочитывания', 'дочитываний']) }}</span>
        </div>
        <nuxt-img v-if="data?.image" preload="high" :src="data.image" class="article-wrapper__body-image" />
        <article v-html="data?.text" class="article-wrapper__body-article" />
      </div>
      <AppLike :count="data?.likes" u-key="article"  :unique="postId" @like="incrementLike" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Getter } from '~/helpers/getter'
import BlogAuthor from '~/components/Blog/BlogAuthor.vue'
import { Setter } from '~/helpers/setter'
import AppScrollProgress from '~/components/App/AppScrollProgress.vue'
import { getNumberWithWordEnding } from '~/helpers/date'
import type { IBlogItem } from '~/types/pages/blog'
import { post } from 'axios'
definePageMeta({
  layout: 'blog'
})
const route = useRoute()
const article = ref()
const viewedArticles = useCookie<string[]>('viewedArticles', {
  default: () => []
})
const readArticles = useCookie<string[]>('readArticles', {
  default: () => []
})
const isArticleViewed = computed(() => viewedArticles.value.some(item => item === postId))
const isArticleRead = computed(() => readArticles.value.some(item => item === postId))
const postId = route.params.id as string;

const { data } = useAsyncData(async () => {
  const fetchedArticle = await Getter.getByValue('/blog', String(postId), 'key')

  return Object.values(fetchedArticle)?.[0] as IBlogItem || {}
})

onMounted(() => {
  if (!isArticleViewed.value) {
    incrementViews()
  }
})


watch(data, (newData) => {
  if (newData && newData.title) {
    useHead({
      title: newData.title,
      meta: [
        { name: 'title', content: newData.title },
        { property: 'og:title', content: newData.title },
        { property: 'og:image', content: newData.image },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `https://moneyflowzen.ru/blog/${postId}` }
      ]
    })
  }
}, { immediate: true })

const incrementViews = () => {
  if (!data.value) return
  incrementDBStats('views')

  if (!viewedArticles.value.find(item => item === postId)) {
    viewedArticles.value.push(postId)
  }
}
const incrementDBStats = (type: 'views' | 'reads' | 'likes') => {
  if (!data.value) return
  const objectUrl = `blog/${data.value?.index}`
  const updatedView = {...data.value, [type]: (data.value?.[type] || 0)+1}
  const updates = {
    [objectUrl]: updatedView
  }

  Setter.updateToDb(updates)
}

const incrementLike = () => {
  if (!data.value) return
  incrementDBStats('likes')
  if (!data.value.likes) data.value.likes = 1
  else data.value.likes+=1
}

const incrementRead = () => {
  if (!data.value) return
  incrementDBStats('reads')

  if (!readArticles.value.find(item => item === postId)) {
    readArticles.value.push(postId)
  }
}

const markAsRead = () => {
  if (isArticleRead.value) return
  incrementRead()
}
</script>
<style lang="scss" scoped>
.article-wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;

  &__article-body {
    display: flex;
    flex-direction: column;
  }


  &__body {
    color: white;
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__body-image {
    margin: 20px 0;
  }

  &__body-header {
    display: flex;
    flex-direction: column;
  }

  &__body-title {
    margin-bottom: 10px;
    margin-top: unset;
  }

  &__body-date {
    color: gray;
  }
  &__body-view {
    color: gray;
  }

}
</style>
<style>
@import '../../style/blog.scss';
</style>