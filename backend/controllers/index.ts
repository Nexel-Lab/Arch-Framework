import { createTRPCRouter } from '../trpc'
import { contactRouter } from './contact'
import { debuggerRouter } from './debugger'
import { userRouter } from './user'

/** Define your tRPC routes here */

export const router = createTRPCRouter({
  debugger: debuggerRouter,
  user: userRouter,
  contact: contactRouter,
})

export type Router = typeof router
