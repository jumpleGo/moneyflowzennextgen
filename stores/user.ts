import {computed, ref} from 'vue'
import { defineStore } from 'pinia'



export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const isUserFilled = computed(() => user.value ? Object.keys(user.value).length : false)

  return { user, isUserFilled}
})
