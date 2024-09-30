<template>
  <div :class="['blur', {'show-blur': modelValue && modelValue < maxClickCount}]" />
  <div v-if="modelValue" :class="['counter', {'showCounter': modelValue}]">
    <div v-if="modelValue < maxClickCount" class="counter__count counter__count--count">{{modelValue}}</div>
    <div v-if="modelValue < maxClickCount" class="counter__count"> / {{ maxClickCount }}</div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps<{
  modelValue: number,
  maxClickCount: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const value = computed({
  get:() => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
onMounted(() => {
  window.addEventListener('click', clickHandler)
  window.addEventListener('touchstart', clickHandler)
})

watch(value, (v) => {
  if (v >= props.maxClickCount) {
    window.removeEventListener('click', clickHandler)
    window.removeEventListener('touchstart', clickHandler)
  }
})

const clickHandler = (event) => {
  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY

  const one = document.createElement('span')
  one.classList.add('one')
  one.classList.add('fly-up')
  one.appendChild(document.createTextNode('1'))
  one.style.cssText = `position:absolute;left:${clientX}px;top:${clientY}px`

  value.value+=1
  document.body.appendChild(one)
  setTimeout(() => {
    document.body.removeChild(one)
  }, 2000)

}
</script>
<style lang="scss" scoped>
.blur {
  width: 10000%;
  height: 10000%;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.4s;
  //box-shadow: 0px 0px 3500px 2000px $brand_yellow;
  opacity: 0;
  background: $brand_yellow;
  z-index: -1;

  &:hover {
    cursor: pointer;
  }
}
.show-blur {
  opacity: 0.5;
  z-index: 100;
  touch-action: manipulation;
  -ms-touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

}

.counter {
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  right: 0;
  top: calc(50% + 150px/2);
  color: white;
  opacity: 0.3;
  left: 0;
  text-align: center;

  @include mobile-all {
    top: 60vh;
  }
}


.showCounter {
  display: flex;
  @include mobile-all {
    right: 0;
  }
}

.counter__text, .counter__count, .counter__rocket {
  text-transform: uppercase;
  font-weight: 700;
}
.counter__count--count {
  width: 200px;
  @include mobile-all {
    width: 100px;
  }
}
.counter__count {
  font-size: 150px;
  text-align: center;
  @include mobile-all {
    font-size: 100px;
  }
}
</style>