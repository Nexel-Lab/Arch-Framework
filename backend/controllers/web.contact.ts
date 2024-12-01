import { createTRPCRouter, p } from '@backend/trpc'
import { SERVICES, SCHEMA } from '@backend/modules/web/contact'

export const webContactRouter = createTRPCRouter({
  dropEmail: p.publicProcedure
    .input(SCHEMA.dropEmailSchema)
    .mutation(SERVICES.dropEmail),
})
