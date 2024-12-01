import { createTRPCRouter, p } from '@backend/trpc'
import { SERVICES, SCHEMA } from '@backend/modules/user/profile'

export const userProfileRouter = createTRPCRouter({
  getProfileByUsername: p.publicProcedure
    .input(SCHEMA.usernameSchema)
    .query(SERVICES.getProfileByUsername),
  updateUserProfile: p.protectedProcedure
    .input(SCHEMA.updateUserProfileSchema)
    .mutation(SERVICES.updateUserProfile),
})
