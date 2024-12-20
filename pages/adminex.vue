<template>
  <div class="adminex_wrapper">
    <div class="adminex_wrapper__header_wrapper" v-if="showAdminPanel">
    <div class="adminex_wrapper__header">
      <AppInput  v-model="search" placeholder="поиск" />
      ({{ transactionsByRules?.length }})
      <AppButton size="xs" title="выход" @click="exit" type="black" class="adminex_wrapper__header-button" />
    </div>

      <AppButton size="xs" title="открыть настройки" @click="showSettings = true" class="adminex_wrapper__settings_button" />
      <AdminSettings v-if="showSettings" :transactions="transactions" @close="showSettings = false" />

    <AppRadioGroup>
      <div class="adminex_wrapper__filters">
        <AppRadioButton v-for="filter in filters" :selected="selectedFilter.value"  :value="filter.value" :name="filter.name" @update-radio="selectRadio">{{ filter.text }}</AppRadioButton>
      </div>
    </AppRadioGroup>
    <input class="adminex_wrapper__date_filter" v-model="pickedDate" type="date" />
    </div>
    <div class="transaction__list" v-if="showAdminPanel">
     <TransactionCard v-for="transaction in transactionsByRules" :key="transaction.key" :transaction="transaction" @remove="remove(transaction.id)" @payed="payed(transaction.id)" />
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
import { Setter } from '~/helpers/setter'
import type { IActiveTransaction, IAdmin} from '~/stores/exchangerTypes'
import dayjs from 'dayjs'

import { Remover } from '~/helpers/remover'
import TransactionCard from '~/components/adminex/TransactionCard.vue'
import { ref as dbRef } from '@firebase/database'
import { onValue } from 'firebase/database'
import AdminSettings from '~/components/adminex/AdminSettings.vue'
const {exchangerSettings} = storeToRefs(useExchangerStore())
const { $database } = useNuxtApp()



const inputAdminHash = ref('')
const search = ref('')
const showSettings = shallowRef(false)

const pickedDate = ref(new Date('01/01/2022').toDateString())

const filters = [{
  value: 'all',
  text: 'все',
  name: 'all'
}, {
  value: 'timeout',
  text: 'таймаут',
  name: 'timeout'
}, {
  value: 'payed',
  text: 'оплаченные',
  name: 'payed'
}, {
  value: 'done',
  text: 'ждут оплаты от меня',
  name: 'done'
}, {
  value: 'rejected',
  text: 'отменены',
  name: 'rejected'
}]

const selectedFilter = ref({
  value: 'all',
  text: 'все',
  name: 'all'
});


const selectRadio = (value: string) => {
  selectedFilter.value = filters.find(item => item.value === value) || filters[0]
}

const adminHashes = computed<IAdmin[]>(() => exchangerSettings.value?.adminHashes)
const showAdminPanel = computed(() => adminHashes.value.some(item => item.key === inputAdminHash.value))
const currentAdmin = computed<IAdmin | null>(() => adminHashes.value.find((item) => item.key === inputAdminHash.value) || null)
const transactions = ref<Record<string, IActiveTransaction>>({})

const transactionsByRules = computed(() => {
  if (currentAdmin.value?.privileges === 'all') return sortedTransactions.value
  else if (currentAdmin.value?.privileges === 'stars' ) return sortedTransactions.value?.filter(item => item.buy === 'stars')
})
const sortedTransactions = computed(() =>
  transactions.value
  &&  Object.values(transactions.value)
    ?.sort((a: IActiveTransaction, b: IActiveTransaction) => a.id > b.id ? -1 : 1 )
    .filter(item => selectedFilter.value.value === 'all' ? item : item.status === selectedFilter.value.value)
    .filter(item => String(item.id).includes(search.value) || String(item.telegram).includes(search.value))
    .filter(item => dayjs(item.id).isAfter(dayjs(pickedDate.value))))


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

  const request = dbRef($database, `transactions`)

  onValue(request, (snapshot) => {
    transactions.value = snapshot.val()
  });

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

const remove = (id: number) => {
  const key = Object.keys(transactions.value).find(key => transactions.value?.[key].id === id)
  if (key) {
    try {
      Remover.removeFromDb(`transactions/${key}`)
    } catch (err) {
      console.log(err)
      return
    }
    delete transactions.value[key]
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

  &__settings_button {
    width: fit-content;
  }



  &__header_wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px
  }



  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 40px
  }

  &__filters {
    display: flex;
    gap: 1rem
  }

  &__date_filter {
    width: 200px;
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
</style>