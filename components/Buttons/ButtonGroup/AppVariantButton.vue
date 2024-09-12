<template>
  <div v-if=" props.type === 'radio' ">
    <input :id="id" :type="type" />
    <label :for="id"></label>
  </div>
  <div v-else>
    <button>{{ modelValue.text }}</button>
  </div>
</template>
<script lang="ts" setup>
import { makeId } from '@/helpers/generator'
import type { IVariant } from '@/components/Buttons/ButtonGroup/types'

const id = makeId(4)

const props = withDefaults(defineProps<{
  modelValue: IVariant,
  type: 'radio' | 'variant'
}>(), {

})
</script>