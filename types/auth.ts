import type { DefaultUser, Session as NextAuthSession } from 'next-auth'
import type { BuiltInProviderType } from 'next-auth/providers/index'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'

export type TSession = NextAuthSession
export type TProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>

export interface IUser extends DefaultUser {
  id: string
  email: string
  metadata: Record<string, unknown>
}
