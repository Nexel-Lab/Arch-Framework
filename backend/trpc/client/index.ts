import type { Router } from '../../controllers'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<Router>({})
export default trpc
