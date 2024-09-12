<template>
  <div class="product">
    <div class="product__attention--list">
      <span v-if="props.start && timeToStart" class="product__attention">{{ timeToStart }}</span>
      <span v-if="props.end && timeForEnd" class="product__end product__attention">{{
        timeForEnd
      }}</span>
      <span v-if="props.outDate && outDate" class="product__attention product__info">{{ outDate }}</span>
      <span v-if="props.nextGroup && nextGroup" class="product__attention product__next-group">{{
        nextGroup
      }}</span>
    </div>
    <div class="product__content">
      <img :src="props.image" class="product__image" />

      <h3 class="product__title" v-html="props.title" />
      <p class="product__description" v-html="props.description" />
    </div>
    <div @click="openLink" class="product__footer">
      <span class="product__more" @click="isOpenHint = !isOpenHint">Подробнее</span>
      <img class="product__arrow" src="../assets/union.svg" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
dayjs.locale('ru')
import { computed, ref } from 'vue'
import { useDetailInfoStore } from '@/stores/detail'
import { useRouter } from 'vue-router'
import { getNoun } from '@/helpers/date'

const router = useRouter()
const props = withDefaults(
  defineProps<{
    title: string
    image: string
    description: string
    link?: string
    start?: string
    nextGroup?: string
    end?: string
    outDate: string
  }>(),
  {
    link: '/'
  }
)

const openLink = () => {
  router.push(props.link)
}

const timeToStart = computed(() => {
  if (!props.start) return undefined
  let day = dayjs(props.start).diff(dayjs(new Date()), 'day', true)
  let hours, minutes, word, endTime
  let timeOut = getNoun(Math.ceil(day), 'день', 'дня', 'дней')
  word = getNoun(Math.ceil(day), 'остался', 'осталось', 'осталось')
  endTime = day
  if (day < 1) {
    hours = dayjs(props.start).diff(dayjs(new Date()), 'hours', true)
    endTime = hours
    timeOut = getNoun(Math.ceil(hours), 'час', 'часа', 'часов')
    word = getNoun(Math.ceil(hours), 'остался', 'осталось', 'осталось')
  } else if (hours < 1) {
    minutes = dayjs(props.start).diff(dayjs(new Date()), 'minutes', true)
    timeOut = getNoun(Math.ceil(minutes), 'минута', 'минуты', 'минут')
    word = getNoun(Math.ceil(minutes), 'остался', 'осталось', 'осталось')
    endTime = minutes
  }

  return endTime > 0 ? `до старта ${word} ${Math.ceil(endTime)} ${timeOut}` : false
})

const timeForEnd = computed(() => {
  if (!props.end) return undefined
  let day = dayjs(props.end).diff(dayjs(new Date()), 'day', true)
  let hours, minutes, endTime
  let timeOut = getNoun(Math.ceil(day), 'день', 'дня', 'дней')
  endTime = day
  if (day < 1) {
    hours = dayjs(props.end).diff(dayjs(new Date()), 'hours', true)
    endTime = hours
    timeOut = getNoun(Math.ceil(hours), 'час', 'часа', 'часов')
  } else if (hours < 1) {
    minutes = dayjs(props.end).diff(dayjs(new Date()), 'minutes', true)
    timeOut = getNoun(Math.ceil(minutes), 'минута', 'минуты', 'минут')
    endTime = minutes
  }

  return endTime > 0 ? `конец набора через ${Math.ceil(endTime)} ${timeOut}` : false
})

const outDate = computed(() => {
  if (!props.outDate) return undefined
  let day = dayjs(props.outDate).diff(dayjs(new Date()), 'day', true)
  let endTime
  let timeOut = getNoun(Math.ceil(day), 'день', 'дня', 'дней')
  endTime = day
  if (endTime <= 0) return false

  const res = `через ${Math.ceil(endTime)} ${timeOut}`
  return `конец курса ${day > 1 ? res : 'сегодня'}`
})

const nextGroup = computed(() => {
  if (!props.nextGroup) return undefined
  let day = dayjs(props.nextGroup).diff(dayjs(new Date()), 'day', true)
  let endTime
  let timeOut = getNoun(Math.ceil(day), 'день', 'дня', 'дней')
  endTime = day
  if (endTime <= 0) return false

  return `следующий поток через ${Math.ceil(endTime)} ${timeOut}`
})

const isOpenHint = ref(false)
</script>
<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 16px;
  border-radius: 20px;
  max-width: 350px;
  width: 100%;
  height: 320px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 1px 1px 14px -5px $brand_yellow;
  background-color: rgba(0, 0, 0, 0.5);
}
.product__title {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  margin-top: 20px;
}
.product__description {
  font-size: 14px;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
}
.product__attention--list {
  position: absolute;
  right: 10px;
  top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 8px;
}
.product__attention {
  width: fit-content;
  color: white;
  font-size: 12px;
  background: #9f9222;
  padding: 5px 10px;
  border-radius: 10px;
}

.product__end {
  background: #889f0c;
}
.product__info {
  background: #13bfc5;
}
.product__next-group {
  background: #8a13c5;
}
.product__content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  flex: 1;
}
.product__image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.product__footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  margin-top: 16px;
  align-items: flex-end;

  &:hover {
    cursor: pointer;
  }
}
.product__more {
  font-size: 13px;
  color: #febe16;
  font-weight: 600;
  text-transform: lowercase;
}
.product__link {
  width: 100%;
  &:hover {
    background: transparent;
  }
}
.product__arrow {
  transform: rotate(-90deg);
  height: 20px;
}
</style>
