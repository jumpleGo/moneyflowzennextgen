import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'
import { defineEventHandler } from 'h3'
import { IBlogItem } from '~/types/pages/blog'

export default defineEventHandler(async () => {
  const {databaseRef} = useServerDatabase()


  const request = query(child(databaseRef, 'blog'))
  const snapshotFetchedArticle = await get(request)
  const value: Record<string, IBlogItem> = snapshotFetchedArticle.val()
  return Object.values(value)
    .map((item) =>  ({
      url: `/blog/${item!.key}`,
      lastmod: new Date(item!.updatedAt)
    })
  )
})