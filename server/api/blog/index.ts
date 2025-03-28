import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'
import type { IBlogItem } from '~/types/pages/blog'

export default defineEventHandler(async (event) => {
  const {databaseRef} = useServerDatabase()

  const request = query(child(databaseRef, 'blog'), orderByChild('updatedAt'))

  const snapshotFetchedArticles = await get(request)

  if (!snapshotFetchedArticles.exists()) {
    console.log('No data available')
    return []
  }

  const dataArr: IBlogItem[] = []

  snapshotFetchedArticles.forEach((childSnapshot) => {
    dataArr.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    })
  })

  return dataArr
})
