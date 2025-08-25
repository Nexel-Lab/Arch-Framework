import { createTRPCRouter, p } from '@server/plugins/trpc'
import { z } from 'zod'

export const debuggerRouter = createTRPCRouter({
  testQuery: p.publicProcedure
    .input(z.object({ text: z.string() }))
    .query(() => {
      return {
        success: true,
        message: `Client query is working`,
      }
    }),
  testMutation: p.publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      return {
        success: true,
        message: `Input is ${input.text}`,
      }
    }),
  session: p.protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  }),
  server: p.publicProcedure.input(z.object({ text: z.string() })).query(() => {
    return {
      success: true,
    }
  }),
})
