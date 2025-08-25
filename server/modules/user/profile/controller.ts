import { createTRPCRouter, p } from '@server/plugins/trpc'
import {
  updateUserEmailSchema,
  updateUserProfileSchema,
  usernameSchema,
} from './schema'
import {
  getProfileByUsername,
  updateUserEmail,
  updateUserProfile,
} from './services'

export const userProfileRouter = createTRPCRouter({
  getProfileByUsername: p.publicProcedure
    .input(usernameSchema)
    .query(getProfileByUsername),
  updateUserProfile: p.protectedProcedure
    .input(updateUserProfileSchema)
    .mutation(updateUserProfile),
  updateUserEmail: p.protectedProcedure
    .input(updateUserEmailSchema)
    .mutation(updateUserEmail),
})
