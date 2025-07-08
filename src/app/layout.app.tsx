/** biome-ignore-all lint/correctness/useHookAtTopLevel: <for performance purposes> */
'use client'

import { trpc } from '@backend/trpc/client'
import { redirect, usePathname } from 'next/navigation'
import type { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { Loading } from './loading'

type AppPropsWithSlot = {
  children: React.ReactNode
  session: Session | null
}

export const App = ({ children, session }: AppPropsWithSlot) => {
  const pathname = usePathname()
  if (
    pathname.includes('/welcome') ||
    pathname.includes('/sso') ||
    pathname.includes('/debug')
  ) {
    return children
  }

  const [isLoading, setIsLoading] = useState(true)
  const [haveSession, setHaveSession] = useState(false)

  const { mutate } = trpc.user.session.isValidSession.useMutation({
    onSuccess: (data) => {
      if (session && data && data.isSession) {
        setIsLoading(false)
        setHaveSession(true)
      } else {
        setIsLoading(false)
        setHaveSession(false)
      }
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  if (isLoading) return <Loading />
  if (!haveSession) {
    redirect('/welcome')
  }

  return children
}
