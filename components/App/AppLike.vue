<template>
  <div>
    <div :class="['app-like', {'app-like--visible': showBlock}, {'app-like--active': liked}]" @click="like">
      <AppImage v-show="liked" :preload="{fetchPriority: 'high'}" :image="activeLikeUrl" class="app-like__image" @load="showBlock = true"/>
      <AppImage v-show="!liked" :image="likeUrl" :preload="{fetchPriority: 'high'}" class="app-like__image" @load="showBlock = true"/>
      <span class="app-like__count">{{ count }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
const likeUrl = 'ui/heart.png'
const activeLikeUrl = 'ui/heart-active.png'
const emit = defineEmits<{
  (e: 'like'): void
}>()
const props = withDefaults(defineProps<{
  count?: number,
  unique: string,
  uKey: string,
  liked: boolean
}>(), {
  count: 0
})

const showBlock = shallowRef(false)


const like = () => {
  if (props.liked) return
  emit('like')
}
</script>
<style lang="scss" scoped>
.app-like {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  gap: 5px;
  border: 1px solid white;
  width: fit-content;
  border-radius: 16px;
  opacity: 0;
  transition: 0.1s;
  &--visible {
    opacity: 1;
  }
  &--active {
    border-color: $brand_yellow;
  }
  &__count {
    font-size: 14px;
    font-weight: 300;
  }
  &__image {

  }
}
</style>