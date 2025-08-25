import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { TRouter } from './trpc.controller'

export { trpcCaller } from './trpc.caller'
export { router } from './trpc.controller'

export type TInputs = inferRouterInputs<TRouter>
export type TOutputs = inferRouterOutputs<TRouter>
