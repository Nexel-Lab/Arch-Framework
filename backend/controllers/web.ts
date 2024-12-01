import { createTRPCRouter } from '../trpc'
import { webContactRouter } from './web.contact'

export const webRouter = createTRPCRouter({
  contact: webContactRouter,
})
