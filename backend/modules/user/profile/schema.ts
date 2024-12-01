import { z } from 'zod'

export const usernameSchema = z.object({
  email: z.string(),
})
export type usernameInput = z.input<typeof usernameSchema>

export const updateUserProfileSchema = z.object({
  name: z.string(),
  email: z.string(),
  bio: z.string(),
  image: z.object({
    avatar: z.object({
      name: z.string(),
      imageId: z.string(),
      url: z.string(),
    }),
    cover: z.object({
      name: z.string(),
      imageId: z.string(),
      url: z.string(),
    }),
  }),
})
export type updateUserProfileInput = z.input<typeof updateUserProfileSchema>
