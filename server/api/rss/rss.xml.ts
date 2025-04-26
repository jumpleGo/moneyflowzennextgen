// server/routes/rss.xml.ts
import { defineEventHandler, send } from 'h3'
import { useServerDatabase } from '~/server/utils/firebase'
import { child, get, query } from 'firebase/database'

export default defineEventHandler(async (event) => {
  const { databaseRef } = useServerDatabase()

  const snapshot = await get(query(child(databaseRef, 'blog')))
  const posts = snapshot.val()

  if (!posts) {
    return send(event, '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel></channel></rss>', 'application/rss+xml')
  }

  const items = Object.values(posts).map((post: any) => {
    const description = post.description || post.title || ''
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://moneyflowzen.ru/blog/${post.key}</link>
      <description><![CDATA[${description.length > 200 ? description.slice(0, 197) + '...' : description}]]></description>
      <pubDate>${new Date(post.updatedAt * 1000).toUTCString()}</pubDate>
      <guid>https://moneyflowzen.ru/blog/${post.key}</guid>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MoneyFlowZen - Блог о трейдинге и крипте</title>
    <link>https://moneyflowzen.ru/blog</link>
    <description>Свежие статьи по трейдингу, криптовалютам и инвестициям от MoneyFlowZen</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return send(event, rss, 'application/rss+xml')
})
