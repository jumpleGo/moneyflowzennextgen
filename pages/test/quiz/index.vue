<template>
  <div class="quiz">
    <h1 class="quiz__title">Проверка знаний</h1>
    <div v-if="data" class="quiz__wrapper">
      <QuizCard v-for="quizItem in data" :item="quizItem" class="quiz__wrapper-card"  />
    </div>
  </div>
</template>
<script lang="ts" setup>
const { data } = await useFetch('/api/quiz', {
  method: 'GET',
})

useHead({
  title: 'Проверка знаний | Money Flow Zen'
})
</script>
<style lang="scss" scoped>
.quiz {
  display: flex;
  flex-direction: column;
  justify-content: center;


    &__title {
      font-size: 28px;
      margin-bottom: 45px;
      color: white;
      text-transform: uppercase;
      text-align: center;
    }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 100px 0;
    max-width: 1240px;
    margin: 0 auto;
    width: 100%;

    @include mobile-all {
      padding: 30px 20px;
    }

    &-card {

    }
  }
}

</style>