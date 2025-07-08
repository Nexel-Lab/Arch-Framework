import {
  getProfileByUsername,
  updateUserEmail,
  updateUserEmailSchema,
  updateUserProfile,
  updateUserProfileSchema,
  usernameSchema,
} from '@backend/modules/user/profile'
import { createTRPCRouter, p } from '@backend/trpc'

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
