import { dropEmail, dropEmailSchema } from '@backend/modules/web/contact'
import { createTRPCRouter, p } from '@backend/trpc'

export const contactRouter = createTRPCRouter({
  dropEmail: p.publicProcedure.input(dropEmailSchema).mutation(dropEmail),
})
