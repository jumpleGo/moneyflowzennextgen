<template>
  <div class="wrapper">
    <WelcomeGiftPage v-if="!showGame" :loading="loading" :exist-game="storeGiftCount" @openGame="showGame = true"/>
    <GiftGamePage v-else @goBack="showGame = false"  />
<!--    <MyGifts />-->
<!--    <div class="gift__footerBar">-->
<!--      <div>-->
<!--        главная-->
<!--      </div>-->
<!--      <div>-->
<!--        мои подарки-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>
<script setup lang="ts">
import WelcomeGiftPage from "@/components/WelcomeGiftPage.vue";
import GiftGamePage from "@/components/GiftGamePage.vue";
import {shallowRef} from "vue";
import { storeToRefs } from 'pinia'
import { useGiftStore } from '~/stores/gift'
import { Getter } from '~/helpers/getter'
import { Setter } from '~/helpers/setter'

const showGame = shallowRef<boolean>(false)
const {giftCount: storeGiftCount, giftHash: storeGiftHash, giftKey: storeGiftKey} = storeToRefs(useGiftStore())

const route = useRoute()
const { accessGiftCode } = route.query
const loading = shallowRef(true)


onMounted(async () => {
  const lsGiftHash = localStorage.getItem('giftHash')
  const lsGiftCount = localStorage.getItem('giftCount')
  const lsGiftKey = localStorage.getItem('giftKey')

  if (lsGiftHash && lsGiftCount && lsGiftKey) {
    storeGiftHash.value = lsGiftHash
    storeGiftCount.value = Number(lsGiftCount)
    storeGiftKey.value = lsGiftKey
    loading.value = false
    return
  }

  if (accessGiftCode) {
    const hashes = await Getter.getByKey('giftHashes', String(accessGiftCode))
    console.log(accessGiftCode, hashes)
    if (!hashes?.length) return

    const hash = hashes[0]

    if (hash) {
      const giftCount = (Number(hash.slice(-1))) as number
      const giftHashStr = (hash.slice(0, hash.length - 1)) as string

      storeGiftCount.value = giftCount
      storeGiftHash.value = giftHashStr
    }

    await Setter.updateToDb({[`giftHashes/${String(accessGiftCode)}`]: hashes.slice(1)})
    await Setter.pushToDb('currentGifts/', hash).then((data) => {
      localStorage.setItem('giftKey', data.key || '')
      storeGiftKey.value = data.key
    })
  }

  if (storeGiftCount.value && storeGiftHash.value) {
    window.localStorage.setItem('giftCount', String(storeGiftCount.value))
    window.localStorage.setItem('giftHash', storeGiftHash.value)
  }
  loading.value = false
})


</script>
<style lang="scss" scoped>
.gift__footerBar {
  position: fixed;
  bottom: 20px;
  left: auto;
  right: auto;
  display: flex;
  align-items: center;
  width: fit-content;
  color: white;
  gap: 20px;
}
</style>