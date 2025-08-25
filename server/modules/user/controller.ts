import { createTRPCRouter } from '@server/plugins/trpc'
import { userProfileRouter } from './profile'
import { userSessionRouter } from './session'

export const userRouter = createTRPCRouter({
  session: userSessionRouter,
  profile: userProfileRouter,
})
