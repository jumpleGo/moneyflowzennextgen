<template>
  <div class="app-user-telegram" :style="isFullscreen ? 'top: 160px' : 'top: 15px'">

    <nuxt-img :preload="{fetchPriority: 'high'}" loading="eager" :src="user.photo_url"  class="app-user-telegram__photo" />
    <span class="app-user-telegram__name" >{{ user.first_name }}</span>
    {{ isFullscreen.toString() }}
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const {user, isFullscreen} = storeToRefs(useUserStore())

</script>
<style lang="scss" scoped>
.app-user-telegram {
  padding: 5px 8px;
  background: rgba(211, 181, 45, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 50px;
  position: absolute;
  width: fit-content;
  left: 16px;
  right: 0;

  &__photo {
    width: 20px;
    height: 20px;
    border-radius: 50%
  }

  &__name {
    color: #fff;
    font-size: 12px;
  }
}
</style>