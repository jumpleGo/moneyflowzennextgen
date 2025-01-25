<template>
<!--  <LandscapePrevent />-->
  <AppUserTelegam v-if="isUserFilled && showHeader" />
  <AppHeader v-if="showHeader" />
  <NuxtLayout name="default" :style="isFullscreen && {height: '100vh', overflow: 'hidden'}">
    <NuxtPage/>
  </NuxtLayout>
  <AppFooter v-if="showFooter" />
  <AppPopup v-if="showModal" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '~/stores/main'
import { useUserStore } from '~/stores/user'
import AppUserTelegam from '~/components/App/AppUserTelegam.vue'

const {user, isUserFilled, isFullscreen} = storeToRefs(useUserStore())

if (process.client) {
  const webApp = window.Telegram?.WebApp
  if (webApp) {
    webApp?.ready()
    user.value = webApp?.initDataUnsafe?.user
    webApp?.lockOrientation()
    webApp?.disableVerticalSwipes()
    webApp?.expand()
    webApp?.requestFullscreen()

    webApp?.onEvent('fullscreenChanged', () => {
      isFullscreen.value = window.Telegram?.WebApp.isFullscreen
    })
  }
}

const {showModal} = storeToRefs(useMainStore())
const route = useRoute()
const showHeader = computed(() => {
  const restricted = ['/exchanger', '/adminex', '/exchanger/history']
  return !restricted.includes(route.path);
})
const showFooter = computed(() => {
  const restricted = ['/guideStartToTrading', '/exchanger', '/gift', '/exchanger/history']
  return !restricted.includes(route.path);
})

useHead({
  script:[{
    src: "https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/tg.js?alt=media&token=fc229fac-3f8c-45c6-be5c-7d30dd93c4d9",
    defer: true
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