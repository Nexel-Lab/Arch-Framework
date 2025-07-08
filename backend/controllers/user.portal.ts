import {
  signin,
  signinSchema,
  signup,
  signupSchema,
} from '@backend/modules/user/portal'
import { createTRPCRouter, p } from '@backend/trpc'

export const userPortalRouter = createTRPCRouter({
  signin: p.publicProcedure.input(signinSchema).mutation(signin),
  signup: p.publicProcedure.input(signupSchema).mutation(signup),
})
