<template>
  <div class="smart-info wrapper">
    <div v-if="rocketClicked" class="more-info">
      <img class="more-info__image" src="../assets/arrow_yellow.png" alt="">
      <span>смотри что есть!</span>
    </div>
    <CounterWindow v-if="counter" v-model="counter" :max-click-count="MAX_CLICK_COUNT" />
    <DroppedBox :showBadges="showBadges" :isClicked="isClicked" />
    <div v-if="showClicker && !counter" :class="['clicker']" @click="listenerOn">кликни сюда!</div>
    <div :class="['smart-info__title-wrapper']">
      <h1 v-show="counter && counter < MAX_CLICK_COUNT" class="smart-info--title__additional">кликай и получи</h1>
      <h1 :class="['smart-info--title', {'without_line': counter}]">гайд для новичка в крипте</h1>
      <h1 v-if="rocketClicked" class="smart-info--yours">уже у тебя!</h1>
      <div v-if="counter === MAX_CLICK_COUNT && !rocketClicked"  class="counter__rocket">жми на ракету!</div>
    </div>
    <RocketDownload
      :rocketClicked="rocketClicked"
      :show-rocket="counter === MAX_CLICK_COUNT"
      guide-url="https://firebasestorage.googleapis.com/v0/b/moneyflowzen.appspot.com/o/start_to_crypto_guide.pdf?alt=media&token=311ce11b-f66b-4bae-b61b-66785bc2a3db" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import DroppedBox from '~/components/Guide/DroppedBox.vue'
import RocketDownload from '~/components/Guide/RocketDownload.vue'
import CounterWindow from '~/components/Guide/CounterWindow.vue'

// let telegramApp = window.Telegram.WebApp

const MAX_CLICK_COUNT = 30

const isClicked = shallowRef<boolean>(false)
const showClicker = shallowRef<boolean>(false)
const rocketClicked = shallowRef<boolean>(false)
const showBadges = shallowRef(false)
const counter = shallowRef(0)

setTimeout(() => showBadges.value = true, 4000)
setTimeout(() => isClicked.value = true, 4000)
setTimeout(() => {
  showClicker.value = true;

}, 7000)

const listenerOn = () => {
  showBadges.value = false
  counter.value+=1
}


onMounted(() => {
  // telegramApp.expand();
  // telegramApp.SettingsButton.hide()
  // telegramApp.setHeaderColor('#F0BD45')
  // telegramApp.MainButton.setParams({
  //   color: "#F0BD45",
  //   is_visible: true,
  //   text_color: '#010101',
  //   text: 'Скачать гайд'
  // });
})
</script>
<style lang="scss" scoped>

.smart-info {
  height: 100vh;
}
.smart-info__title-wrapper {
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  animation: dropText 4s linear;
  transition: 0.5s;
  @include mobile-all {
    height: 100vh;
  }

}

.without_line {
  transition: 0.5s;
  &:before {
    opacity: 0;

  }
}

.smart-info--title, .smart-info--title__additional {
  font-weight: 800;
  font-size: 70px;
  text-align: center;
  text-transform: uppercase;
  color: $brand_yellow;
  z-index: 2;
  position: relative;
  text-shadow: 0px 0px 100px $brand_yellow;
  transition: 0.5s;


  @include mobile-all {
    font-size: 40px;
  }
}
.smart-info--title {
  position: relative;
  &:before {
    content: '';
    position: absolute;

    transform: translate(23.5rem, -96vh);
    height: 100vh;
    width: 2px;
    background: $brand_yellow;

    @include mobile-xs {
      transform: translate(13rem, -98.5vh);
      margin-left: -25px;
    }
    @include mobile {
      transform: translate(14.5rem, -98.5vh);
    }
  }
}
.smart-info--title__additional {
  font-size: 50px;
  position: absolute;
  top: 25vh;
  text-shadow: 0px 0px 50px $brand_yellow;
  @include mobile-all {
    font-size: 30px;
    top: 38vh;
  }
}
.smart-info--yours {
  position: absolute;
  font-weight: 800;
  top: 45vh;
  font-size: 70px;
  text-align: center;
  text-transform: uppercase;
  color: $brand_yellow;
  @include mobile-all {
    font-size: 40px;
    top: 56vh
  }
}
.counter__rocket {
  position: absolute;
  font-size: 70px;
  top: 45vh;
  left: 0;
  right: 0;
  opacity: 0.3;
  color: white;
  text-align: center;
  @include mobile-all {
    font-size: 40px;
    top: 57vh
  }

}

.clicker {
  position: fixed;
  font-size: 20px;
  color: $brand_yellow;
  opacity: 0.7;
  text-transform: uppercase;
  left: 5%;
  top: 20%;
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  border: 2px dashed white;
  z-index: 100;
  animation: shake 2s infinite;
  &:hover {
    cursor: pointer;
  }

  @include mobile-all {
    position: absolute;
  }
}

.more-info {
  position: absolute;
  top: 90px;
  right: 25vw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @include mobile-all {
    right: 30vw;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-top: 35px;
    border-bottom: 2px dashed $brand_yellow;
    @include mobile-all {
      font-size: 16px;
      margin-top: 30px;
    }
  }
}
.more-info__image {
  width: 70px;
  height: auto;
  transform: rotate(-180deg);
  animation: bounce 2s infinite;
  @include mobile-all {
    width: 50px;
  }
}
</style>