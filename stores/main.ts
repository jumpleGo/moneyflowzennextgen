import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import {child, get, getDatabase} from "firebase/database";
import {getCurrentInstance} from "vue";
import {ref as dbRef} from "@firebase/database";


export const useMainStore = defineStore('main', () => {
  const hash = ref<string>()
  const showModal = ref<boolean>(false)
  const showModalType = ref<string>('')


  return { hash, showModal, showModalType }
})
