<template>
<!--  <LandscapePrevent />-->
  <AppHeader v-if="showHeader" />
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
  <AppFooter v-if="showFooter" />
  <AppPopup v-if="showModal" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '~/stores/main'


onMounted(() => {
  window.Telegram.WebApp.webAppVersion = '8.0'
  window.Telegram.WebApp?.setHeaderColor('#000')
  window.Telegram.WebApp?.requestFullscreen()
  window.Telegram.WebApp?.lockOrientation()


})

const {showModal} = storeToRefs(useMainStore())
const route = useRoute()
const showHeader = computed(() => {
  const restricted = ['/exchanger', '/adminex']
  return !restricted.includes(route.path);
})
const showFooter = computed(() => {
  const restricted = ['/guideStartToTrading', '/exchanger', '/gift']
  return !restricted.includes(route.path);
})

useHead({
  script:[{
    src: "https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/tg.js?alt=media&token=fc229fac-3f8c-45c6-be5c-7d30dd93c4d9"
  }],
  meta: [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
  }]
})
</script>
<style lang="scss">
body {
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  background: black;
  background-image: url("assets/dotBG.svg");
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}
#app {
  display: flex;
  height: 100%;
  width: 100vw;
  max-width: unset;
  padding: unset;
}
</style>