import {computed, ref} from 'vue'
import { defineStore } from 'pinia'


export const useDetailInfoStore = defineStore('detail', () => {
  const route = useRoute()
  const products = ref([])
  const productsActive = computed(() => products.value?.filter(item => item.active))

  const currentProductName = ref('')

  const currentProduct = computed(() => products.value.find(item => item.link === route.params.id))

  return { productsActive,products, currentProductName, currentProduct }
})
