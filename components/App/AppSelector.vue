<template>
  <div class="app_selector">
    <div :class="['app_selector__input', {'error': error}]" @click="isOpenList = true">
      <span v-if="modelValue.name">{{ modelValue.name }}</span>
      <span v-else class="--placeholder">{{ placeholder }}</span>
      <img src="/assets/down-arrow.png" :class="['app_selector__icon', {'--opened': isOpenList}]" />
    </div>
    <div v-if="isOpenList" class="app_selector__items">
      <div :class="['app_selector__item', {'--active': option.key === modelValue.key}]" v-for="option in options" :key="option.key" @click="selectItem(option)" >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>


import type { IOption } from '~/components/App/types'
const emit = defineEmits<{
  (e: 'update:modelValue', option: IOption): void
}>()
const props = withDefaults(defineProps<{
  options: IOption[],
  placeholder?: string,
  id: string,
  modelValue: IOption,
  error?: boolean
}>(), {

})

const isOpenList = shallowRef(false)
const selectItem = (option: IOption) => {
  emit('update:modelValue', option)
  isOpenList.value = false
}
</script>
<style lang="scss" scoped>
.app_selector {
  display: flex;
  position: relative;
  width: 100%;
  &__items {
    position: absolute;
    left: 0;
    width: 100%;
    top: 45px;
    border-radius: 51px;
    z-index: 2;
  }

  &__item {
    padding: 10px 20px;
    background: white;
    border: 1px solid rgba(0,0,0, 0.1);

    &:hover {
      cursor: pointer;
      border: 1px solid $brand_yellow;
      background: rgb(255, 240, 199);
    }
  }

  &__icon {
    position: absolute;
    right: 20px;
    width: auto;
    height: 20px;
    top: 12px;
    transform: rotate(0deg);
    transition: 0.2s;
  }

  .--active {
    border: 1px solid $brand_yellow;
    background: rgb(255, 240, 199);
  }
  .--placeholder {
    color: #cecece
  }
  .--opened {
    transform: rotate(-180deg);
    transition: 0.2s;
  }
}

.app_selector__input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 400;
  outline: unset;
  border: 1px solid $brand_yellow;
  background: white;
  position: relative;

  &:hover {
    cursor: pointer;
  }
}

.error {
  border: 1px solid $error;
}
.slot {
  text-align: right;
}
.slot-error {
  font-size: 13px;
  color: $error
}
</style>