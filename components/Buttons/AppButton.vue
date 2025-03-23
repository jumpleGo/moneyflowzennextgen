<template>
  <component :is="componentButton" :disabled="disabled" :href="props.to" :to="props.to" :class="['app__button', buttonClass, classBySize, {'--fluid': fluid}, {'--disabled': disabled}]" target="_blank">
    {{ props.title }}
    </component>
</template>
<script lang="ts" setup>
import {computed} from "vue";

interface IDefaultYellowButton {
  title: string,
  fluid?: boolean,
  loading?: boolean,
  type?: 'yellow' | 'black',
  to?: string,
  disabled?: boolean
  size?: 'xs' | 'md' | 'lg'
}
const props = withDefaults(defineProps<IDefaultYellowButton>(), {
  title: 'Открыть',
  fluid: false,
  type: 'yellow',
  size: 'lg'

})
const classByType = {
  yellow: 'button__main',
  black: 'button__black'
}

const classBySize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'button__xs'
    case 'md':
      return 'button__md'
    case 'lg':
      return 'button__lg'
  }
})

const componentButton = computed(() => props.to ? props.to.startsWith('http') ? 'a' : 'nuxt-link' : 'button')
const buttonClass = computed(() => classByType[props.type])
</script>
<style lang="scss" scoped>
.button__main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: $brand_yellow;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.31);
  text-transform: uppercase;
  border-radius: 20px;
  font-weight: 700;
  border: unset;
}

.button__lg {
  padding: 16px 20px;
  font-size: 16px;
  @include mobile-all {
    font-size: 14px;
  }
}

.button__md {
  padding: 12px 16px;
  font-size: 14px;
  @include mobile-all {
    font-size: 12px;
  }
}

.button__xs {
  padding: 8px 10px;
  font-size: 12px;
  @include mobile-all {
    font-size: 10px;
  }
}

.button__black {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: black;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.31);
  text-transform: uppercase;
  border-radius: 20px;
  font-weight: 700;
  border: unset;
}

.--fluid {
  width: 100%
}

.--disabled {
  opacity: 0.5;
  background-color: $brand_yellow;
  backdrop-filter: grayscale(5px);

}
</style>