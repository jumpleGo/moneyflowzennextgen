<template>
  <div class="container">
    <h1>Блог</h1>
    <AppInput v-model="form.title" placeholder="Заголовок" label="Заголовок" id="title" />
    <AppInput v-model="form.ogtitle" placeholder="OG Заголовок" label="OG Заголовок" id="ogtitle" />
    <AppInput v-model="form.description" placeholder="Описание" label="Описание" id="description" />
    <AppInput v-model="form.ogdescription" placeholder="OG Описание" label="OG Описание" id="ogdescription" />
    <AppInput v-model="form.key" placeholder="ключ" label="ключ"  id="key" />
    <AppInput v-model="form.image" placeholder="Картинка" label="Картинка"  id="image" />
    <AppInput v-model="form.level" placeholder="Уровень" label="Уровень"  id="level" />
    <AppInput v-model="form.time" placeholder="Время" label="Время"  id="time" />
    <textarea v-model="form.text" />
    <hr>
    <AppButton title="сохранить" @click="saveBlog" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from '~/components/Buttons/AppButton.vue'
import { Setter } from '~/helpers/setter'
import { Getter } from '~/helpers/getter'
import type { IBlogItem } from '~/types/pages/blog'

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex,nofollow'
    }
  ]
})

const form = reactive<Partial<IBlogItem>>({
  index: 0,
  title: '',
  ogtitle: '',
  description: '',
  ogdescription: '',
  text: '',
  key: '',
  image: '',
  updatedAt: Math.floor(new Date().getTime() / 1000),
  createdAt: Math.floor(new Date().getTime() / 1000),
  likes: 0,
  views: 0,
  reads: 0,
  level: 0,
  time: 0,
})


const getBlogs = async () => {
  return await Getter.getFromDB('blog')
}


const saveBlog = async () => {
  const blogs = await getBlogs()
  const lastObj = Object.values(blogs).pop()
  const currIndex = lastObj?.index+1
  const payload = {
    ...form,
    prev: lastObj?.key,
    index: currIndex
  }
  await Setter.setToDb(`/blog/${currIndex}`, payload)
  console.log(payload)
}

</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  padding: 20px;
  color: white;
}
</style>