import { dropEmail, dropEmailSchema } from '@backend/modules/web/contact'
import { createTRPCRouter, p } from '@backend/trpc'

export const webContactRouter = createTRPCRouter({
  dropEmail: p.publicProcedure.input(dropEmailSchema).mutation(dropEmail),
})
