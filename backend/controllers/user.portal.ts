import { createTRPCRouter, p } from '@backend/trpc'
import { SERVICES, SCHEMA } from '@backend/modules/user/portal'

export const userPortalRouter = createTRPCRouter({
  signin: p.publicProcedure.input(SCHEMA.signinSchema).mutation(SERVICES.signin),
  signup: p.publicProcedure.input(SCHEMA.signupSchema).mutation(SERVICES.signup),
})
