<template>
  <div class="container">
    <h1>Квиз</h1>
    <AppInput v-model="form.question" placeholder="Вопрос" label="Вопрос" id="question" />
    <AppInput v-model="key" placeholder="ключ квиза" label="ключ квиза"  id="quiz-key" />
    <div>
      <h2>Ответы</h2>
      <div v-for="answer in answers" :key="answer.index">
        <AppInput v-model="answer.text" :id="`${answer.index}-id`"  />
        <AppCheckbox v-model="answer.isCorrect" :id="`${answer.index}-id`"  />
      </div>
    </div>
    <AppButton size="xs" title="добавить ответ" @click="createAnswerForm" />
    <hr>
    <AppButton :type="'black'" title="сохранить вопрос" @click="saveAnswer" />
  </div>
</template>
<script lang="ts" setup>
import type { IAnswer, IQuiz } from '~/types/pages/quiz'
import AppButton from '~/components/Buttons/AppButton.vue'
import AppCheckbox from '~/components/App/AppCheckbox.vue'
import { Setter } from '~/helpers/setter'
import { Getter } from '~/helpers/getter'



const form = reactive<Partial<IQuiz>>({
  index: 0,
  question: '',
})

const answers = ref<IAnswer[]>([])
const key = ref<string>('')

const createAnswerForm = () => {
  answers.value.push({
    index: answers.value.length+1,
    text: '',
    isCorrect: false
  })
}

const getCurrentQuiz = async () => {
  return await Getter.getByKey('quiz', key.value)
}

const saveAnswer = async () => {
  if (!key.value) return

  const currentQuiz = await getCurrentQuiz()
  const payload = {
    ...form,
    index: Object.keys(currentQuiz).length,
    answers: answers.value
  }
  await Setter.pushToDb(`/quiz/${key.value}`, payload)
  answers.value = []
  form.question = ''
}

</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  padding: 20px;
}
</style>