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
      <nuxt-img v-if="props.image" :src="props.image" class="product__image" />

      <h3 v-if="props.title" class="product__title" v-html="props.title" />
      <client-only>
        <p class="product__description" v-html="props.description" />
      </client-only>
    </div>
    <div @click="openLink" class="product__footer">
      <span class="product__more">Подробнее</span>
      <img class="product__arrow" src="../assets/union.svg" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
dayjs.locale('ru')
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getNoun } from '@/helpers/date'

const router = useRouter()
const props = withDefaults(
  defineProps<{
    title?: string
    image?: string
    description?: string
    link?: string
    start?: string
    nextGroup?: string
    end?: string
    outDate?: string
  }>(),
  {
    link: '/'
  }
)

const openLink = () => {
  router.push(`/products/${props.link}`)
}
const calculateTime = (date, prefix, suffix) => {
  if (!date) return undefined;

  const now = dayjs(new Date());
  let timeDiff = dayjs(date).diff(now, 'day', true);
  let timeUnit = 'день';
  let endTime = timeDiff;

  if (timeDiff < 1) {
    timeDiff = dayjs(date).diff(now, 'hours', true);
    timeUnit = 'час';
    endTime = timeDiff;
  }
  if (timeDiff < 1) {
    timeDiff = dayjs(date).diff(now, 'minutes', true);
    timeUnit = 'минута';
    endTime = timeDiff;
  }

  const timeOut = getNoun(Math.ceil(timeDiff), timeUnit, ['дня', 'часа', 'минуты'], ['дней', 'часов', 'минут']);
  return endTime > 0 ? `${prefix} ${Math.ceil(endTime)} ${timeOut} ${suffix}` : false;
};


const timeToStart = computed(() => calculateTime(props.start, 'до старта осталось', ''));
const timeForEnd = computed(() => calculateTime(props.end, 'конец набора через', ''));
const outDate = computed(() => {
  const result = calculateTime(props.outDate, '', '');
  if (result === undefined) return undefined;

  return props.outDate && dayjs(props.outDate).diff(dayjs(new Date()), 'day') > 1
    ? `конец курса ${result}`
    : `конец курса сегодня`;
});
const nextGroup = computed(() => calculateTime(props.nextGroup, 'следующий поток через', ''));
</script>
<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
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
  max-height: 70px;
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
  background: #9f9222;
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
