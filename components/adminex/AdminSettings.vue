<template>
    <div class="mfz_admin_settings">
      <img src="/assets/close.png" class="mfz_admin_settings__close" @click="emit('close')" />
      <div class="mfz_admin_settings__income">
        <b>Прибыль:</b>
        <div v-for="([key, value], index) in Object.entries(totalIncomeValue)" :key="`income-${index}`">
          <span v-if="value" class="mfz_admin_settings__income_key">{{key.toUpperCase()}}</span>: <span class="mfz_admin_settings__income_value">{{value?.toFixed(3)}}</span>
        </div>
      </div>

      <div class="mfz_admin_settings__amount">
        <b>Оборот:</b>
        <div v-for="([key, value], index) in Object.entries(totalAmountValue)" :key="`amount-${index}`" class="mfz_admin_settings__amount_wrapper">
            <span v-if="value" class="mfz_admin_settings__amount_key">{{key.toUpperCase()}} :</span> <span>{{value?.toFixed(3)}}</span>
        </div>
      </div>

      <div>
        Курс USDT: {{ usdtRate.toFixed(3) }}
      </div>

      <div class="mfz_admin_settings__site_enable">
        <div>{{ exchangerSettings.isSiteEnable ? 'Выключить сайт' : 'Включить сайт' }}</div>
        <AppSwitch v-model="isSiteEnable" />
      </div>

      <div class="mfz_admin_settings__site_enable">
        <div>{{ exchangerSettings.isNotificationEnable ? 'Убрать сообщение' : 'Добавить сообщение' }}</div>
        <AppSwitch v-model="isNotificationEnable" />
      </div>
    </div>
  <AppPopup v-if="showReasonDisableModal">
    <div class="mfz_admin_settings__reason_modal">
      <textarea rows="10" v-model="exchangerSettings.disableSiteReason" />
      <div class="mfz_admin_settings__reason_modal_buttons">
        <AppButton size="xs" type="black" title="отменить" @click="showReasonDisableModal = false" />
        <AppButton size="xs" title="сохранить" @click="disableSite"  />
      </div>
    </div>
  </AppPopup>
  <AppPopup v-if="showNotificationModal">
    <div class="mfz_admin_settings__reason_modal">
      <textarea rows="10" v-model="notificationObject.message" />
      <AppInput v-model="notificationObject.image" placeholder="картинка" />
      <AppInput v-model="notificationObject.title" placeholder="заголовок" />
      <div class="mfz_admin_settings__reason_modal_buttons">
        <AppButton size="xs" type="black" title="отменить" @click="showNotificationModal = false" />
        <AppButton size="xs" title="сохранить" @click="enableNotification"  />
      </div>
    </div>
  </AppPopup>
</template>

<script setup lang="ts">
import type { IActiveTransaction } from '~/stores/exchangerTypes'
import { totalAmount, totalIncome } from '~/components/adminex/helpers'
import { rateApi } from '~/api'
import AppButton from '~/components/Buttons/AppButton.vue'
import { Setter } from '~/helpers/setter'
import { useExchangerStore } from '~/stores/exchanger'
const {exchangerSettings} = storeToRefs(useExchangerStore())
const showReasonDisableModal  = shallowRef<boolean>(false)
const showNotificationModal  = shallowRef<boolean>(false)

const notificationObject = reactive({
  message:'',
  image: '',
  title: ''
})

const props = defineProps<{
  transactions: Record<string, IActiveTransaction>
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const usdtRate = ref(0)

const totalAmountValue = computed(() => totalAmount(props.transactions))
const totalIncomeValue = computed(() => totalIncome(props.transactions))
const isSiteEnable = computed({
  get: () => exchangerSettings.value.isSiteEnable,
  set: (value) => {
    if (!value) {
      showReasonDisableModal.value = true
    } else {
      exchangerSettings.value.isSiteEnable = value
      const updates: Record<string, Object> = {}
      updates[`exchangerSettings/isSiteEnable`] = value
      Setter.updateToDb(updates)
    }
  }
})

const isNotificationEnable = computed({
  get: () => exchangerSettings.value.isNotificationEnable,
  set: (value) => {
    if (!value) {
      exchangerSettings.value.isNotificationEnable = value
      const updates: Record<string, Object> = {}
      updates[`exchangerSettings/isNotificationEnable`] = value
      Setter.updateToDb(updates)
    } else {
      showNotificationModal.value = true
    }
  }
})

onMounted(async () => {
  const { data: priceUsdRes } = await rateApi.getPriceByTickers()
  usdtRate.value = priceUsdRes.data.RUB.value
})

const disableSite = () => {
  exchangerSettings.value.isSiteEnable = false
  const updates: Record<string, Object> = {}
  updates[`exchangerSettings/isSiteEnable`] = false
  updates[`exchangerSettings/disableSiteReason`] = exchangerSettings.value.disableSiteReason
  Setter.updateToDb(updates)

  showReasonDisableModal.value = false
}

const enableNotification = () => {
  exchangerSettings.value.isNotificationEnable = true
  const updates: Record<string, Object> = {}
  updates[`exchangerSettings/isNotificationEnable`] = true
  updates[`exchangerSettings/notificationObject`] = notificationObject
  Setter.updateToDb(updates)

  showNotificationModal.value = false
}
</script>



<style scoped lang="scss">
.mfz_admin_settings {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;

  &__close {
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
  }
  &__site_enable {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__reason_modal {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: white;
    padding: 30px;
    position: relative;
    min-width: 300px;

  }

  &__reason_modal_buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__income, &__amount {
    display: flex;
    gap: 1rem;
    max-width: 90vw;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    &_value {
      color: green
    }
  }

  &__amount_wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>