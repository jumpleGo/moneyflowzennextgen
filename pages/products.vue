<template>
  <div class="list-products">
    <img class="list-products__euro" src="../assets/euro.png">
    <div class="interactive_block-2">
      <img class="list-products__light" src="../assets/light.svg">
      <img class="list-products__ellipse-1" src="../assets/ellipse1.png">
      <img class="list-products__ellipse-2" src="../assets/ellipse3.png">
      <img class="list-products__ellipse-3" src="../assets/ellipse3.png">
    </div>

    <div class="round" />
    <div class="list-products__content">
      <img v-if="productsActive?.length" src="../assets/moln.svg" class="list-products__moln">
      <div v-if="productsActive.length" class="list-products--list">
        <Product  v-for="item in productsActive" :key="item.link" v-bind="item" class="product-item" />
      </div>
      <div v-else class="list-products--list">
        <ProductSceleton  v-for="item in 3" :key="`mock-${item}`" class="product-item" />
      </div>
    </div>

    <div class="interactive_block">
      <img class="list-products__light--bottom" src="../assets/light.svg">
      <img class="list-products__guru" src="../assets/guru.png">
      <img class="list-products__ellipse-1--bottom" src="../assets/ellipse1.png">
      <img class="list-products__ellipse-2--bottom" src="../assets/ellipse3.png">
      <img class="list-products__ellipse-3--bottom" src="../assets/ellipse3.png">
    </div>
  </div>
</template>
<script lang="ts" setup>

import Product from "@/components/Product.vue";
import ProductSceleton from "@/components/ProductSceleton.vue";
import {useDetailInfoStore} from "@/stores/detail";
import {storeToRefs} from "pinia";
import { Getter } from '~/helpers/getter'
const {productsActive, products, tariffs } = storeToRefs(useDetailInfoStore())
const { $databaseRef } = useNuxtApp()

const {data} = useAsyncData(async () => {
  products.value = await Getter.getFromDB( 'products/')
  tariffs.value = await Getter.getFromDB('tariffs/')
})

</script>
<style lang="scss" scoped>
.product-item {
  z-index: 4;

}
.list-products--list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  position: relative;
  align-items: center;
  justify-content: center;
  height: fit-content;

  @include desktop{
    flex-direction: row;
    column-gap: 16px;
    flex-wrap: wrap;
    padding: 0 60px
  }
  @include desktop-lg{
    flex-direction: row;
    column-gap: 16px;
    flex-wrap: wrap;
    padding: 0 60px;
    height: 100%;
  }
}

.list-products__content {
  position: relative;
}
.list-products {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  position: relative;
  padding: 200px 0 60px;
  min-height: calc(100vh - 200px);

  @include desktop {
    justify-content: center;

  }
  @include desktop-lg {
    overflow: unset;
    justify-content: center;

  }
}

.list-products__light--bottom, .list-products__light {
  position: absolute;
  right: calc((210px - 619px)/2);
  top: calc((210px - 619px)/2);
}
.list-products__ellipse {
  position: absolute;

}


.list-products__ellipse-1--bottom, .list-products__ellipse-1 {
  position: absolute;
  animation: rotating 40s linear infinite;
  width: 150px;
  height: 150px;
  margin-top: calc((210px - 150px)/2);
  margin-left: calc((210px - 150px)/2);
}
.list-products__ellipse-2--bottom, .list-products__ellipse-2 {
  position: absolute;
  animation: rotating-reverse 60s linear infinite;
  width: 180px;
  height: 180px;
  margin-top: calc((210px - 180px)/2);
  margin-left: calc((210px - 180px)/2);
}
.list-products__ellipse-3--bottom, .list-products__ellipse-3 {
  position: absolute;
  animation: rotating 90s linear infinite;
  width: 210px;
  height: 210px;

}

.list-products__guru {
  width: 130px;
  position: absolute;
  margin-top: calc((210px - 130px)/2);
  margin-left: calc((210px - 130px)/2);
}
.list-products__moln {
  position: absolute;
  top: -120px;
  right: -30%;
  width: 200px;
  z-index: 3;

  @include desktop {
    right: 0;
    top: -100px;
  }
  @include desktop-lg{
    right: 0;
    top: -100px;
  }
}

.list-products__round {
  position: absolute;
  width: 200px;
  top: 10%;
  right: -5%
}


@keyframes rotating {
  0%{transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
}

@keyframes rotating-reverse {
  0%{transform: rotate(0deg)}
  100% {transform: rotate(-360deg)}
}

.interactive_block, .interactive_block-2 {
  position: absolute;
  display: flex;
  width: 210px;
  height: 210px;

}
.interactive_block {
  margin-top: 200px;
  margin-left: 100%
}
.interactive_block-2 {
  margin-left: -100%;
}

.list-products__euro {
  position: absolute;
  width: 300px;
  bottom: 0;
  left: -150px;
}
</style>