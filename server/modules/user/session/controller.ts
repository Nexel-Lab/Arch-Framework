import { createTRPCRouter, p } from '@server/plugins/trpc'
import { isValidSession } from './services'

export const userSessionRouter = createTRPCRouter({
  isValidSession: p.publicProcedure.mutation(isValidSession),
})
