<template>
  <nuxt-link :to="guideUrl" target="_blank" @click="open">
    <img
      v-if="showRocket"
      src="/assets/rocket.png"
      :class="['link_image', {'link_image_up': rocketClicked }]"/>
  </nuxt-link>
</template>
<script lang="ts" setup>
import useResponsive from '~/composables/useResponsive'
const emit = defineEmits<{
  (e: 'opened'): void
}>()
const props = defineProps<{
  showRocket: boolean,
  rocketClicked: boolean,
  guideUrl: string
}>()
const rocketClicked = shallowRef(false)
const {isMobile} = useResponsive()
const open = () => {
  rocketClicked.value = true
  emit('opened')
}
const download = () => {
  downloadPDF()
}

const downloadPDF = () => {
  const url = props.guideUrl
  if (isMobile.value) {
    window.location.href = url
    return
  }


  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    console.log(xhr)
    if (xhr.status === 200) {
      var blob = xhr.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'путь в трейдинг'; // Задайте имя файла, какое вы хотите
      link.click();
    }
  };
  xhr.send();
}
</script>

<style lang="scss" scoped>

.link_image {
  position: absolute;
  width: 70px;
  height: auto;
  right: 10vw;
  top: 13vh;
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.5);
  animation: shake 3s infinite;
  @include mobile-all {
    width: 50px;
    top: 20vh;
  }
}
.link_image_up {
  transition: 1s;
  animation: upRocked 3s ease-out;
  opacity: 0;
}
</style>