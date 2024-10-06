<template>
  <div class="mfz-main">
    <img class="mfz_main__icon-btc" src="~/assets/btc.png">
    <img class="mfz_main__icon-dollar" src="~/assets/dollar_big.svg">
    <img class="mfz_main__icon-coins" src="~/assets/coins.png">
    <div class="mfz-main__title"><span>
      mf
    </span>
    <span class="mfz-main__title--z">
      z
    </span>
      <img class="mfz-main__dollar_big_image" src="~/assets/dollar_big.svg">
      <img class="mfz-main__euro_image" src="~/assets/euro.png">
    </div>
    <p class="mfz-main__description">money flow zen</p>
<!--    <img class="mfz-main__union bounce" src="../assets/union.svg">-->
    <p class="mfz-main__left_text">твое место изобилия</p>
    <p class="mfz-main__right_text">гармонии и силы</p>
    <router-link to="/guideStartToTrading" class="mfz-main__floating_button bounce">
      <img class="mfz-main__floating_button__img" src="~/assets/QuestionCoin.png" />
      <span class="mfz-main__floating_button__text">гайд старт в трейдинг</span>
    </router-link>
  </div>
<!--  <MfzRoadMap />-->
</template>
<style lang="scss" scoped>
.mfz-main {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  height: calc(100vh - 144px);
  color: $brand_yellow;
  padding-top: 144px;
  overflow: hidden;

  @include mobile-all {
    padding-top: unset;
    height: 100vh;
  }
  @include desktop-lg {
    overflow: unset
  }

  .mfz-main__title {
    position: relative;
    text-transform: uppercase;
    font-family: 'DUERRA' !important;
    display: flex;

    span {
      line-height: 400px;
    }

    @include mobile-xs {
      margin-top: -30vh;
      font-size: 120px;
    }

    @include mobile {
      margin-top: -30vh;
      font-size: 150px;
    }

    @include tablet {
      margin-top: -100px;
      font-size: 250px;
    }

    @include desktop {
      margin-top: -20vh;
      font-size: 300px;
    }

    @include desktop-lg {
      fmargin-top: -20vh;
      font-size: 500px;
    }
  }
  .mfz-main__title--z {


    @include mobile-xs {
      margin-left: 5px;
    }

    @include mobile {
      margin-left: 5px;
    }

    @include tablet {
      margin-left: 7px;
    }

    @include desktop {
      margin-left: 10px;
    }

    @include desktop-lg {
      margin-left: 17px;
    }
  }
  .mfz-main__description {
    font-weight: 600;

    text-transform: uppercase;

    @include mobile-xs {
      font-size: 22px;
      margin-top: -160px;
    }
    @include mobile {
      font-size: 27px;
      margin-top: -160px;
    }

    @include tablet {
      font-size: 44px;
      margin-top: -120px;
    }

    @include desktop {
      font-size: 53px;
      margin-top: -100px;
    }

    @include desktop-lg {
      font-size: 89px;
      margin-top: -90px;
    }
  }
  .mfz-main__union {
    position: absolute;
    bottom: 20%;
    @include mobile-xs {

      bottom: 20vh;
      width: 15px
    }

    @include mobile {
      margin-top: 250px;
      width: 15px
    }
    @include desktop {
      position: absolute;
      bottom: 5vh;
    }

    @include desktop-lg {
      position: absolute;
      bottom: 5vh;
    }

  }

  .mfz-main__dollar_big_image {
    position: absolute;

    @include mobile {
      left: 210px;
      width: 150px;
      top: 170px;
    }
    @include mobile-xs {
      left: 150px;
      width: 150px;
      top: 170px;
    }

    @include tablet {
      left: 350px;
      width: 250px;
      top: 170px;
    }

    @include desktop {
      top: 10vh;
      width: 350px;
      left: 40vh;
    }

    @include desktop-lg {
      top: 10vh;
      width: 350px;
      left: 60vh;
    }

  }
  .mfz-main__euro_image {
    position: absolute;

    @include mobile-xs {
      left: -200px;
      width: 200px;
      top: 0px
    }
    @include mobile {
      left: -200px;
      width: 300px;
      top: -50px
    }

    @include tablet {
      left: -200px;
      width: 300px;
      top: -50px
    }

    @include desktop {
      top: -15vh;
      left: -50vh;
    }

    @include desktop-lg {
      top: -30vh;
      left: -50vh;
    }
  }

}

.mfz_main__icon-coins {
  position: absolute;


  @include mobile {
    display: none;
  }

  @include mobile-xs {
    display: none;
  }
  @include tablet {
    display: none;
  }

  @include desktop {
    bottom: 5vh;
    left: 250px;
    width: 100px
  }

  @include desktop-lg {
    bottom: -7vh;
    left: 150px;
  }


}

.mfz_main__icon-btc {
  position: absolute;

  @include mobile-xs {
    width: 250px;
    top: 100px;
    right: 30px;
  }

  @include mobile {
    width: 250px;
    top: 150px;
    right: 0;
  }



  @include tablet {
    width: 200px;
    top: 100px;
    right: 0;
  }

  @include desktop {
    top: 10vh;
    right: 10vh;
  }

  @include desktop-lg {
    top: 10vh;
    right: 10vh;
  }
}
.mfz_main__icon-dollar {
  position: absolute;

  @include mobile {
    left: -150px;
    width: 300px;
    bottom: 50px;
  }

  @include mobile-xs {
    left: -150px;
    width: 300px;
    bottom: 20vh;
  }

  @include tablet {
    left: -150px;
    width: 300px;
    bottom: 150px;
  }

  @include desktop {
    bottom: 0;
    left: -30vh;
    transform: rotate(-25deg);
  }

  @include desktop-lg {
    bottom: 0;
    left: -30vh;
    transform: rotate(-25deg);
  }
}

.mfz-main__left_text, .mfz-main__right_text {
  color: white;

  font-weight: 600;
  position: absolute;
  bottom: 0;

  text-transform: uppercase;

  @include mobile {
    padding: 20px 15px;
    font-size: 13px;
    margin-bottom: 70px;
  }

  @include mobile-xs {
    padding: 6px 9px;
    font-size: 12px;
    bottom: 10vh
  }

  @include tablet {
    padding: 6px 9px;
    font-size: 22px;
    margin-bottom: 70px;
  }

  @include desktop {
    font-size: 30px;
    padding: 20px;
  }

  @include desktop-lg {
    font-size: 30px;
    padding: 20px;
  }

}
.mfz-main__left_text {
  left: 0
}
.mfz-main__right_text {
  right: 0
}

.bounce {
  animation: bounce 2s ease infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-30px);}
  60% {transform: translateY(-15px);}
}

.mfz-main__floating_button{
  position: absolute;
  display: flex;
  right: 10vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1vh;
  bottom: 20%;
  &:hover {
    background: unset;
  }

  @include tablet {
    right: 5vw;

  }
}
.mfz-main__floating_button__img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  box-shadow: 0px 0px 30px -10px rgba(0,0,0,0.75);
  @include mobile-all {
    width: 80px;
    height: 80px;
  }
  @include tablet {
    width: 80px;
    height: 80px;
  }
}
.mfz-main__floating_button__text {
  font-size: 1.5vh;
  text-transform: uppercase;
  text-decoration: unset;
  color: white;
  @include mobile-all {
    font-size: 1vh;
  }
  @include tablet {
    font-size: 1vh;
  }
}
</style>
