/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa6'
import type { TProviders, TSession } from 'types/auth'

export const SignInProviders = ({
  session,
  providers,
}: {
  session: TSession | null
  providers: TProviders | null
}) => {
  const router = useRouter()

  useEffect(() => {
    session && router.push('/')
  }, [session, router])

  return (
    <>
      {providers && (
        <div className='flex h-8 justify-center'>
          <button
            className='cursor-pointer rounded-full bg-blue-500 px-2 py-1 text-white'
            onClick={() => signIn(providers.facebook.id)}
            title='Sign in with Facebook'
          >
            <FaFacebookF className='w-4' size='xs' />
          </button>
          <button
            className='ml-3 cursor-pointer rounded-full bg-red-500 px-2 py-1 text-white'
            onClick={() => signIn(providers.google.id)}
            title='Sign in with Google'
          >
            <FaGoogle className='w-4' size='xs' />
          </button>
          <button
            className='ml-3 cursor-pointer rounded-full bg-slate-800 px-2 py-1 text-white'
            onClick={() => signIn(providers.github.id)}
            title='Sign in with GitHub'
          >
            <FaGithub className='w-4' size='xs' />
          </button>
        </div>
      )}
    </>
  )
}
