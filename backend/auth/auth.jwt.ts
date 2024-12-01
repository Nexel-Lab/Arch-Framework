/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
// import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@arch/core/database/prisma'
import { TIME } from '@arch/core/utils/time'
import { env } from '@env'
import { auroraSignIn } from './auth.jwt.signIn'

/** Next-Auth Configs here **/

const useSecureCookies = env.NODE_ENV === 'production'
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(env.NEXTAUTH_URL).hostname

export const authOptions: NextAuthOptions | { adapter: any } = {
  //   pages: {
  //     signIn: '/',
  //     signOut: '/',
  //     error: '/',
  //     newUser: '/',
  //   },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 2 * TIME.DAY, // 2 days
  },
  theme: {
    colorScheme: 'dark',
  },
  providers: [
    // GoogleProvider({
    //   clientId: env.AUTH_GOOGLE_CLIENT_ID,
    //   clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: env.AUTH_FB_APP_ID,
    //   clientSecret: env.AUTH_FB_APP_SECRET,
    // }),
    // GithubProvider({
    //   clientId: env.AUTH_GITHUB_CLIENT_ID,
    //   clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Email',
      id: 'aurora-login',
      type: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'E-mail' },
      },
      async authorize(credentials) {
        return auroraSignIn(credentials)
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

export const getSession = async () => await getServerSession(authOptions)
