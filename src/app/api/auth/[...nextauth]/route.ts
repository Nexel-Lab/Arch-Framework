import { authOptions } from '@server/plugins/auth'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'

const handler = NextAuth(authOptions as NextAuthOptions & { adapter: Adapter })
export { handler as GET, handler as POST }
