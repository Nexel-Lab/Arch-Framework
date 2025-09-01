import { createTRPCRouter, p } from '@server/plugins/trpc'
import { signinSchema, signupSchema } from './schema'
import { signin, signup } from './services'

export const portalRouter = createTRPCRouter({
  signin: p.publicProcedure.input(signinSchema).mutation(signin),
  signup: p.publicProcedure.input(signupSchema).mutation(signup),
})
