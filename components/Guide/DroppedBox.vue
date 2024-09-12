<template>
  <div :class="['badge free', {'droppedFree': isClicked}, {'show': showBadges}]">{{ firstText }}</div>
  <div :class="['badge', 'forStart', {'show': showBadges}, {'droppedStart': isClicked}]">{{ secondText }}</div>
  <div :class="['badge', 'best', {'show': showBadges}, {'dropBest': isClicked}]">{{ thirdText }}</div>
  <div :class="['badge',  'anim1 info', {'show': showBadges}]">{{ fourthText }}</div>
  <div :class="['badge anim1 where',{'show': showBadges}, {'droppedWhere': isClicked}]">{{ fifthText }}</div>
  <div :class="['badge', 'anim2', 'guide', {'show': showBadges}]">{{ sixthText }}</div>
  <slot />
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
  showBadges: boolean,
  isClicked: boolean,
  firstText?: string
  secondText?: string
  thirdText?: string
  fourthText?: string
  fifthText?: string
  sixthText?: string
}>(), {
  firstText: 'Бесплатно!',
  secondText: 'Для начинающих',
  thirdText: 'лучший гайд',
  fourthText: 'куча инфы',
  fifthText: 'где?',
  sixthText: 'гайд??'
})
</script>
<style lang="scss" scoped>
.anim1 {
  animation: move 5s linear infinite;
}
.anim2 {
  animation: move2 5s linear infinite;
}

.free {
  padding: 10px 15px;
  background: white;
  transform: translateX(20vw) translateY(-100vh);
}
.forStart {
  padding: 10px 20px;
  background: #f4b819;
  color: black;
  transition: .4s;
  @include mobile-all {
    transform: translateX(60vw) translateY(-100vh) rotate(25deg);
  }
}

.best {
  padding: 10px 20px;
  background: #f4b819;
  color: black;
  @include mobile-all {
    padding: 1.2vh 20px;
  }
}

.info {
  padding: 10px 20px;
  background: #ffffff;
  color: black;
  left: 20%;
  font-size: 20px;
  top: 60%;
  @include mobile-all {
    left: 10%;
    top: 60%;
  }
}
.where {
  padding: 10px 15px;
  background: #ee9024;
  color: black;
}

.guide {
  padding: 10px 15px;
  background: #ee9024;
  color: black;
  right: 12%;
  font-size: 20px;
  top: 47%;

  @include mobile-all {
    right: 10%;
    font-size: 15px;
    top: 25%;
  }
}

.dropBest {
  animation: dropBest 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropBestMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  }
}
.droppedWhere {
  animation: dropWhere 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropWhereMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  }
}
.droppedFree {
  animation: dropFree 2s cubic-bezier(0, 0, 0.35, 1) forwards;

  @include mobile-all {
    animation: dropFreeMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
    animation-delay: 1s;
  }
}
.droppedStart {
  animation: dropStart 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropStartMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
    animation-delay: 1s;
  }
}
</style>