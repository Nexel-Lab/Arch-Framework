import { z } from 'zod'

export const setValidSessionSchema = z.object({
  userId: z.string(),
})

export type setValidSessionSchemaInput = z.input<typeof setValidSessionSchema>
