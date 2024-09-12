<template>
<div class="test-page">
  <div class="test-page__content">
      <h2 class="test-page__content__title">заголовок</h2>
      <p class="test-page__content__description">Значимость этих проблем настолько очевидна,
        что консультация с широким активом требуют определения и уточнения дальнейших направлений развития. Разнообразный и богатый опыт начало повседневной работы по формированию позиции </p>
      <div class="test-page__content__variants">
<!--        <app-button v-for=""></app-button>-->
      </div>

  </div>
</div>
</template>
<script setup lang="ts">
import AppButton from '@/components/Buttons/AppButton.vue'
const variants = [{}]
</script>
<style lang="scss" scoped>
.test-page {
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.test-page__content {
  min-height: 50vh;
  height: fit-content;
  width: 90%;
  background: white;
  border-radius: 10px;
  padding: 20px 25px;
}
.test-page__content__description {
  margin-top: 2vh;
}
</style>
