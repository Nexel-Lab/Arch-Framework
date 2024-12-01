'use client'

import type { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { trpc } from '@backend/trpc/client'
// import LoginPage from './(root)/login/page'
import LandingPage from './(root)/page'

type AppPropsWithSlot = {
  children: React.ReactNode
  session: Session | null
  app: React.ReactNode
}

export const App = ({ children, session, app }: AppPropsWithSlot) => {
  const pathname = usePathname()
  if (
    pathname.includes('/about') ||
    pathname.includes('/debug') ||
    pathname.includes('/share')
  ) {
    return children
  }

  const { data } = trpc.user.session.isValidSession.useQuery()
  if (session && data && data.isSession) {
    return app
  }

  return (
    <>
      <LandingPage />
    </>
  )
}
