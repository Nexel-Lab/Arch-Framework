import type { Context } from '@backend/trpc/trpc.context'
import { trpcResponse } from '#core/utils/server/trpc'
import type {
  updateUserEmailInput,
  updateUserProfileInput,
  usernameInput,
} from './schema'

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

  const { password: _password, ...userProfile } = user
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

    const { password: _password, ...userProfileUpdate } = user
    return trpcResponse.success('Profile update completed', {
      data: userProfileUpdate,
    })
  } catch {
    throw new Error('Update user failed')
  }
}

export const updateUserEmail = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: updateUserEmailInput
}) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.email) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: ctx.session.user.email,
    },
  })
  if (!user) {
    return {
      success: false,
      message: 'User not found',
    }
  }

  const exitingUser = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })

  if (exitingUser) {
    return {
      success: false,
      message: 'มีเบอร์โทรศัพท์นี้อยู่ในระบบแล้ว กรุณาแจ้งเจ้าหน้าที่',
    }
  }

  const newUser = await ctx.prisma.user.update({
    where: {
      email: ctx.session.user.email,
    },
    data: {
      email: input.email,
    },
  })
  const { email } = newUser

  return {
    success: true,
    email,
  }
}
