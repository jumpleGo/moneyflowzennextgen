<template>
  <div class="mfz_welcome-gift">
    <p class="mfz_welcome-gift--text">вселенная mfz</p>
    <img src="../assets/saturn.png" class="mfz_welcome-gift--saturn" />
    <img src="../assets/light.svg" class="mfz_welcome-gift--light" />


    <img src="../assets/romb.png" class="mfz_welcome-gift--romb badge" />
    <img src="../assets/gift.png" class="mfz_welcome-gift--gift-badge badge" />
    <img src="../assets/dollar_big.svg" class="mfz_welcome-gift--dollar-badge badge" />
    <div class="mfz_welcome-content">
      <h1 class="mfz_welcome-gift--title">время<br/>изобилия</h1>
      <img src="../assets/andGift.png" class="mfz_welcome-gift--andGift-badge badge" />
      <img src="../assets/getIt.png" class="mfz_welcome-gift--getIt-badge badge" />
      <img src="../assets/gift.png" class="mfz_welcome-gift--gift" />
    </div>
    <app-button :disabled="!existsGift" title="получить" class="mfz_welcome-gift--button" @click="emit('openGame')" />
    <p v-if="!existsGift" class="mfz_welcome-gift--button_tip">пока у вас нет попыток</p>
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/Buttons/AppButton.vue";
import { computed, shallowRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const {existsGift} = storeToRefs(useMainStore())

const emit = defineEmits<{
  (e: 'openGame')
}>()
</script>
<style lang="scss" scoped>
.mfz_welcome-gift {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  height: calc(100vh - 100px);
  position: relative;
}
.mfz_welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 20vh;
  z-index: 2;
}
.mfz_welcome-gift--gift {
  width: 50%;
  margin-top: -20px;
}
.mfz_welcome-gift--light {
  position: absolute;
  margin: 0 auto;
  width: 800px;
  height: auto;
}
.mfz_welcome-gift--romb {
  margin-top: 25%;
  margin-right: 10%;
}
.mfz_welcome-gift--gift-badge {
  width: 50px;
  transform: rotate(30deg);
  margin-top: 100px;
  margin-left: 40%;
}
.mfz_welcome-gift--dollar-badge {
  width: 80px;
  margin-right: 50%;
  margin-top: 20%;
}
.mfz_welcome-gift--text {
  text-transform: uppercase;
  color: $brand_yellow;
  font-weight: 600;
}
.mfz_welcome-gift--saturn {

  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
}
.mfz_welcome-gift--title {
  font-weight: 600;
  font-size: 50px;
  text-align: center;
  text-transform: uppercase;
  color: $brand_yellow;
  text-shadow: 0px 4px 4px rgba(0,0,0, 0.25);
  z-index: 2;

}
.mfz_welcome-gift--button {
  margin-top: 2vh;
  z-index: 2;
}
.mfz_welcome-gift--button:not(.--disabled) {
  animation: shake 2s linear infinite;
}

.badge {
  position: absolute;
}

.mfz_welcome-gift--andGift-badge {
  margin-left: 70%;
  margin-top: -10%;
}
.mfz_welcome-gift--getIt-badge {
  margin-right: 80%;
  margin-top: -10%;
}

.mfz_welcome-logo {
  width: 50px;
  transform: rotate(-25deg);
  left: 5%;
  margin-top: 25%
}
.mfz_welcome-gift--button_tip {
  color: white;
  margin-top: 20px
}
</style>
