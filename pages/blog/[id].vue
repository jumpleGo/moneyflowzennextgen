<template>
  <AppScrollProgress />
  <div class="article-wrapper">
    <div class="article-wrapper__body">
      <BlogAuthor />
      <div class="article-wrapper__body-header">
        <h2 class="article-wrapper__body-title">{{ data?.title }}</h2>
        <span class="article-wrapper__body-date">22.20.2020</span>
        <span v-if="data?.views" class="article-wrapper__body-view">{{ data?.views }} просмотр</span>
      </div>
      <article v-html="data?.text" class="article-wrapper__body-article" />
      <AppLike :count="data?.likes" u-key="article"  :unique="postId" @like="incrementLike" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Getter } from '~/helpers/getter'
import BlogAuthor from '~/components/Blog/BlogAuthor.vue'
import { Setter } from '~/helpers/setter'
import { debounce } from '~/helpers/debounce'
import AppScrollProgress from '~/components/App/AppScrollProgress.vue'
definePageMeta({
  layout: 'blog'
})
const route = useRoute()
const viewedArticles = useCookie<string[]>('viewedArticles', {
  default: () => []
})
const isArticleViewed = computed(() => viewedArticles.value.some(item => item === postId))
const postId = route.params.id as string;

const { data } = useAsyncData(async () => {
  const fetchedArticle = await Getter.getByValue('/blog', String(postId), 'key')
  console.log(fetchedArticle)

  return fetchedArticle?.[0] || {}
})

onMounted(() => {
  if (!isArticleViewed.value) {
    incrementView()
  }
})

useHead({
  title: data.value?.title,
})

const incrementView = () => {
  if (!data.value) return
  const objectUrl = `blog/${data.value.index}`
  const updatedView = {...data.value, views: (data.value.views || 0)+1}
  const updates = {
    [objectUrl]: updatedView
  }

  Setter.updateToDb(updates)
  if (!data.value.views) data.value.views = 1
  else data.value.views+=1

  if (!viewedArticles.value.find(item => item === postId)) {
    viewedArticles.value.push(postId)
  }
}

const incrementLike = () => {
  if (!data.value) return
  const objectUrl = `blog/${data.value.index}`
  const updatedView = {...data.value, likes: (data.value.likes || 0)+1}
  const updates = {
    [objectUrl]: updatedView
  }

  Setter.updateToDb(updates)
  if (!data.value.likes) data.value.likes = 1
  else data.value.likes+=1
}
</script>
<style lang="scss" scoped>
.article-wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;


  &__body {
    color: white;
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
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