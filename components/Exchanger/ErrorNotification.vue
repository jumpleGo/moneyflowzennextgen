<template>
  <div class="mfz_error">
    <div class="mfz_error__notification">
      <span class="mfz_error__notification_text">
        Курсы криптовалют не прогрузились!
      </span>
      <span class="mfz_error__notification_second_text">
        Попробуйте перезагрузить приложение или сменить браузер
      </span>
      <AppButton size="xs" title="перезагрузить" @click="reload" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from '~/components/Buttons/AppButton.vue'
const reload = () => {
  window.location.reload()
}
</script>
<style lang="scss" scoped>
.mfz_error {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;



  &__notification {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-width: 400px;
    height: fit-content;
    padding: 30px;
    gap: 20px;
    background: white;
    border-radius: 16px;
  }

  &__notification_text {
    text-align: center;
    font-size: 16px;
  }

  &__notification_second_text {
    text-align: center;
    font-size: 12px;
  }
}
</style>
