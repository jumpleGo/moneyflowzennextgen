<template>
  <div class="quiz-result">
    <h2 class="quiz-result__title">
      Твой результат: {{ countRightAnswers }} / {{ countQuestions }}
    </h2>
    <div class="quiz-result__description-block">
      <h3 class="quiz-result__description-block-title">{{ result?.title }}</h3>
      <nuxt-img :src="`https://cdn.moneyflowzen.ru/turtle-step/${imageName}.png`" class="quiz-result__description-block-image" preload />
      <p v-html="result?.description" />
      <hr />
      <div class="quiz-result__promo">
        <h3 class="quiz-result__promo-title">"СТАРТ В ТРЕЙДИНГ"</h3>
        <div class="quiz-result__special-offer">
          <div class="quiz-result__special-offer-discount">- 11 000 руб</div>
          <div class="quiz-result__special-offer-timer">
            <div class="quiz-result__special-offer-time">
              {{ Number(timer.h) + Number(timer.d*24) }}ч
            </div>
            <span>:</span>
            <div class="quiz-result__special-offer-time">
              {{ timer.m }}м
            </div>
            <span>:</span>
            <div class="quiz-result__special-offer-time">
              {{ timer.s }}с
            </div>
          </div>
        </div>
<!--        <h4 class="quiz-result__promo-subtitle"></h4>-->
        <div class="quiz-result__special-price">
          <div class="quiz-result__special-price-block">
            тариф: "Участник"
            <div class="quiz-result__special-price-list">
              <strike class="quiz-result__special-price-old">49 000 руб</strike>
              <strong class="quiz-result__special-price-new">38 000 руб</strong>
            </div>
            <div class="quiz-result__special-price-parts">частями: 3 x 12 666 руб</div>
          </div>
        </div>
        <ProductBanner link="https://t.me/m/5fKamFDEZjJi" logo="https://cdn.moneyflowzen.ru/logos/start_to_trading_logo.jpeg">
          <template #title>
            За 3 недели научишься читать график и принимать решения!
          </template>
        </ProductBanner>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import ProductBanner from '~/components/Blog/banners/ProductBanner.vue'
import type { IQuizResultData } from '~/types/pages/quiz'

defineProps<{
  result: IQuizResultData | undefined,
  countRightAnswers: number,
  countQuestions: number,
  imageName: string,
}>()

const {timer} = useCountdown('08.05.2025 18:00')
</script>
<style lang="scss" scoped>
hr {
  border-color: $brand_yellow;
  width: 100%;
  margin: 40px 0;
}
.quiz-result {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 700px;
  width: 100%;

  &__special-price {
    display: flex;
    flex-direction: column;
    gap: 10px;


    &-block {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &-list {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }

    &-old {
      color: gray;
      font-size: 14px;
    }

    &-new {
      color: #af652f;
      font-size: 19px;
    };

    &-parts {
      border: 1px solid gray;
      font-size: 14px;
      padding: 4px;
      width: fit-content;
    }
  }

  &__special-offer {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;

    &-timer {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &-time {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 4px;
      border: 1px solid #864d20;
      border-radius: 4px;
      color: #864d20;
    }

    &-discount {
      padding: 2px 4px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background: #864d20;
      color: #ffffff;
    }
  }

  &__promo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    border-radius: 10px;
    background: rgb(239, 238, 238);
  }

  &__promo-title {
    font-size: 24px;
    margin: 0;
  }
  &__promo-subtitle {
    text-transform: uppercase;
    margin: 0;
  }

  &__title {
    color: white;
    width: 100%;
    text-align: center;

  }

  &__description-block {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: white;
    border-radius: 10px;
  }

  &__description-block-title {
    text-align: center;
  }

  &__description-block-image {
    border-radius: 10px;
    box-shadow: 0 0 2px 1px rgba(128, 128, 128, 0.38);
  }

}
</style>