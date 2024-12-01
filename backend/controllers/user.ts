import { createTRPCRouter } from '@backend/trpc'
import { userPortalRouter } from './user.portal'
import { userSessionRouter } from './user.session'
import { userProfileRouter } from './user.profile'

export const userRouter = createTRPCRouter({
  portal: userPortalRouter,
  session: userSessionRouter,
  profile: userProfileRouter,
})
