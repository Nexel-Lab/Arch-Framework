export type { Session } from 'next-auth'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers/index'

export type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>
