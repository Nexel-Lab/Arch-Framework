import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string(),
})
export type TEmailInput = z.input<typeof emailSchema>

export const userProfileUpdateSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
})
export type TUserProfileUpdateInput = z.input<typeof userProfileUpdateSchema>
