import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        layout: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  },
})
