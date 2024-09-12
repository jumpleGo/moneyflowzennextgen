<template>
  <div class="roadmap">
    <h2 class="roadmap__title">С чего начать новичку?</h2>
    <img class="roadmap__light" src="../assets/light.svg">
    <img class="roadmap__light-1" src="../assets/light.svg">
    <img class="roadmap__light-2" src="../assets/light.svg">
    <div class="timeline">
      <div class="outer">
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 1</h3>
            <p>Изучить и настроить инструмнет для анализа графиков - <span class="yellow">TradingView</span></p>
          </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 2</h3>
            <p>Изучить типы графиков,  чем они отличаются, как работают и что значат. <br>(линейный, японские свечи)</p>
          </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 3</h3>
            <p>Изучить что такое индикаторы. Понять зачем они нужны, как работают и подобрать для себя несколько из них.</p>
          </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 4</h3>
            <p>Узнать про уровни сопротивлений и поддержки. Понять как их строить и находить.</p>
            </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 5</h3>
            <p>Изучить как работают инструменты в TradingView и научиться применять их.<br>(профиль объема, фибоначчи)</p>
          </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 6</h3>
            <p>Научиться строить трендовые.</p>
          </div>
        </div>
        <div class="card">
          <div class="info">
            <h3 class="title">Шаг 7</h3>
            <p>Изучить фигуры и их отработку.</p>
          </div>
        </div>
      </div>
    </div>
    <h4 class="roadmap__finish">Поздравляю, теперь ты крутой начинающий трейдер с мощнейшей базой. Продолжай погружаться в тему, изучай рынок глубже и достаточно времени удели риск-менеджменту. <br><b>Тебе не будет равных!</b></h4>
   <div class="roadmap__button-wrapper">
     <AppButton to="https://t.me/rrotatew" title="Стать гуру" class="roadmap__button" />
   </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from "@/components/Buttons/AppButton.vue";

</script>
<style scoped lang="scss">
.roadmap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 60px;
}
.roadmap__light {
  position: absolute;
  left: 20%;
  z-index: 0;
}
.roadmap__light-1 {
  position: absolute;
  top: 30%;
  right: 20%;
  z-index: 0;
}
.roadmap__light-2 {
  position: absolute;
  top: 60%;;
  z-index: 0;
  @include desktop {
    top: 60vh;
    left: 20vw
  }
}
.roadmap__title {
  font-size: 25px;
  text-transform: uppercase;
  color: white;
  font-weight: 600;
  border-bottom: 1px solid $brand_yellow;

  @include tablet {
    font-size: 40px;
  }

  @include desktop {
    font-size: 45px;
    margin-top: 100px;
  }

  @include desktop-lg {
    font-size: 60px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
/* Timeline Container */
.timeline {
  margin-top: 20px;
  padding: 20px;
}

/* Card container */
.card {
  position: relative;
  max-width: 400px;

  @include desktop {
    max-width: 800px;
    font-size: 18px;
  }

  @include desktop-lg {
    max-width: 800px;
    font-size: 19px;
  }
}

/* setting padding based on even or odd */
.card:nth-child(odd) {
  padding: 30px 0 30px 30px;
}
.card:nth-child(even) {
  padding: 30px 30px 30px 0;
}
/* Global ::before */
.card::before {
  content: "";
  position: absolute;
  width: 50%;
  border: solid $brand_yellow;
}

/* Setting the border of top, bottom, left */
.card:nth-child(odd)::before {
  left: 0px;
  top: -5px;
  bottom: -4.5px;
  border-width: 5px 0 5px 5px;
  border-radius: 50px 0 0 50px;
}

/* Setting the border of top, bottom, right */
.card:nth-child(even)::before {
  right: 0;
  top: 0;
  bottom: 0;
  border-width: 5px 5px 5px 0;
  border-radius: 0 50px 50px 0;
}

/* Removing the border if it is the first card */
.card:first-child::before {
  border-top: 0;
  border-top-left-radius: 0;
}

/* Removing the border if it is the last card  and it's odd */
.card:last-child:nth-child(odd)::before {
  border-bottom: 0;
  border-bottom-left-radius: 0;
}

/* Removing the border if it is the last card  and it's even */
.card:last-child:nth-child(even)::before {
  border-bottom: 0;
  border-bottom-right-radius: 0;
}

/* Information about the timeline */
.info {
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.5);
  color: white;
  border-radius: 10px;
  padding: 10px;
}

/* Title of the card */
.title {
  color: $brand_yellow;
  position: relative;
}

/* Timeline dot  */
.title::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 999px;
  border: 3px solid $brand_yellow;
}

/* text right if the card is even  */
.card:nth-child(even) > .info > .title {
  text-align: right;
}

/* setting dot to the left if the card is odd */
.card:nth-child(odd) > .info > .title::before {
  left: -45px;
}

/* setting dot to the right if the card is odd */
.card:nth-child(even) > .info > .title::before {
  right: -45px;
}
.roadmap__finish {
  padding: 0 20px;
  color: white;
  margin-top: -10px;

  @include tablet {
    width: 50%
  }
  @include desktop {
    margin-top: 40px;
    font-size: 24px;
    width: 800px;
    padding: 0;
  }

  @include desktop-lg {
    margin-top: 40px;
    font-size: 24px;
    width: 800px;
    padding: 0;
  }
}
.roadmap__button-wrapper {
  padding: 0 20px;
  width: 100%;
  z-index: 3;
  @include tablet {
    width: 50%;
  }
  @include desktop {
    width: 800px;
    padding: unset;
    display: flex;
    justify-content: center;
  }

  @include desktop-lg {
    width: 800px;
    padding: unset;
    display: flex;
    justify-content: center;
  }
}
.roadmap__button {
  margin-top: 20px;
  z-index: 2;
  width: 100% !important;
}
</style>
