import { createTRPCRouter, p } from '@server/plugins/trpc'
import { dropEmailSchema } from './schema'
import { dropEmail } from './services'

export const webContactRouter = createTRPCRouter({
  dropEmail: p.publicProcedure.input(dropEmailSchema).mutation(dropEmail),
})
