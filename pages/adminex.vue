<template>
  <div class="adminex_wrapper">
    <div v-if="showAdminPanel" class="adminex_wrapper__header">
      <AppInput  v-model="search" placeholder="поиск" />
      ({{ transactionsByRules?.length }})
      <AppButton title="выход" @click="exit" type="black" class="adminex_wrapper__header-button" />
    </div>
    <div v-if="currentAdmin?.privileges === 'all'" class="adminex_wrapper__total">
      <div v-for="[key, value] in Object.entries(totalValue)">
        <span class="adminex_wrapper__total-key">{{key}}</span>: <span class="adminex_wrapper__total-value">{{value}}</span>
      </div>
    </div>

    <AppRadioGroup v-if="showAdminPanel">
      <div class="adminex_wrapper__filters">
        <AppRadioButton v-for="filter in filters" :selected="selectedFilter.value"  :value="filter.value" :name="filter.name" @update-radio="selectRadio">{{ filter.text }}</AppRadioButton>
      </div>
    </AppRadioGroup>
    <input v-model="pickedDate" type="date">выберите дату</input>
    <div class="transaction__list" v-if="showAdminPanel">
      <div v-for="transaction in transactionsByRules" class="transaction__item">
        <div class="transaction__item--header">
          <h4 class="box-title">
            {{ getStatus(transaction.status) }}
          </h4>
          <AppButton v-if="transaction.status === 'done'" title="оплачено" class="transaction__item--button" @click="payed(transaction.id)"/>
        </div>
        <span @click="copy($event, transaction.id)" class="transaction__item_id">#{{ transaction.id }}</span>
        <span class="transaction__item_day">{{ dayjs(transaction.id).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm') }} (MSK)</span>
        <span class="transaction__item_day">{{ dayjs(transaction.id).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm') }} (BKK)</span>
        <div class="transaction__item_prices">
          <span class="transaction__item_prices_title">
           {{ transaction.sell }} {{ transaction.countSell }}
          </span>

          <span class="transaction__item_prices_title" @click="copy($event, transaction.countBuy)">
            в  {{ transaction.buy }} {{ transaction.countBuy }}
          </span>
        </div>

        <span v-if="transaction.net">сеть: {{ transaction.net }} </span>
        <span v-if="transaction.address" @click="copy($event, transaction.address)">адрес: {{ transaction.address }} </span>
        <span v-if="transaction.memo" @click="copy($event, transaction.memo)">мемо: {{ transaction.memo }} </span>
        <span class="transaction__item_telegram">тг: <nuxt-link :to="`https://t.me/${transaction.telegram}`" target="_blank">{{ transaction.telegram }}</nuxt-link> </span>

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
import type { IActiveTransaction, IAdmin, Selected, Status } from '~/stores/exchangerTypes'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import  timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const {exchangerSettings} = storeToRefs(useExchangerStore())
const { $databaseRef } = useNuxtApp()

const inputAdminHash = ref('')
const search = ref('')
const pickedDate = ref('')

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

const getStatus = (status: Status) => {
  switch (status) {
    case 'created':
      return 'создано'
    case 'rejected':
      return 'отменено'
    case 'done':
      return 'ждет оплаты от меня'
    case 'payed':
      return 'оплачено'
    case 'timeout':
      return 'таймаут'
  }
}
const selectRadio = (value: string) => {
  console.log(value)
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
    .filter(item => String(item.id).includes(search.value))
    .filter(item => dayjs(item.id).isAfter(dayjs(pickedDate.value || '1977.01.01'))))

const totalValue = computed(() => {
  return Object.values(transactions.value)
    .filter(item => item.status === 'payed')
    .reduce((acc, item) => {
      const rate = item.countSell < 3000 ? 1 / 10 : 6 / 100;

      // Условие для stars
      if (item.buy === 'stars') {
        acc[item.sell] = (acc[item.sell] || 0) + item.countSell / 10;
      }
      // Условие для sber и tbank
      else if (['sber', 'tbank'].includes(item.sell)) {
        acc[item.sell] = (acc[item.sell] || 0) + item.countSell * rate;
      }
      // Условие для остальных
      else {
        acc[item.sell] = (acc[item.sell] || 0) + item.countSell * rate;
      }

      return acc;
    }, {});
})

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

  &__total {
    display: flex;
    gap: 1rem;
    max-width: 90vw;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    &-value {
      color: green
    }
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

  &_telegram {
    margin-top: 20px;
  }

  &_id {
    font-weight: 700;
    font-size: 11px;
    margin-top: 20px;
  }

  &_day {
    font-weight: 500;
    font-size: 12px;
    margin-top: 10px;
  }

  h4,
  span {
    white-space: nowrap; /* Запрещаем перенос текста */
    overflow: hidden; /* Скрываем переполненный текст */
    text-overflow: ellipsis; /* Добавляем троеточие */
  }

  &_prices {
    display: flex;
    flex-direction: column; /* Для лучшей адаптивности */
    margin-top: 20px;

    &_title {
      font-size: 16px;
      font-weight: 600;
    }
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