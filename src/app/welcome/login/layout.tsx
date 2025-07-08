'use client'

import { trpc } from '@backend/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [haveSession, setHaveSession] = useState(false)
  const router = useRouter()

  const { mutate } = trpc.user.session.isValidSession.useMutation({
    onSuccess: (data) => {
      if (data?.isSession) {
        setHaveSession(true)
      }
    },
  })

  useEffect(() => {
    if (haveSession) {
      router.push('/')
    }
  }, [haveSession, router])

  useEffect(() => {
    mutate()
  }, [mutate])
  return <>{children}</>
}
