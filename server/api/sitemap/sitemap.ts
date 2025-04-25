import { useServerDatabase } from '~/server/utils/firebase'
import { child, get, query } from 'firebase/database'
import { defineEventHandler, send } from 'h3'
import { IBlogItem } from '~/types/pages/blog'

export default defineEventHandler(async (event) => {
  const { databaseRef } = useServerDatabase()
  const request = query(child(databaseRef, 'blog'))
  const snapshot = await get(request)
  const value: Record<string, IBlogItem> = snapshot.val()

  if (!value) {
    return send(event, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 'application/xml')
  }

  const urls = Object.values(value)
    .map(item => `
    <url>
      <loc>https://moneyflowzen.ru/blog/${item.key}</loc>
      <lastmod>${new Date(item.updatedAt * 1000).toISOString()}</lastmod>
    </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return send(event, sitemap, 'application/xml')
})