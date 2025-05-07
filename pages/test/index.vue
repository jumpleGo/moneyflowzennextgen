<template>
  <div class="mfz_welcome-test">
    <p class="mfz_welcome-test--text">вселенная mfz</p>
    <img src="../../assets/saturn.png" class="mfz_welcome-test--saturn" />
    <img src="../../assets/light.svg" class="mfz_welcome-test--light" />
    <span class="mfz_welcome-test--level-badge badge show">узнай свой уровень</span>
    <span class="mfz_welcome-test--test-badge badge show">тест</span>
    <span class="mfz_welcome-test--do-badge badge show" >сделай это</span>
    <img src="../../assets/logo/logo.png" class="mfz_welcome-logo logo" />
    <h1 class="mfz_welcome-test--title">проверка<br/>знаний</h1>
    <AppButton  title="пройти тест" class="mfz_welcome-test--button" @click="openQuiz" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "~/components/Buttons/AppButton.vue";
const router = useRouter()

const openQuiz = () => {
  router.push('test/quiz')
}
</script>
<style lang="scss" scoped>
.mfz_welcome-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  height: calc(100vh - 125px);
  position: relative;
  font-family: inherit;
  @include mobile-all {
    padding-top: 0;
    height: 100%;
  }
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
  font-size: 50px;
  text-align: center;
  text-transform: uppercase;
  color: #FEBE16;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 3;
  margin-top: 8vh;
  font-family: inherit;
  @include tablet {
    font-size: 60px;
  }
  @include mobile-all {
    font-size: 40px;
    margin-top: 12vh;
  }
}
.mfz_welcome-test--button {
  bottom: 10vh;
  z-index: 2;
  position: absolute;

  @include mobile-all {
    position: relative;
    bottom: unset;
  }
}

.mfz_welcome-test--level-badge {
  top: 45vh;
  right: 10vw;
  @include tablet {
    right: 5vw;
    top: 30vh;
  }
  @include mobile-all {
    right: 5vw;
    top: 30vh;
  }
}
.mfz_welcome-test--test-badge {
  right: 10vw;
  top: 20vh

}
.mfz_welcome-test--do-badge {
  left: 10vw;
  top: 20vh;
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
