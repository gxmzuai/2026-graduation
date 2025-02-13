import { defineCollection, z } from 'astro:content';

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    images: z.array(z.object({
      url: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.string()
    }))
  })
});

export const collections = {
  'gallery': galleryCollection
};
