<template>
  <div class="app_input">
    <label :for="id" class="app_input__label">{{ label }}</label>
    <div class="app_input__label-wrapper">
      <input
        v-model="modelValueRef"
        :disabled="disabled"
        :id="id"
        v-bind="rules"
        :placeholder="placeholder"
        :class="['app_input__input', {'error': error}]"
        @blur="emit('blur')"
        autocomplete="off" />
      <span v-if="paste && !modelValue" class="app_input__paste" @click="onPaste">Вставить</span>
    </div>
    <div class="slots">
      <div class="slot-error">
        <slot name="error" />
      </div>
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur' ): void
}>()
const props = withDefaults(defineProps<{
  id: string,
  placeholder?: string,
  label?: string,
  modelValue?: string | number,
  rules?: Record<string, any>,
  error?: boolean,
  disabled?: boolean,
  editable?: boolean
  paste?: boolean
}>(), {
  editable: true
})

const modelValueRef = useModel(props,  'modelValue')
const onPaste = async () => {
  const text = await navigator.clipboard.readText()
  if (text) {
    emit('update:modelValue', text)
  }
}

</script>
<style lang="scss" scoped>
.app_input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__label {
    @include mobile-all {
      font-size: 14px;
    }
  }
  &__paste {
    position: absolute;
    color: $brand-yellow;
    bottom: 12px;
    right: 15px;
    &:hover {
      cursor: pointer;
    }

    @include mobile-all {
      font-size: 12px;
    }
  }
  &__label-wrapper {
    display: flex;
    width: 100%;
    position: relative;
  }
  &__input {
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 400;
    outline: unset;
    border: 1px solid $brand_yellow;
    width: 100%;
    @include mobile-all {
      font-size: 16px;
    }
  }
}

.error {
  border: 1px solid $error;
}
.slots {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile-all {
    font-size: 12px;
  }
}
.slot {
  text-align: right;
}
.slot-error {
  font-size: 13px;
  color: $error;
  @include mobile-all {
    font-size: 12px;
  }
}
</style>