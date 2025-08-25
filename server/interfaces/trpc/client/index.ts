import { createTRPCReact } from '@trpc/react-query'
import type { TRouter } from '../trpc.controller'

export const trpc = createTRPCReact<TRouter>({})
export default trpc
