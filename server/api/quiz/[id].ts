// /server/api/blog/[id].ts
import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id


  const {databaseRef} = useServerDatabase()
  let quiz = {}

  const request = query(child(databaseRef, 'quiz'), orderByChild('key'), equalTo(id))

  const snapshotFetchedQuiz = await get(request)

  if (snapshotFetchedQuiz.exists()) {
    quiz = Object.values(snapshotFetchedQuiz.val())?.[0] || {}
  }

  console.log(quiz)
  return quiz
})
