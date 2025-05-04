export interface IQuiz {
  index: number,
  question: string,
  answers: IAnswer[],

}

export interface IAnswer {
  text: string,
  isCorrect: boolean,
  index: number
}
export interface IQuizResultData {
  title: string,
  description: string,
}
export interface IQuizResult {
  junior: IQuizResultData
  middle: IQuizResultData
  senior: IQuizResultData
}