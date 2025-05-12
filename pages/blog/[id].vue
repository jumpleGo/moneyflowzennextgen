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
          <span v-if="data?.views" class="article-wrapper__body-view"><AppImage image="ui/visible.png" /> {{ data?.views }}</span>
        </div>
        <nuxt-img v-if="data?.image" preload :src="data.image" class="article-wrapper__body-image" />
        <HtmlWithComponents id="article-body" :content="data?.text" class="article-wrapper__body-article"/>
      </div>
      <ClientOnly>
        <AppLike :count="data?.likes" :liked="isArticleLiked" @like="incrementLike" />
      </ClientOnly>
      <BonusBanner />
      <PrevNextArticle v-if="data.nextArticle || data.prevArticle" :next-article="data.nextArticle" :prev-article="data.prevArticle" />
    </div>
  </div>
  <AppFunctionalModal v-show="showTgList" @close="showTgList = false" />
</template>

<script lang="ts" setup>
import BlogAuthor from '~/components/Blog/BlogAuthor.vue'
import { Setter } from '~/helpers/setter'
import AppScrollProgress from '~/components/App/AppScrollProgress.vue'
import PrevNextArticle from '~/components/Blog/PrevNextArticle.vue'
import HtmlWithComponents from '~/components/Blog/HtmlWithComponents.vue'
import { useSchemaOrg } from '@unhead/schema-org/vue'
import Countdown from '~/components/Blog/banners/Countdown.vue'
import BonusBanner from '~/components/Blog/banners/BonusBanner.vue'



definePageMeta({
  layout: 'blog'
})

const showTgList = shallowRef(false)
const route = useRoute()
const article = ref()
const viewedArticles = useCookie<string[]>('viewedArticles', {
  default: () => [],
  maxAge: 60 * 60 * 24 * 365 * 10

})
const readArticles = useCookie<string[]>('readArticles', {
  default: () => [],
  maxAge: 60 * 60 * 24 * 365 * 10
})
const likedArticles = useCookie<string[]>('likedArticles', {
  default: () => [],
  maxAge: 60 * 60 * 24 * 365 * 10
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
    { property: 'og:image', content: data.value?.preview },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://moneyflowzen.ru/blog/${postId}` },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moneyflowzen.ru/blog/${postId}`
    }
  ]
})))

useSchemaOrg({
  '@type': 'Article',
  headline: data.value?.ogtitle,
  description: data.value?.ogdescription,
  datePublished: new Date(data.value?.createdAt * 1000).toISOString(),
  dateModified: new Date(data.value?.updatedAt * 1000).toISOString(),
  author: {
    '@type': 'Person',
    name: 'Emil Latypov',
    jobTitle: 'Профессиональный трейдер',
  },
  publisher: {
    '@type': 'Organization',
    name: 'MoneyFlowZen',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cdn.moneyflowzen.ru/logos/logo.png',
      width: '60',
      height: '60'
    }
  },
  image: {
    '@type': 'ImageObject',
    url: data.value?.preview ,
    width: '1280',
    height: '720'
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://moneyflowzen.ru/blog/${data.value?.key}`
  },
  articleSection: 'Трейдинг',
  articleBody: data.value?.text,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#article-body']
  },
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: {
      "@type": "LikeAction"
    },
    userInteractionCount: data?.value?.likes
  }
})

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
    font-size: 40px;
  }

  &__body-date {
    color: gray;
  }
  &__body-view {
    color: gray;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

}
</style>
