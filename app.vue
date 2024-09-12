<template>
  <AppHeader />
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
  <AppFooter v-if="route.path !== '/guideStartTrading'" />
</template>
<script lang="ts" setup>
const route = useRoute()
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