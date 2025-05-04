<template>
  <div class="question">
    <div v-if="!showFinish" class="question__wrapper">
<!--      <span class="question__back-btn">назад</span>-->
      <div v-if="data" class="question__progress-bar">
        <div
          v-for="index in countQuestions"
          :key="index"
          :class="[
            'question__progress-step',
            index <= currentQuestionIndex ? 'question__progress-step--completed' : 'question__progress-step--inactive'
          ]"
        ></div>
      </div>
      <QuizItem :item="currentQuestion" :index="currentQuestionIndex" @next="next"/>
    </div>
    <ResultTestTemplate v-else class="question__result" :result="calculatedResult" :count-questions="countQuestions" :count-right-answers="countRightAnswers" />
  </div>
</template>
<script lang="ts" setup>
import type { IAnswer, IQuiz, IQuizResult, IQuizResultData } from '~/types/pages/quiz'
import { Getter } from '~/helpers/getter'
import ResultTestTemplate from '~/components/Quiz/ResultTestTemplate.vue'
const route = useRoute()

const {data} = useAsyncData(async () => {
  const quizQuestions: IQuiz[] = await Getter.getByKey('quiz', route.query.type as string)
  return { quizQuestions }
})

const countQuestions = computed(() => Object.keys(data.value?.quizQuestions || {}).length)
const currentQuestionIndex = shallowRef(0)
const showFinish = shallowRef(false)


const currentQuestion = computed<IQuiz>(() => Object.values(data.value?.quizQuestions || {})?.[currentQuestionIndex.value])
const selectedAnswers = ref<IAnswer[]>([])
const countRightAnswers = computed(() => selectedAnswers.value.filter(item => item.isCorrect).length)

const resultData = ref<IQuizResult>()
const calculatedResult = computed<IQuizResultData | undefined>(() => {
  if (countRightAnswers.value <= 3) {
    return resultData.value?.junior
  } else if (countRightAnswers.value > 3 && countRightAnswers.value < 8) {
    return resultData.value?.middle
  } else {
    return resultData.value?.senior
  }
})

const next = async (answer: IAnswer) => {
  selectedAnswers.value.push(answer)
  if (currentQuestionIndex.value !== (countQuestions.value - 1)) {
    currentQuestionIndex.value +=1
  } else {
    resultData.value = await Getter.getByKey('quizResults', route.query.type as string)
    showFinish.value = true
  }
}
</script>
<style lang="scss" scoped>
/* Блок вопроса */
.question {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Обертка для вопроса */
.question__wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  max-width: 900px;
  width: 100%;
  margin: 60px 0;
}

.question__result {
 
}

/* Кнопка "назад" */
.question__back-btn {
  border: none;
  font-weight: bold;
  color: white;
  font-size: 16px;
  padding: 3px 0;
  cursor: pointer;
  border-bottom: 2px solid $brand_yellow;
}

/* Прогресс-бар */
.question__progress-bar {
  display: flex;
  gap: 5px;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  overflow: hidden;
}

/* Шаги прогресса */
.question__progress-step {
  flex: 1;
  background-color: #d3d3d3;
  transition: background-color 0.3s ease;
  border-radius: 5px;
}

.question__progress-step--completed {
  background-color: $brand_yellow;
}

.question__progress-step--inactive {
  background-color: #d3d3d3;
}

.question__wrapper-result {
  color: white
}

/* Адаптивность для мобильных устройств */
@include mobile-all {
  .question {
    padding: 10px;
  }

  .question__wrapper {
    gap: 15px;
  }
}
</style>