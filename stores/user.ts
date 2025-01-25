import {computed, ref} from 'vue'
import { defineStore } from 'pinia'



export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const isUserFilled = computed(() => user.value ? Object.keys(user.value).length : false)
  const isFullscreen = shallowRef<boolean>(false)

  return { user, isUserFilled, isFullscreen}
})
