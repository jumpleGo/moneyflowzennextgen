<template>
  <div class="notification-block">
   <span v-html="text" />
    <span v-if="notifyType === 'bugs'">
      <nuxt-link to="https://t.me/mfz_exchanger/2" target="_blank">Сообщить сюда!</nuxt-link>
    </span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  notifyType: 'bugs' | 'time'
}>()

const text = computed(() => data[props.notifyType])

const data = {
  'bugs': 'Сервис новый! Могут быть баги. Это нормально.',
  'time': 'Активное время работы: 5:00 - 21:00 МСК. В иное время уточняйте статус онлайна у <a href="https://t.me/mfz_owner" target="_blank">@mfz_owner</a>'
}
</script>
<style lang="scss" scoped>
.notification-block {
  padding: 15px;
  box-shadow: 0 6px 10px #99a1aa26;
  background: #fff2cb;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;

  @include mobile-xs {
    width: unset;
    max-width: unset;
  }

}
</style>