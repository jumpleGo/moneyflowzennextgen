<template>
  <div class="mfz__footer">
    <div class="mfz__footer_left_block">
      <img class="mfz__footer__logo logo" src="/assets/logo.png" />
      <div class="mfz__footer__text">
        <h1>mfz</h1>
        <h3>money flow zen</h3>
      </div>
    </div>
    <div class="mfz__footer_right_block">
     <div class="mfz__footer__social_media">
       <a href="https://t.me/mfz_official" class="mfz__footer_social">
         <img src="/assets/telegram.svg" />
       </a>
       <a href="https://www.threads.net/@money_flow_zen" class="mfz__footer_social">
         <img src="/assets/threads.svg" />
       </a>
       <a href="https://pin.it/5zT4pEn6p" class="mfz__footer_social">
         <img src="/assets/pinterest.svg" />
       </a>
       <a href="https://www.instagram.com/money_flow_zen?igsh=MW4xeDR1bDZyb3MzNA%3D%3D&utm_source=qr" class="mfz__footer_social">
         <img src="/assets/instagram.svg" />
       </a>
       <a href="https://youtube.com/@mfz_official?si=FeM-diAeqe2OKPe8" class="mfz__footer_social">
         <img src="/assets/youtube.svg" />
       </a>
     </div>
      <p class="mfz__footer__info">
        для связи с автором <a href="https://t.me/rrotatew">@rrotatew</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" scoped>

</script>
<style lang="scss" scoped>
.mfz__footer {
  background: black;
  display: flex;
flex: 1;
  z-index: 5;
  @include mobile-xs {
    padding: 30px 15px;
    flex-direction: column;
    width: 100%;
  }

  @include mobile {
    padding: 30px 15px;
    flex-direction: column;
    width: 100%;
  }

  @include tablet {
    padding: 30px 15px;
    justify-content: space-between;
    width: 100%;
  }

  @include desktop {
    padding: 32px 40px;
    justify-content: space-between;
  }

  @include desktop-lg {
    padding: 32px 40px;
    justify-content: space-between;
  }
}
.mfz__footer_left_block {
  display: flex;
  align-items: center;
}
.mfz__footer__logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.mfz__footer__text {
  text-transform: uppercase;
  margin-left: 10px;
  color: $brand_yellow;
  h1 {
    font-size: 25px;
    line-height: 25px;
    font-weight: 700;
  }
  h3 {
    font-size: 18px;
    line-height: 20px;
  }
}

.mfz__footer_right_block {
  margin-top: 40px
}
.mfz__footer__social_media {
  display: flex;
  column-gap: 5px;
}
.mfz__footer_social {

  height: auto;
  padding: unset;
  text-decoration: unset;
  background: transparent;
  img {
    height: 30px;
    width: 30px;
    border-radius: 10px;
  }
}
.mfz__footer__info {
  color: white;
  margin-top: 5px;
  a {
    text-decoration: none;
    color: $brand_yellow
  }
}
</style>