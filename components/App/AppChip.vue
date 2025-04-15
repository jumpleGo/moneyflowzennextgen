<template>
  <div class="app-chip" @click="emit('select', item.key)">
    <AppImage v-if="item.image" :image="item.image" width="16" height="16"/>
    <p class="app-chip__text">{{ item.text }}</p>
  </div>
</template>
<script lang="ts" setup>
interface IChip {
  key: number,
  text: string,
  image?: string
}

const props = defineProps<{
  item: IChip,
}>()

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()
</script>
<style lang="scss" scoped>
.app-chip {
  display: flex;
  gap: 5px;
  padding: 8px 12px;
  font-size: 14px;
  color: black;
  background-color: white;
  border-radius: 8px;

  &__text {
    margin: unset;
  }
}
</style>