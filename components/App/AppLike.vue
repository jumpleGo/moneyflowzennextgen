<template>
  <div>
    <div :class="['app-like', {'app-like--visible': showBlock}, {'app-like--active': isLiked}]" @click="like">
      <nuxt-img v-show="isLiked" preload="high" :src="activeLikeUrl" class="app-like__image" @load="showBlock = true"/>
      <nuxt-img v-show="!isLiked" :src="likeUrl" preload="high" class="app-like__image" @load="showBlock = true"/>
      <span class="app-like__count">{{ count }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
const likeUrl = 'https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/ui%2Fheart.png?alt=media&token=c0f5d118-06cb-407e-b8a0-b814316dcab4'
const activeLikeUrl = 'https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/ui%2Fheart-active.png?alt=media&token=124a3c19-f01d-4eb5-a8f6-74577986e1f9'
const emit = defineEmits<{
  (e: 'like'): void
}>()
const props = withDefaults(defineProps<{
  count?: number,
  unique: string,
  uKey: string
}>(), {
  count: 0
})

const showBlock = shallowRef(false)

const likeCookie = useCookie('like')
const currentKey = `${props.uKey}-${props.unique}`
const isLiked = computed(() => likeCookie.value === currentKey)

const like = () => {
  if (isLiked.value) return
  likeCookie.value = currentKey
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