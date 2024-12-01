import { createTRPCRouter, p } from '@backend/trpc'
import { SERVICES, SCHEMA } from '@backend/modules/user/session'

export const userSessionRouter = createTRPCRouter({
  isValidSession: p.publicProcedure.query(SERVICES.isValidSession),
})
