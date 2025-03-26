<template>
  <div class="modal-overlay" id="modal-overlay">
    <div class="functional_modal">
      <h3 class="functional_modal__header">Следи за рынком в Telegram!</h3>
      <div class="functional_modal__content">
        <p class="functional_modal__description">Подпишись, чтобы получить больше информации о рынке</p>
        <div class="functional_modal__blocks">
          <nuxt-link target="_blank" to="https://t.me/mfz_official_crypto" class="functional_modal__block">
            <nuxt-img :src="logoCryptoTg" class="functional_modal__image"/>
            <p>MFZ-CRYPTO</p>
          </nuxt-link>
          <nuxt-link target="_blank" to="https://t.me/mfz_official" class="functional_modal__block">
            <nuxt-img :src="logoStocksTg" class="functional_modal__image" />
            <p>MFZ-STOCKS</p>
          </nuxt-link>
        </div>
      </div>
      <button class="close-btn" @click="emit('close')">&times;</button>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { logoCryptoTg, logoStocksTg } from 'assets/imagesSrc'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.functional_modal {
  background: white;
  width: 350px;
  border-radius: 16px;
  position: relative;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  animation: fadeIn 0.4s ease;
  font-family: Inter,Helvetica Neue,Helvetica,sans-serif;

  &__header {
    width: 100%;
    margin: 0;
  }
  &__description {
    font-size: 14px;
  }
  &__content {

  }

  &__blocks {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__block {
    border: 1px solid rgba(128, 128, 128, 0.28);
    border-radius: 16px;
    padding: 8px;
    display: flex;
    gap: 8px;
    text-decoration: none;
    color: black
  }

  &__image {
    width: 50px;
    border-radius: 8px;
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  color: #888;
  transition: color 0.3s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@media(max-width: 600px) {
  .modal-overlay {
    align-items: flex-end;
  }

  .functional_modal {
    width: 100%;
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
}

</style>