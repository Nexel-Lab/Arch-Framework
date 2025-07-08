import { router } from '@backend/controllers'
import { createTRPCContext } from '@backend/trpc/trpc.context'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (request: Request) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`incoming request ${request.url}`)
  }
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    // res: response,
    router,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            )
          }
        : undefined,
  })
}

export { handler as GET, handler as POST }
