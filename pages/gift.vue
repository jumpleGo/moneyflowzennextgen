<template>
  <div class="wrapper">
    <WelcomeGiftPage v-if="!showGame" @openGame="showGame = true"/>
    <GiftGamePage v-else  />
  </div>

</template>
<script setup lang="ts">
import WelcomeGiftPage from "@/components/WelcomeGiftPage.vue";
import GiftGamePage from "@/components/GiftGamePage.vue";
import {shallowRef} from "vue";

const showGame = shallowRef<boolean>(false)
</script>