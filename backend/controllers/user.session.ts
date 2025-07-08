import { isValidSession } from '@backend/modules/user/session'
import { createTRPCRouter, p } from '@backend/trpc'

export const userSessionRouter = createTRPCRouter({
  isValidSession: p.publicProcedure.mutation(isValidSession),
})
