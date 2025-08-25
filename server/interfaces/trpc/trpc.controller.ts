import { debuggerRouter } from '@server/modules/debugger'
import { portalRouter } from '@server/modules/portal'
import { userRouter } from '@server/modules/user'
import { webRouter } from '@server/modules/web'
import { createTRPCRouter } from '@server/plugins/trpc'

export const router = createTRPCRouter({
  user: userRouter,
  portal: portalRouter,
  debugger: debuggerRouter,
  web: webRouter,
})

export const AppController = { router }
export type TRouter = typeof router
