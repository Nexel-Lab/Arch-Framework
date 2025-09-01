import type { TContext, TContextWithSession } from '@server/plugins/trpc'
import { TRPCError } from '@trpc/server'
import { hash } from 'bcryptjs'
import type { TEmailInput, TUserProfileUpdateInput } from './schema'

export const getProfileByEmail = async ({
  ctx,
  input,
}: {
  ctx: TContext
  input: TEmailInput
}) => {
  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        metadata: true,
      },
    })
    if (!user) {
      return new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    return {
      success: true,
      user: user,
    }
  } catch {
    return new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Get user failed',
    })
  }
}

export const userProfileUpdate = async ({
  ctx,
  input,
}: {
  ctx: TContextWithSession
  input: TUserProfileUpdateInput
}) => {
  try {
    let email = ctx.session.user.email
    let name = ctx.session.user.name

    if (ctx.session.user.email !== input.email) {
      const exitingUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      if (exitingUser) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email already exists',
        })
      }
      email = input.email
    }
    if (ctx.session.user.name !== input.name) {
      name = input.name
    }

    const password = input.password ? await hash(input.password, 10) : undefined

    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        name: name,
        email: email.toLowerCase(),
        ...(password && {
          password: password,
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        metadata: true,
      },
    })

    return {
      success: true,
      user: user,
    }
  } catch {
    return new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Update user failed',
    })
  }
}

export const userEmailUpdate = async ({
  ctx,
  input,
}: {
  ctx: TContextWithSession
  input: TEmailInput
}) => {
  const exitingUser = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })

  if (exitingUser) {
    return new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Email already exists',
    })
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
