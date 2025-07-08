import { createTRPCRouter } from '@backend/trpc'
import { userPortalRouter } from './user.portal'
import { userProfileRouter } from './user.profile'
import { userSessionRouter } from './user.session'

export const userRouter = createTRPCRouter({
  portal: userPortalRouter,
  session: userSessionRouter,
  profile: userProfileRouter,
})
