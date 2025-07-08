'use client'

import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/templates'
import { useUserState } from '@/store'

export const Client = ({
  email,
  session,
}: {
  email: string
  session: Session | null
}) => {
  const [loading, setLoading] = useState(true)
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined)
  const router = useRouter()
  const setUser = useUserState((st) => st.setUser)

  useEffect(() => {
    if (session) {
      signOut().then(() => {
        signIn('app-login', {
          email: email.toLowerCase(),
        })
          .then(() => {
            setUser({
              email: email.toLowerCase(),
            })
            router.push('/')
          })
          .catch(() => {
            setLoading(false)
            setErrMsg('Error occurred while logging in')
          })
      })
      return
    }
    signIn('app-login', {
      email: email.toLowerCase(),
    })
      .then(() => {
        setUser({
          email: email.toLowerCase(),
        })
        router.push('/')
      })
      .catch(() => {
        setLoading(false)
        setErrMsg('Error occurred while logging in')
      })
  }, [email, router.push, setUser, session])

  if (loading) {
    return <Loading />
  }

  if (errMsg) {
    return <p>{`Error: ${errMsg}`}</p>
  }

  return <p>Error occurred while logging in</p>
}
