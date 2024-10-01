<template>
  <div class="notification-block">
   <span>
      {{ text }}
   </span>
    <span>
      <nuxt-link to="https://t.me/mfz_exchanger/2" target="_blank">Сообщить сюда!</nuxt-link>
    </span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  notifyType: 'bugs'
}>()

const text = computed(() => data[props.notifyType])

const data = {
  'bugs': 'Сервис новый! Могут быть баги. Это нормально.'
}
</script>
<style lang="scss" scoped>
.notification-block {
  padding: 15px;
  width: calc(100% - 30px);
  box-shadow: 0 6px 10px #99a1aa26;
  background: #fff2cb;
  margin-bottom: 20px;
  max-width: 83vw;
  font-size: 14px;
  display: flex;
  justify-content: space-between;

  @include mobile-xs {
    width: unset;
    max-width: unset;
  }

}
</style>