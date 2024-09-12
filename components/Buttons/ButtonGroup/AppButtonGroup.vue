<div>
  <AppVariantButton v-for="variant in variants" v-model="variant" :key="variant.id" :type="type" />
</div>
<script setup lang="ts">
import type { IVariant } from '@/components/Buttons/ButtonGroup/types'
import AppVariantButton from '@/components/Buttons/ButtonGroup/AppVariantButton.vue'

const props = withDefaults(defineProps<{
  variants: IVariant[],
  type: 'radio' | 'variant'
}>(), {

})
</script>