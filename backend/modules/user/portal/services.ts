import type { Context } from '@backend/trpc/trpc.context'
import { compare, hash } from 'bcryptjs'
import { serialize } from 'cookie'
import { uuidv7 } from 'uuidv7'
import { getErrorMessage } from '#core/utils/server/error'
import { trpcResponse } from '#core/utils/server/trpc'
import type { signinInput, signupInput } from './schema'

export const signin = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: signinInput
}) => {
  try {
    const reqCredential = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })
    if (!reqCredential) return trpcResponse.fail('No credential that requested')

    if (
      reqCredential.password &&
      !(await compare(input.password, reqCredential.password))
    ) {
      return trpcResponse.fail('Password not matched')
    }

    const sessionToken = uuidv7()
    const sessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    const session = await ctx.prisma.session.create({
      data: {
        sessionToken: sessionToken,
        userId: reqCredential.id,
        expires: sessionExpiry,
      },
    })
    if (!session) return trpcResponse.fail('Create session failed')

    const useSecureCookies = process.env.NODE_ENV === 'production'
    const cookiePrefix = useSecureCookies ? '__Secure-' : ''

    ctx.resHeaders.append(
      'Set-Cookie',
      serialize(`${cookiePrefix}next-auth.session-token`, sessionToken, {
        httpOnly: true,
        secure: useSecureCookies,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      }),
    )

    return trpcResponse.success('Login complete', {
      data: reqCredential,
      metadata: { session: { token: sessionToken } },
    })
  } catch (e) {
    const message = getErrorMessage(e)
    throw new Error(message)
  }
}

export const signup = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: signupInput
}) => {
  try {
    const existingEmail = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    })
    if (existingEmail) return trpcResponse.fail('This email was signup')

    const hashedPassword = await hash(input.password, 10)

    const user = await ctx.prisma.user.create({
      data: {
        name: input.email.split('@')[0],
        email: input.email,
        image: '/user/default/profile.png',
        password: hashedPassword,
      },
    })
    if (!user) return trpcResponse.fail('Create user data failed')

    return trpcResponse.success('Signup complete', { data: user })
  } catch (e) {
    const message = getErrorMessage(e)
    throw new Error(message)
  }
}
