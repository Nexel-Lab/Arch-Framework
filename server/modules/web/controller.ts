import { createTRPCRouter } from '@server/plugins/trpc'
import { webContactRouter } from './contact'

export const webRouter = createTRPCRouter({
  contact: webContactRouter,
})
