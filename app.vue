<template>
  <AppHeader v-if="showHeader" />
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
  <AppFooter v-if="showFooter" />
</template>
<script lang="ts" setup>

const route = useRoute()
const showHeader = computed(() => {
  const restricted = ['/exchanger']
  return !restricted.includes(route.path);
})
const showFooter = computed(() => {
  const restricted = ['/guideStartTrading', '/exchanger']
  return !restricted.includes(route.path);
})

useHead({
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