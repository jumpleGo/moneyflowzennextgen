<template>
  <div class="product-sceleton">
    <div class="product-sceleton__content">
      <div  class="product-sceleton__image" />

      <div class="product-sceleton__title" />
      <div class="product-sceleton__description" />
    </div>
    <div class="product-sceleton__footer" />
  </div>
</template>

<style lang="scss" scoped>
.product-sceleton {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 20px;
  width: 350px;
  height: 320px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.5);
}
.product-sceleton__title {
  height: 32px;
  background: white;
  opacity: 0.5;
  width: 100%;
  animation: lighting 4s linear infinite;
}
.product-sceleton__description {
  height: 111px;
  background: white;
  opacity: 0.5;
  width: 100%;
  animation: lighting 4s linear infinite;
}
.product-sceleton__content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  flex: 1;
}
.product-sceleton__image {
  width: 60px;
  height: 60px;
  background: white;
  opacity: 0.5;
  animation: lighting 4s linear infinite;

}
.product-sceleton__footer {
  height: 20px;
  background: white;
  width: 100%;
  opacity: 0.5;
  animation: lighting 4s linear infinite;
}


</style>