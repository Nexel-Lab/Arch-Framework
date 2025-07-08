// TODO: (Optional 2.2) Add S3 to trpc caller

import { getSession } from '../auth'
import { router } from '../controllers'
import { t } from '../trpc/trpc.init'
import { prisma } from '#core/database'
// import { s3 } from '#core/storage'

const trpcCaller = async (req: Request, res: Response) => {
  const session = await getSession()
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
