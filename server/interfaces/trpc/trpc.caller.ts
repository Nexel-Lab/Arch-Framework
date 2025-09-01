import { getSession } from '@server/plugins/auth'
import { t } from '@server/plugins/trpc/trpc.init'
import type { TSession } from 'types/auth'
import { prisma } from '#core/database/prisma'
// import { s3 } from '#core/storage'
import { router } from './trpc.controller'

const trpcCaller = async (req: Request, res: Response) => {
  const session = (await getSession()) as TSession | null
  const createCaller = t.createCallerFactory(router)
  const caller = createCaller({
    req: req,
    resHeaders: res.headers,
    session,
    prisma,
    // s3,
  })
  return caller
}

export { trpcCaller }
