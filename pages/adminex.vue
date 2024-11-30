<template>
  <div class="adminex_wrapper">
    <div  v-if="showAdminPanel" class="adminex_wrapper__header">
      <AppInput  v-model="search" placeholder="поиск" />
      <AppButton title="выход" @click="exit" type="black" class="adminex_wrapper__header-button" />
    </div>
    <div class="transaction__list" v-if="showAdminPanel">
      <div v-for="transaction in transactionsByRules" class="transaction__item">
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
            в  {{ transaction.buy }} {{ transaction.countBuy }}
          </h3>
        </div>

        <span v-if="transaction.net">сеть: {{ transaction.net }} </span>
        <span v-if="transaction.address" @click="copy($event, transaction.address)">адрес: {{ transaction.address }} </span>
        <span v-if="transaction.memo" @click="copy($event, transaction.memo)">мемо: {{ transaction.memo }} </span>
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
import type { IActiveTransaction, IAdmin, Selected } from '~/stores/exchangerTypes'

const {exchangerSettings} = storeToRefs(useExchangerStore())
const { $databaseRef } = useNuxtApp()

const inputAdminHash = ref('')
const search = ref('')

const adminHashes = computed<IAdmin[]>(() => exchangerSettings.value?.adminHashes)
const showAdminPanel = computed(() => adminHashes.value.some(item => item.key === inputAdminHash.value))
const currentAdmin = computed<IAdmin | null>(() => adminHashes.value.find((item) => item.key === inputAdminHash.value) || null)
const transactions = ref<Record<string, IActiveTransaction>>({})
const transactionsByRules = computed(() => {
  if (currentAdmin.value?.privileges === 'all') return sortedTransactions.value
  else if (currentAdmin.value?.privileges === 'stars' ) return sortedTransactions.value?.filter(item => item.buy === 'stars')
})
const sortedTransactions = computed(() => transactions.value &&  Object.values(transactions.value)?.sort((a: IActiveTransaction, b: IActiveTransaction) => a.id > b.id ? -1 : 1 ).filter(item => String(item.id).includes(search.value)))

watch(inputAdminHash, async () => {
  if (showAdminPanel.value && currentAdmin.value) {
    window.localStorage.setItem('adminHash', JSON.stringify(currentAdmin.value))
    transactions.value = await Getter.getFromDB('transactions')
  }
})
useAsyncData(async () => {
  if (exchangerSettings.value?.adminHashes.length) return
  exchangerSettings.value = await Getter.getFromDB('exchangerSettings/')
})

onMounted(() => {
  const hashFromLS = window.localStorage.getItem('adminHash')

  if (hashFromLS) {
    const parsedHashFromLs = JSON.parse(hashFromLS)
    if (adminHashes.value.some(item => item.key === parsedHashFromLs.key)) {
      inputAdminHash.value = parsedHashFromLs.key
    } else {
      window.localStorage.removeItem('adminHash')
    }
  }

})

const payed = (id: number) => {
  const key = Object.keys(transactions.value).find(key => transactions.value?.[key].id === id)
  if (key) {
    transactions.value[key].status = 'payed'
    const updates: Record<string, Object> = {}
    updates[`transactions/${key}`] = {...transactions.value[key], status: 'payed'}
    Setter.updateToDb(updates)
  }
}


const exit = () => {
  window.localStorage.removeItem('adminHash')
  inputAdminHash.value = ''
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

  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 40px
  }

  &__header-button {
    font-size: 14px;
    font-weight: 500;
  }

}
.admin__login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transaction__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Адаптивное количество колонок */
  gap: 20px; /* Отступы между карточками */
  width: 100%; /* Растягивание на всю ширину */
}

.transaction__item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 5px 2px rgba(128, 128, 128, 0.63);
  overflow: hidden; /* Скрываем переполненный текст */

  h4,
  span {
    white-space: nowrap; /* Запрещаем перенос текста */
    overflow: hidden; /* Скрываем переполненный текст */
    text-overflow: ellipsis; /* Добавляем троеточие */
  }

  &--prices {
    display: flex;
    flex-direction: column; /* Для лучшей адаптивности */
    gap: 10px;
  }

  &--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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