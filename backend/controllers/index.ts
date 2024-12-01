import { createTRPCRouter } from '../trpc'
import { debuggerRouter } from './debugger'
import { userRouter } from './user'
import { contactRouter } from './contact'

/** Define your tRPC routes here */

export const router = createTRPCRouter({
  debugger: debuggerRouter,
  user: userRouter,
  contact: contactRouter,
})

export type Router = typeof router
