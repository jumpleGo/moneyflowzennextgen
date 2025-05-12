<template>
  <section class="banner">
    <div class="banner_bg">
      <img class="banner_bg-image" src="@/assets/bannerBonus/hands_image.png" alt="Background image">
      <div class="banner_bg-left">
        <div class="sun">
          <img class="sun_ellipse" src="@/assets/bannerBonus/ellipse.png" alt="Sun ellipse">
          <img src="@/assets/bannerBonus/line_1.png" class="sun_line-1" alt="Sun line">
          <img src="@/assets/bannerBonus/line_2.png" class="sun_line-2" alt="Sun line">
          <img src="@/assets/bannerBonus/line_3.png" class="sun_line-3" alt="Sun line">
          <img src="@/assets/bannerBonus/line_4.png" class="sun_line-4" alt="Sun line">
          <img src="@/assets/bannerBonus/line_5.png" class="sun_line-5" alt="Sun line">
          <img src="@/assets/bannerBonus/line_6.png" class="sun_line-6" alt="Sun line">
          <img src="@/assets/bannerBonus/line_7.png" class="sun_line-7" alt="Sun line">
          <img src="@/assets/bannerBonus/line_8.png" class="sun_line-8" alt="Sun line">
          <img src="@/assets/bannerBonus/line_9.png" class="sun_line-9" alt="Sun line">
          <img src="@/assets/bannerBonus/line_10.png" class="sun_line-10" alt="Sun line">
        </div>
        <div class="logo">
          <p class="logo_text">{{ textLogo }}</p>
          <div class="logo_container">
            <img class="logo_container-arrow" src="@/assets/bannerBonus/arrow_1.png"  alt="arrow">
            <img class="logo_container-image" src="@/assets/bannerBonus/logo.png" alt="logo">
          </div>
        </div>

      </div>

      <h2 class="banner_bg-text">{{ mainText }}</h2>

      <div class="banner_bg-right">
        <div class="arrow_file">
          <img class="arrow_file-image" src="@/assets/bannerBonus/arrow_2.png" alt="arrow">
          <p class="arrow_file-text">{{ arrowText }}</p>
        </div>
        <div class="arrow_free">
          <img class="arrow_free-image" src="@/assets/bannerBonus/arrow_3.png" alt="arrow">
          <p>{{ textBottom }}</p>
        </div>
      </div>
    </div>
    <h2 class="banner_text" @click="router.replace(link)">{{ buttonLink }}</h2>
  </section>
</template>
<script lang="ts" setup>
const router = useRouter()

defineProps<{
  link: {
    type: String,
    required: true
  },
  buttonLink: {
    type: String,
    default: 'скачать'
  },
  mainText: {
    type: String,
    default: 'СКОРО'
  },
  textLogo: {
    type: String,
    default: 'от АВТОРА'
  },
  textBottom: {
    type: String,
    default: 'такого больше нет'
  },
  arrowText: {
    type: String,
    default: 'курс'
  }
}>()
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "Bulatov SP Demo";
  src: url("@/assets/fonts/BulatovSPDemo.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Jost";
  src: url("@/assets/fonts/Jost.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

h2 {
  font-family: "Bulatov SP Demo";
  color: rgba(219, 219, 219, 1);
  letter-spacing: 7px;
  margin: 0;
}

p {
  font-family: "Jost";
  font-size: clamp(15px, 4vw, 30px);
  line-height: 30px;
  font-weight: 500;
}

.banner {
  max-width: 700px;
  height: auto;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  padding: 10px;

  &_bg {
    width: 100%;
    position: relative;
    display: flex;
    background: linear-gradient(
        to right,
        rgb(192, 120, 120) 0%,
        rgba(150, 50, 50, 1) 20%,
        rgb(100, 3, 3) 45%,
        rgb(100, 3, 3) 55%,
        rgba(150, 50, 50, 1) 80%,
        rgb(192, 120, 120) 100%
    );
    padding-bottom: 25px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('@/assets/bannerBonus/fon.png') repeat;
      opacity: 0.3;
      z-index: 3;
      pointer-events: none;
    }

    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    &-left {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 30%;
    }

    &-text {
      flex: 0.5;
      font-size: clamp(80px, 20vw, 150px);
      letter-spacing: -15px;
      writing-mode: vertical-rl;
      text-orientation: upright;

      text-shadow:
        -1px -1px 0 rgba(84, 84, 84, 1),
        3px -1px 0 rgba(84, 84, 84, 1),
        -1px  3px 0 rgba(84, 84, 84, 1),
        3px  1px 0 rgba(84, 84, 84, 1);
    }

    &-right {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10%;
    }
  }

  &_text {
    font-size: clamp(40px, 10vw, 80px);
    text-align: center;
    margin: 40px 0;
    text-transform: uppercase;
    &:hover {
      cursor: pointer
    }

    text-shadow:
      -1px -1px 0 rgba(84, 84, 84, 1),
      3px -1px 0 rgba(84, 84, 84, 1),
      -1px  3px 0 rgba(84, 84, 84, 1),
      3px  1px 0 rgba(84, 84, 84, 1);
  }
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &_text {
    align-self: flex-start;
    margin: 0 auto;
  }

  &_container {
    display: flex;
    margin-right: -2rem;
    padding-left: 5rem;

    &-arrow {
      width: 15%;
      height: 30%;
    }

    &-image {
      width: 100%;
      margin-left: -1rem;
    }
  }
}

.sun {
  position: relative;

  &_ellipse {
    position: relative;
    width: 70%;
  }

  &_line-1 {
    position: absolute;
    top: 110%;
    left: 5%;
    height: 80%;
  }

  &_line-2 {
    position: absolute;
    left: 12%;
    top: 110%;
    height: 50%;
  }

  &_line-3 {
    position: absolute;
    left: 20%;
    top: 110%;
    height: 80%;
  }

  &_line-4 {
    position: absolute;
    left: 30%;
    top: 110%;
    height: 50%;
  }

  &_line-5 {
    position: absolute;
    left: 40%;
    top: 110%;
    height: 70%;
  }

  &_line-6 {
    position: absolute;
    left: 50%;
    top: 97%;
    width: 20%;
  }

  &_line-7 {
    position: absolute;
    left: 63%;
    top: 85%;
    width: 30%;
  }

  &_line-8 {
    position: absolute;
    left: 70%;
    top: 60%;
    width: 25%;
  }

  &_line-9 {
    position: absolute;
    left: 75%;
    top: 40%;
    width: 30%;
  }

  &_line-10 {
    position: absolute;
    left: 75%;
    top: 15%;
    width: 25%;
  }
}

.arrow_file {
  display: flex;
  flex-direction: column;
  gap: 5rem;

  &-image {
    width: 30%;
  }

  &-text {
    transform: rotate(-45deg);
    padding-left: 10rem;
  }
}

.arrow_free {
  display: flex;
  align-items: center;
  gap: 10px;

  &-image {
    width: 30%;
    height: 10%;
  }
}

@media screen and (max-width: 630px) {
  .arrow_file {
    gap: 4rem;

    &-text {
      padding-left: 8rem;
    }
  }

}

@media screen and (max-width: 560px) {
  .arrow_file {
    gap: 3rem;

    &-text {
      padding-left: 7rem;
    }
  }

}

@media screen and (max-width: 500px) {
  .arrow_file {
    gap: 2.5rem;

    &-text {
      padding-left: 6rem;
    }
  }

  .banner_bg-right {
    margin-left: -1rem;
  }
}

@media screen and (max-width: 400px) {
  .arrow_file {
    gap: 1.7rem;

    &-text {
      padding-left: 4.4rem;
    }
  }

  .banner_bg-left {
    gap: 33%;
  }
}

@media screen and (max-width: 385px) {
  .banner_bg-left {
    gap: 35%;
  }
}
</style>