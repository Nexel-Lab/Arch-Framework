import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
      plane: 'FREE' | 'PLUS' | 'PRO' | 'ELITE'
      metadata: any
    } & DefaultSession['user']
  }
}

// ** Use --JWT
// export { authOptions, getSession } from './aurora.jwt'
// ** Use --ServerSession
export { authOptions, getSession } from './auth.server'
