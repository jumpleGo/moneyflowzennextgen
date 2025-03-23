<template>
  <AppHeader v-if="showHeader" />
  <div class="mfz_wrapper wrapper">
    <slot />
  </div>
  <AppFooter v-if="showFooter" />
</template>
<script setup lang="ts">
const route = useRoute()
const showHeader = computed(() => {
  const restricted = ['/exchanger', '/adminex']
  return !restricted.includes(route.path);
})
const showFooter = computed(() => {
  const restricted = ['/guideStartToTrading', '/exchanger', '/gift']
  return !restricted.includes(route.path);
})
</script>
<style lang="scss" scoped>
.mfz_wrapper {
  width: 100vw;
  padding: 100px 0 0;
}

</style>