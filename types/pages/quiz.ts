export interface IQuiz {
  questions: IQuestion[]

}

export interface IQuestion {
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
export interface IQuizItem {
  title: string,
  description: string,
  questions: IQuestion[],
  key: string,
  level: number
}

export interface IQuizResult {
  junior: IQuizResultData
  middle: IQuizResultData
  senior: IQuizResultData
}