import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'


export const useDetailInfoStore = defineStore('detail', () => {
  const products = ref([])
  const productsActive = computed(() => products.value.filter(item => item.active))
  const tariffs = ref([])
  const currentProductName = ref('')

  const currentProduct = computed(() => products.value.find(item => item.link === currentProductName.value))
  const currentTariff = computed(() =>  tariffs.value[currentProductName.value] || [])

  return { productsActive,products, tariffs, currentProductName, currentProduct, currentTariff }
})
