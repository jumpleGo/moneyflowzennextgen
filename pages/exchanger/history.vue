<template>
  <div class="mfz_history" :style="isFullscreen && stylesForFullscreen">
    <AppBackButton @click="router.back()" class="mfz_history__back" />
    <div class="mfz_history__card_wrapper" v-for="transaction in transactions" :key="transaction.key">
      <div class="mfz_history__card_wrapper__text">
        <p class="mfz_history__card_wrapper__text_hash">
          #{{transaction.id}}
        </p>
        <p class="mfz_history__card_wrapper__text_hash">
          {{ dayjs(transaction.id).format('YYYY-MM-DD HH:mm') }}
        </p>
        <div class="mfz_history__card_wrapper__text_transaction">
          <div class="mfz_history__card_wrapper__text_transaction_block">
            <nuxt-img class="mfz_history__card_wrapper__text_transaction_image" :src="getImageUrl(transaction.sell)" width="30px" height="30px" />
            <p class="mfz_history__card_wrapper__text_transaction_text">{{ transaction.countSell }}</p>
          </div>
          <p>
            →
          </p>
          <div class="mfz_history__card_wrapper__text_transaction_block">
            <nuxt-img :src="getImageUrl(transaction.buy)" class="mfz_history__card_wrapper__text_transaction_image" width="30px" height="30px" />
            <p class="mfz_history__card_wrapper__text_transaction_text">{{ transaction.countBuy }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Getter } from '@/helpers/getter'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import TransactionCard from '~/components/adminex/TransactionCard.vue'
import dayjs from 'dayjs'
const {user, isFullscreen} = storeToRefs(useUserStore())
const transactions = ref([])

const router = useRouter()

useAsyncData(async () => {
  //user.value.username
  const result = await Getter.getByValue('/transactions', 'telegram', 'Ultraz07' )
  console.log(Object.values(result))
  transactions.value = Object.values(result).reverse()
})

const getImageUrl = (name: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/${name !== 'sbp' ? name+'b' : name}.png?alt=media`
}

const stylesForFullscreen = computed(() => ({
  margin: '10vh 0 15px',
}))
</script>
<style lang="scss" scoped>
.mfz_history {
  display: flex;
  flex-direction: column;
  padding: 50px 15px 80px;
  width: calc(100vw - 30px);
  height: 100%;
  gap: 15px;

  &__back {
    width: fit-content;
  }

  &__card_wrapper {
    padding: 15px;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    box-shadow: 1px 1px 14px -5px $brand_yellow;
    background-color: rgba(0, 0, 0, 0.5);
    width: auto;
    color: white;

    &__text {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &_hash {
        font-size: 14px;
        color: gray;
      }

      &_transaction {
        display: flex;
        gap: 20px;

        &_block {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        &_image {
          border-radius: 50%;
        }

      }
    }
  }
}
</style>