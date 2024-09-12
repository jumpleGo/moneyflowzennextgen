<template>
  <div class="app_input">
    <label :for="id" class="app_input__label">{{ label }}</label>
    <input v-model="model" :id="id" v-bind="rules" :placeholder="placeholder" class="app_input__input" />
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const props = withDefaults(defineProps<{
  id: string,
  placeholder?: string,
  label?: string,
  modelValue: string | number,
  rules?: Record<string, any>
}>(), {

})

const model = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>
<style lang="scss" scoped>

.app_input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__label {

  }
  &__input {
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 400;
    outline: unset;
    border: 1px solid $brand_yellow;
  }
}
.slot {
  text-align: right;
}
</style>