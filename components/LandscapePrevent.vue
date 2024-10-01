<template>
  <div class="landscape-prevent">
    <img src="/assets/icons/rotate.png" class="landscape-prevent__image" />
    <span class="landscape-prevent__text">Горизонтальная ориентация не поддерживается.</span>
    <span class="landscape-prevent__text">Переверните устройство.</span>
  </div>

</template>

<style lang="scss" scoped>
.landscape-prevent__text {
  color: $brand_yellow;
  text-align: center;
}
.landscape-prevent__image {
  width: 20%;
}
.landscape-prevent {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;

  @include landscape {
    display: flex;
  }
}




</style>
<script setup lang="ts">
</script>