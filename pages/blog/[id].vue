<template>
  <AppScrollProgress v-if="article" read-block="article" @read80percent="markAsRead" />
  <div v-if="data" class="article-wrapper" :key="postId">
    <div class="article-wrapper__body">
      <BlogAuthor @open-tg-list="showTgList = true" />
      <div id="article" class="article-wrapper__article-body" ref="article">
        <div class="article-wrapper__body-header">
          <h2 class="article-wrapper__body-title">{{ data?.title }}</h2>
          <ClientOnly>
            <span v-if="data?.updatedAt" class="article-wrapper__body-date">{{ new Date(data?.updatedAt * 1000).toLocaleDateString() }}</span>
          </ClientOnly>
          <span v-if="data?.views" class="article-wrapper__body-view">{{ getNumberWithWordEnding(data?.views, ['просмотр', 'просмотра', 'просмотров']) }}</span>
          <span v-if="data?.views" class="article-wrapper__body-view">{{ getNumberWithWordEnding(data?.reads, ['дочитывание', 'дочитывания', 'дочитываний']) }}</span>
        </div>
        <nuxt-img v-if="data?.image" :preload="{fetchPriority: 'high'}" :src="data.image" class="article-wrapper__body-image" />
        <article v-html="data?.text" class="article-wrapper__body-article" />
      </div>
      <ClientOnly>
        <AppLike :count="data?.likes" :liked="isArticleLiked" @like="incrementLike" />
      </ClientOnly>
      <PrevNextArticle v-if="data.nextArticle || data.prevArticle" :next-article="data.nextArticle" :prev-article="data.prevArticle" />
    </div>
  </div>
  <AppFunctionalModal v-show="showTgList" @close="showTgList = false" />
</template>

<script lang="ts" setup>
import BlogAuthor from '~/components/Blog/BlogAuthor.vue'
import { Setter } from '~/helpers/setter'
import AppScrollProgress from '~/components/App/AppScrollProgress.vue'
import { getNumberWithWordEnding } from '~/helpers/date'
import PrevNextArticle from '~/components/Blog/PrevNextArticle.vue'

definePageMeta({
  layout: 'blog'
})

const showTgList = shallowRef(false)
const route = useRoute()
const article = ref()
const viewedArticles = useCookie<string[]>('viewedArticles', {
  default: () => []
})
const readArticles = useCookie<string[]>('readArticles', {
  default: () => []
})
const likedArticles = useCookie<string[]>('likedArticles', {
  default: () => []
})

const isArticleViewed = computed(() => viewedArticles.value?.some(item => item === postId))
const isArticleRead = computed(() => readArticles.value?.some(item => item === postId))
const isArticleLiked = computed(() => likedArticles.value?.some(item => item === postId))


const postId = route.params.id as string;

const { data } = await useFetch(`/api/blog/${postId}`)


onMounted(() => {
  if (!isArticleViewed.value) {
    incrementViews()
  }
})


useHead(computed(() => ({
  title: data.value?.title,
  description: data.value?.description,
  meta: [
    { property: 'og:title', content: data.value?.ogtitle },
    { name: 'title', content: data.value?.title },
    { property: 'og:description', content: data.value?.ogdescription },
    { name: 'description', content: data.value?.description },
    { property: 'og:image', content: data.value?.image },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://moneyflowzen.ru/blog/${postId}` },
  ]
})))

const incrementViews = () => {
  if (!data.value) return
  incrementDBStats('views')

  if (!isArticleViewed.value) {
    viewedArticles.value.push(postId)
  }
}
const incrementDBStats = async (type: 'views' | 'reads' | 'likes') => {
  if (!data.value) return
  await Setter.incrementByKey('blog', data.value?.index, type)
}

const incrementLike = () => {
  if (!data.value) return
  incrementDBStats('likes')
  if (!data.value.likes) data.value.likes = 1
  else data.value.likes+=1

  if (!isArticleLiked.value) {
    likedArticles.value.push(postId)
  }
}

const incrementRead = () => {
  if (!data.value) return
  incrementDBStats('reads')

  if (!isArticleRead.value) {
    readArticles.value.push(postId)
  }
}

const markAsRead = () => {
  if (!isArticleRead.value) incrementRead()
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