// /server/api/blog/[id].ts
import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id


  const {databaseRef} = useServerDatabase()
  let article = {}

  const request = query(child(databaseRef, 'blog'), orderByChild('key'), equalTo(id))

  const snapshotFetchedArticle = await get(request)
  if (snapshotFetchedArticle.exists()) {
    article = Object.values(snapshotFetchedArticle.val())?.[0] || {}
  }

  const snapshotFetchedArticleNext = await get(query(child(databaseRef, 'blog'), orderByChild('index'), equalTo(article.index+1)))
  if (snapshotFetchedArticleNext.exists()) {
    article.nextArticle = Object.values(snapshotFetchedArticleNext.val())?.[0] || {}
  }

  if (!(article.index-1<0)) {
    const snapshotFetchedArticlePrev = await get(query(child(databaseRef, 'blog'), orderByChild('index'), equalTo(article.index-1)))
    if (snapshotFetchedArticlePrev.exists()) {
      article.prevArticle = Object.values(snapshotFetchedArticlePrev.val())?.[0] || {}
    }
  }



  return article
})
