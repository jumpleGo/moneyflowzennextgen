import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'
import type { IBlogItem } from '~/types/pages/blog'
import { getQuery, getRouterParams, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {

  const {databaseRef} = useServerDatabase()
  const queryReq = getQuery(event)
  console.log(queryReq)

  const queryArgs = []
  if (queryReq.level) {
    queryArgs.push(equalTo(+queryReq.level))
  }


  const request = query(child(databaseRef, 'blog'), orderByChild('level'), ...queryArgs)

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
