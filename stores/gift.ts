import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import {child, get, getDatabase} from "firebase/database";
import {getCurrentInstance} from "vue";
import {ref as dbRef} from "@firebase/database";

interface ISelectedGift {
  title?: string,
  image?: string
}
export const useGiftStore = defineStore('gift', () => {
  const selectedGift = ref<ISelectedGift>()
  const giftHash = shallowRef<string>()
  const giftKey = shallowRef<string>()
  const giftCount = shallowRef<number>()


  return { selectedGift, giftCount, giftHash, giftKey }
})
