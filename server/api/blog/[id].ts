// /server/api/blog/[id].ts
import { useServerDatabase } from '~/server/utils/firebase'
import { child, equalTo, get, orderByChild, query } from 'firebase/database'

export default defineEventHandler(async (event) => {
  console.log('SERVAR', event.context, event)
  const id = event.context.params?.id
  const {databaseRef} = useServerDatabase()

  const request = query(child(databaseRef, 'blog'), orderByChild('key'), equalTo(id))

  const fetchedArticle = await  get(request).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  })

  return Object.values(fetchedArticle)?.[0] || {}
})
