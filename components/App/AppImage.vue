<template>
  <nuxt-img :src="src" :width="width" :height="height" :preloa="preload"/>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
const props = defineProps<{
  image: string,
  width?: string,
  height?: string,
  preload?: string | Record<string, any>
}>()

const src = computed(() => `${config.public.ASSETS_IMAGE_BUCKET}/${props.image}`)
</script>