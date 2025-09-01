import { createTRPCRouter, p } from '@server/plugins/trpc'
import {
  emailSchema,
  userProfileUpdateSchema,
} from './schema'
import {
  getProfileByEmail,
  userEmailUpdate,
  userProfileUpdate,
} from './services'

export const userProfileRouter = createTRPCRouter({
  getProfileByEmail: p.publicProcedure
    .input(emailSchema)
    .query(getProfileByEmail),
  userProfileUpdate: p.protectedProcedure
    .input(userProfileUpdateSchema)
    .mutation(userProfileUpdate),
  userEmailUpdate: p.protectedProcedure
    .input(emailSchema)
    .mutation(userEmailUpdate),
})
