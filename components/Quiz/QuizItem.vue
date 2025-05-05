<template>
  <div class="question__box" v-if="item">
    <div v-if="selectedAnswer" class="question__next-step" @click="next">
      <NuxtImg width="30" src="https://cdn.moneyflowzen.ru/ui/arrow-right.svg" />
    </div>
    <h2 class="question__title">вопрос {{ index + 1 }}</h2>
    <p class="question__text" v-html="item.question" />
    <div class="question__answers">
      <button
        v-for="answer in item.answers"
        :class="['question__answer-btn', {'--active': selectedAnswer?.index === answer.index}]"
        :key="`${answer?.index}-answer`"
        @click="selectedAnswer = answer">
        {{ answer.text }}
      </button>
    </div>
  </div>
  <AppButton class="question__next-step-button" fluid title="далее" @click="next" :disabled="!selectedAnswer" />
</template>
<script setup lang="ts">
import type { IAnswer, IQuiz } from '~/types/pages/quiz'
import AppButton from '~/components/Buttons/AppButton.vue'
const emit = defineEmits<{
  (e: 'next', answer: IAnswer): void
}>()
defineProps<{
  item: IQuiz,
  index: number
}>()

const selectedAnswer = ref<IAnswer | null>(null)

const next = (): void => {
  emit('next', selectedAnswer.value!)
  selectedAnswer.value = null
}
</script>
<style lang="scss" scoped>
.question__box {
  background-color: #ffffff;
  width: 100%;
  min-height: 300px;
  padding: 25px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  gap: 15px;
  color: black;
}

/* Кнопка "следующий шаг" */
.question__next-step {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  height: 100%;
  width: 100%;
  transition: 0.5s;
  @include mobile-all {
    display: none;
  }

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }

  &-button {
    display: none;
    @include mobile-all {
      display: flex;
    }
  }
}

/* Контейнер для кнопок ответов */
.question__answers {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 750px;
}

/* Кнопки ответа */
.question__answer-btn {

  flex: 1 1 calc(50% - 15px);
  border: 1px solid black;
  color: black;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
}

/* Заголовок вопроса */
.question__title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

/* Текст вопроса */
.question__text {
  font-size: 16px;
  max-width: 700px;
}

.--active {
  background-color: $brand_yellow;
  color: black;

}

@include mobile-all {
  .question__box {
    padding: 15px;
  }

  .question__answers {
    gap: 5px;
  }

  .question__answer-btn {
    flex: 1 1 100%; /* Каждая кнопка на всю ширину */
  }

  .question__title {
    font-size: 20px;
  }

  .question__text {
    font-size: 14px;
  }
}
</style>