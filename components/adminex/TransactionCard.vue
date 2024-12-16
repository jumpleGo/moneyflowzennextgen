<template>
    <div class="transaction__item">
      <div class="transaction__item--header">
        <h4 class="box-title">
          {{ getStatus(transaction.status) }}
        </h4>
        <img src="assets/icons/more.png" width="20px" height="20px"  @click="showPopup = true"/>
        <div v-if="showPopup" class="transaction__item_menu" v-click-outside="closePopup" >
          <div class="transaction__item_menu_item" @click="emitAction('payed')">
            оплачено
          </div>
          <div class="transaction__item_menu_item" @click="emitAction('remove')">
            удалить
          </div>
        </div>
      </div>
      <span @click="copy($event, String(transaction.id))" class="transaction__item_id">#{{ transaction.id }}</span>
      <span class="transaction__item_day">{{ dayjs(transaction.id).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm') }} (MSK)</span>
      <span class="transaction__item_day">{{ dayjs(transaction.id).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm') }} (BKK)</span>
      <div class="transaction__item_prices">
          <span class="transaction__item_prices_title">
           {{ transaction.sell }} {{ transaction.countSell }}
          </span>

        <span class="transaction__item_prices_title" @click="copy($event, String(transaction.countBuy))">
            в  {{ transaction.buy }} {{ transaction.countBuy }}
          </span>
      </div>

      <span v-if="transaction.net">сеть: {{ transaction.net }} </span>
      <span v-if="transaction.address" @click="copy($event, transaction.address)">адрес: {{ transaction.address }} </span>
      <span v-if="transaction.memo" @click="copy($event, transaction.memo)">мемо: {{ transaction.memo }} </span>
      <span class="transaction__item_telegram">тг: <nuxt-link :to="`https://t.me/${transaction.telegram}`" target="_blank">{{ transaction.telegram }}</nuxt-link> </span>

    </div>
</template>
<script setup lang="ts">
import { copy } from '~/helpers/copy'
import dayjs from 'dayjs'
import type { IActiveTransaction, Status } from '~/stores/exchangerTypes'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const props = defineProps<{
  transaction: IActiveTransaction
}>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'payed'): void
}>()

const showPopup = ref(false)

const closePopup = () => {
  showPopup.value = false
}

const emitAction = (status: 'payed' | 'remove') => {
  showPopup.value = false
  if (status === 'payed') {
    emit('payed')
  }
  if (status === 'remove') {
    emit('remove')
  }
}

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
</script>

<style lang="scss" scoped>
.transaction__item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 5px 2px rgba(128, 128, 128, 0.63);
  overflow: hidden; /* Скрываем переполненный текст */
  position: relative;

  &_menu {
    position: absolute;
    right: 10px;
    top: 20px;
    box-shadow: 0 0 5px 1px rgba(128, 128, 128, 0.2);
    background: white;
  }

  &_menu_item {
    padding: 5px 10px;
    font-size: 12px;
    &:hover {
      background: rgba(190, 187, 187, 0.2);
    }
  }

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
</style>