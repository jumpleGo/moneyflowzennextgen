import { useServerDatabase } from '~/server/utils/firebase'
import { child, get, query } from 'firebase/database'
import { defineEventHandler } from 'h3'
import { IBlogItem } from '~/types/pages/blog'

export default defineEventHandler(async () => {
  const { databaseRef } = useServerDatabase()

  const request = query(child(databaseRef, 'blog'))
  const snapshot = await get(request)
  const value: Record<string, IBlogItem> = snapshot.val()

  if (!value) {
    return []
  }

  return Object.values(value).map((item) => ({
    loc: `/blog/${item.key}`, // <-- должно быть `loc`, а не `url`
    lastmod: new Date(item.updatedAt * 1000).toISOString(), // <-- Дата в формате ISO строки
  }))
})