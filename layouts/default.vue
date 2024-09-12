<template>
  <div class="mfz_wrapper wrapper">
    <slot />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
<style lang="scss" scoped>
.mfz_wrapper {
  display: flex;
  width: 100vw;
  flex-direction: column;
}
.mfz_wrapper__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  flex: 1;
}

</style>