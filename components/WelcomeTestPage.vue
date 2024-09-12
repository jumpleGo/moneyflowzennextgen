<template>
  <div class="mfz_welcome-test">
    <p class="mfz_welcome-test--text">вселенная mfz</p>
    <img src="../assets/saturn.png" class="mfz_welcome-test--saturn" />
    <img src="../assets/light.svg" class="mfz_welcome-test--light" />
    <span class="mfz_welcome-test--level-badge badge show">узнай свой уровень</span>
    <span class="mfz_welcome-test--test-badge badge show">тест</span>
    <span class="mfz_welcome-test--do-badge badge show" >сделай это</span>
    <img src="../assets/logo.png" class="mfz_welcome-logo logo" />
    <img src="../assets/coins.png" class="mfz_welcome-test--coins" />
    <h1 class="mfz_welcome-test--title">проверка<br/>знаний</h1>
    <app-button title="пройти тест" class="mfz_welcome-test--button" @click="emit('openTest')" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/Buttons/AppButton.vue";

const emit = defineEmits<{
  (e: 'openTest')
}>()
</script>
<style lang="scss" scoped>
.mfz_welcome-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  height: 100%;
  position: relative;
}
.mfz_welcome-test--light {
  position: absolute;
  margin: 0 auto;
  width: 800px;
  height: auto;
}
.mfz_welcome-test--text {
  text-transform: uppercase;
  color: $brand_yellow;
  font-weight: 600;
}
.mfz_welcome-test--saturn {
  margin-top: 8vh;
}
.mfz_welcome-test--title {
  font-weight: 600;
  font-size: 80px;
  text-align: center;
  text-transform: uppercase;
  color: white;
  margin-top: 8vh;
  z-index: 3;
  @include tablet {
    font-size: 80px;
  }

}
.mfz_welcome-test--button {
  bottom: 20vh;
  z-index: 2;
  position: absolute;
  scale: 1.5;
}


.mfz_welcome-test--level-badge {
  margin-top: 45vh;
  margin-left: 30vw;
}
.mfz_welcome-test--test-badge {
  right: 10vw;
  top: 20vh

}
.mfz_welcome-test--do-badge {
  left: 10vw;
  top: 20vh;
}
.mfz_welcome-test--coins {
  position: absolute;
  width: 100px;
  bottom: 0;
  margin-left: 30%;
}
.mfz_welcome-logo {
  width: 50px;
  transform: rotate(-25deg);
  left: 5%;
  margin-top: 25%;
  position: absolute;
}
.badge {
  z-index: 2;
  background: $brand_yellow;
  padding: 10px 20px;
  @include mobile-all {
    padding: 1.2vh 20px;
  }

}
</style>
