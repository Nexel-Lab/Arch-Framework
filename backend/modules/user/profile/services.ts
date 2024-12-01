import type { usernameInput, updateUserProfileInput } from './schema'
import type { Context } from '@backend/trpc/trpc.context'
import { trpcResponse } from '@arch/core/utils/server/trpc'

export const getProfileByUsername = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: usernameInput
}) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })
  if (!user) return trpcResponse.fail('No username that requested')

  const { password, ...userProfile } = user
  return trpcResponse.success('Get user profile by username successfully', {
    data: userProfile,
  })
}

export const updateUserProfile = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: updateUserProfileInput
}) => {
  const existingUsername = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })

  const _id = ctx.session?.user.id

  if (existingUsername && existingUsername.id !== _id) {
    return trpcResponse.fail('This user already exists')
  }

  try {
    const user = await ctx.prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        metadata: {
          profile: {
            bio: input.bio,
            image: {
              avatar: {
                name: input.image.avatar.name,
                imageId: input.image.avatar.imageId,
                url: input.image.avatar.url,
              },
              cover: {
                name: input.image.cover.name,
                imageId: input.image.cover.imageId,
                url: input.image.cover.url,
              },
            },
          },
        },
      },
    })

    const { password, ...userProfileUpdate } = user
    return trpcResponse.success('Profile update completed', {
      data: userProfileUpdate,
    })
  } catch {
    throw new Error('Update user failed')
  }
}
