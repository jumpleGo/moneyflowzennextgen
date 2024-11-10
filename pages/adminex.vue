<template>
  <div class="adminex_wrapper">
    <AppInput v-model="search" placeholder="поиск" />
    <div class="transaction__list" v-if="inputAdminHash === adminHash">
      <div v-for="transaction in sortedTransactions" class="transaction__item">
        <div class="transaction__item--header">
          <h4 class="box-title">
            {{ transaction.status }}
          </h4>
          <AppButton v-if="transaction.status === 'done'" title="оплачено" class="transaction__item--button" @click="payed(transaction.id)"/>
        </div>
        <span @click="copy($event, transaction.id)">#{{ transaction.id }}</span>
        <span>{{ new Date(transaction.id).getDate() }}.{{ new Date(transaction.id).getMonth() }}.{{ new Date(transaction.id).getFullYear() }}</span>
        <span>{{ new Date(transaction.id).getHours() }}:{{ new Date(transaction.id).getMinutes() }}</span>
        <div class="transaction__item--prices">
          <h3 class="box-title">
            {{ transaction.sell }} {{ transaction.countSell }}
          </h3>

          <h3 class="box-title" @click="copy($event, transaction.countBuy)">
            {{ transaction.buy }} {{ transaction.countBuy }}
          </h3>
        </div>

        <span v-if="transaction.net">сеть: {{ transaction.net }} </span>
        <span @click="copy($event, transaction.address)">адрес: {{ transaction.address }} </span>
        <span  @click="copy($event, transaction.memo)">мемо: {{ transaction.memo }} </span>
        <span>тг: <nuxt-link :to="`https://t.me/${transaction.telegram}`" target="_blank">{{ transaction.telegram }}</nuxt-link> </span>

      </div>
    </div>
    <div class="admin__login" v-else>
      <AppInput v-model="inputAdminHash" label="хэш админа" placeholder="хэш админа" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Getter } from '~/helpers/getter'
import { useExchangerStore } from '~/stores/exchanger'
import AppButton from '~/components/Buttons/AppButton.vue'
import { copy } from '~/helpers/copy'
import { Setter } from '~/helpers/setter'
import type { IActiveTransaction, Selected } from '~/stores/exchangerTypes'

const {exchangerSettings} = storeToRefs(useExchangerStore())
const { $databaseRef } = useNuxtApp()

const inputAdminHash = ref('')
const search = ref('')

const adminHash = computed(() => exchangerSettings.value?.adminHash)
const transactions = ref<Record<string, IActiveTransaction>>({})
const sortedTransactions = computed(() => transactions.value &&  Object.values(transactions.value)?.sort((a: IActiveTransaction, b: IActiveTransaction) => a.id > b.id ? -1 : 1 ).filter(item => String(item.id).includes(search.value)))

watch(inputAdminHash, async (value) => {
  if (inputAdminHash.value === adminHash.value) {
    window.localStorage.setItem('adminHash', value)
    transactions.value = await Getter.getFromDB('transactions')
    console.log(transactions.value)
  }
})
useAsyncData(async () => {
  if (exchangerSettings.value?.adminHash) return
  exchangerSettings.value = await Getter.getFromDB('exchangerSettings/')
})

onMounted(() => {
  const hashFromLS = window.localStorage.getItem('adminHash')
  if (hashFromLS) inputAdminHash.value = hashFromLS
})

const payed = (id: number) => {
  const key = Object.keys(transactions.value).find(key => transactions.value?.[key].id === id)
  console.log(id, key)
  if (key) {
    transactions.value[key].status = 'payed'
    const updates: Record<string, Object> = {}
    updates[`transactions/${key}`] = {...transactions.value[key], status: 'payed'}
    Setter.updateToDb(updates)
  }
}
</script>
<style lang="scss" scoped>
.adminex_wrapper {
  min-height: 100vh;
  background: #ececec;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

}
.admin__login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transaction__list {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  @include mobile-all {
    flex-direction: column;
  }
}
.transaction__item {
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  height: 300px;
  align-items: flex-start;
  background: white;
  box-shadow: 0 0 5px 2px rgba(128, 128, 128, 0.63);

  @include mobile-all {
    width: -webkit-fill-available;
  }

  &--prices {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 10px;
  }
  &--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    width: 100%;
  }

  &--button {
    font-size: 14px;
    padding: 10px;
  }
}
.analytics-info {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  h3 {
    font-size: 22px;
    margin-right: 15px;
  }

  img {
    width: 30px;
    height: auto;
  }
}

</style>