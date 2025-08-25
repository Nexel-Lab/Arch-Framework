import { createTRPCRouter, p } from '@server/plugins/trpc'
import { exampleSchema } from './schema'
import { example } from './services'

export const exampleRouter = createTRPCRouter({
  example: p.publicProcedure.input(exampleSchema).mutation(example),
})
