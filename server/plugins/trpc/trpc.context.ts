// TODO: (Optional 2.1) Add S3 to trpc context

// import { s3 } from '#core/storage'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import type { Session } from 'next-auth'
import type { TSession } from 'types/auth'
import { prisma } from '#core/database'
import { getSession } from '../auth'

type CreateContextOptions = {
  session: Session | null
} & FetchCreateContextFnOptions

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    resHeaders: opts.resHeaders,
    session: opts.session,
    prisma,
    // s3,
  }
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getSession()

  return createInnerTRPCContext({
    ...opts,
    session,
  })
}

export type TContext = AsyncReturnType<typeof createTRPCContext>
export type TContextWithSession = Omit<
  AsyncReturnType<typeof createTRPCContext>,
  'session'
> & {
  session: TSession
}
