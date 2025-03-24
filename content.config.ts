import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection(
      // adds the robots frontmatter key to the collection
      asSitemapCollection({
        type: 'page',
        source: '**/*.md',
      }),
    ),
  },
})
