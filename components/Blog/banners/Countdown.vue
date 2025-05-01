<template>
  <div class="ui_countdown banner">
    <nuxt-img src="https://cdn.moneyflowzen.ru/countdownUi/noise.png" width="100%" height="100%" class="ui_countdown__noise" />
    <div class="ui_countdown__content">
    <div v-if="timerInterval" class="counter">
      <div class="ui_countdown__timer-block --hours">
        <span class="ui_countdown__timer-number">{{ timer.h }}</span>
        <span class="ui_countdown__timer-text">
          {{ getNumberWithWordEnding(Number(timer.h), ['час', 'часа', 'часов'], false) }}
        </span>

      </div>
      <div class="ui_countdown__timer-block --minute">
        <span class="ui_countdown__timer-number">{{ timer.m }}</span>
        <span class="ui_countdown__timer-text">
          {{ getNumberWithWordEnding(Number(timer.m), ['минуты', 'минуты', 'минут'], false) }}
        </span>
      </div>

      <div class="ui_countdown__timer-block --minute">
        <span class="ui_countdown__timer-number">{{ timer.s }}</span>
        <span class="ui_countdown__timer-text" >
          {{ getNumberWithWordEnding(Number(timer.s), ['секунда', 'секунды', 'секунд'], false) }}
        </span>
      </div>
    </div>
    </div>
      <nuxt-link v-if="timerInterval" :to="link" class="ui_countdown__button-text">
        {{ buttonText }}
      </nuxt-link>
    <div v-else class="ui_countdown__finish">
      время вышло
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCountdown } from '~/composables/useCountdown'
import { getNumberWithWordEnding } from '~/helpers/date'
const props = defineProps<{
  endDate: string, // YYYY.MM.DD HH.mm
  buttonText: string,
  link: string,
}>()
const {timer, timerInterval} = useCountdown(props.endDate)
</script>
<style lang="scss" scoped>
.ui_countdown {
  padding: 15px;
  background-image: url("https://cdn.moneyflowzen.ru/banners/countdownBg.jpg");
  background-size: cover;
  background-position: center;
  aspect-ratio: 900 / 690;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: "Jost", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

  &__noise {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &__timer-text {
    font-size: 25px;
    font-weight: 500;
    line-height: 1;
    color: #FFDD00;
    font-family: inherit;

    @include mobile {
      font-size: 16px;
    }

    @include mobile-xs {
      font-size: 14px;
    }
  }
  &__timer-number {
    font-size: 100px;
    font-weight: bold;
    line-height: 1;
    color: #FFDD00;
    font-family: inherit;
    width: 130px;
    text-align: center;

    @include mobile {
      font-size: 60px;
      width: 75px;
    }

    @include mobile-xs {
      font-size: 40px;
      width: 75px;
    }
  }
  &__timer-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 150px;
    max-height: 140px;
    width: 100%;
    height: 100%;
    padding: 10px;
    @include mobile {
      padding: 20px;
    }

    @include mobile-xs {
      padding: 10px;
    }
  }

  .--day, .--minute, .--hours {
    background-size: cover;
    background-position: center;
  }

  .--day {
    background-image: url("https://cdn.moneyflowzen.ru/banners/countdownUi/dayBg.jpg");
  }

  .--minute {
    background-image: url("https://cdn.moneyflowzen.ru/banners/countdownUi/minuteBg.png");
  }
  .--hours {
    background-image: url("https://cdn.moneyflowzen.ru/banners/countdownUi/hoursBg.jpg");
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: absolute;
    bottom: 20%;
    font-family: inherit;
  }


  &__finish {
    text-shadow: 0 6px 1px rgba(0, 0, 0, 0.25);
    font-size: 50px;
    font-weight: 800;
    font-family: inherit;
    color: #FFDD00;
    text-transform: uppercase;
  }
  &__button-text {
    text-shadow: 0 6px 1px rgba(0, 0, 0, 0.25);
    font-size: 50px;
    font-weight: 800;
    text-transform: uppercase;
    color: #FFDD00;
    z-index: 3;
    text-decoration: none;

    //&:after {
    //  content: url("https://cdn.moneyflowzen.ru/banners/countdownUi/mousePixel.svg");
    //  display: block;
    //  position: absolute;
    //  height: auto;
    //  right: -30px;
    //  top: 40px;
    //  @include mobile {
    //    top: 10px
    //  }
    //
    //  @include mobile-xs {
    //    display: none;
    //  }
    //}

    @include mobile {
      font-size: 30px;
    }

    @include mobile-xs {
      font-size: 25px;
    }
  }
}
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @include mobile-xs {
    gap: 10px
  }
}
</style>