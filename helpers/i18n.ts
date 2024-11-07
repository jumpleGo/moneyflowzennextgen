import type { IExchangerSettings } from '~/stores/exchangerTypes'


export const translates = {
  required: 'Поле обязательно для заполения',
  telegram: 'Введите корректный username',
  address: 'Введите корректный адрес',
  phone: 'Введите корректный телефон',
  memo: 'Введите корректный memo',
  count: 'Поле обязательно для заполнения',
  limit: (exchangerSettings: IExchangerSettings) => `Лимит транзакций ${exchangerSettings.minLimit} - ${exchangerSettings.maxLimit} руб`,
}