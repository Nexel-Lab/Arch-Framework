'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa6'
import type { Providers, Session } from 'types'

const SignInProviders = ({
  providers,
  session,
}: {
  providers: Providers | null
  session: Session | null
}) => {
  const router = useRouter()

  useEffect(() => {
    session && router.push('/app/dashboard')
  }, [session, router])

  return (
    <div className='my-8 flex flex-col justify-center space-y-2'>
      <div className='mb-2 flex w-full justify-center'>
        <div className=' my-auto h-px w-12 bg-black/30 dark:bg-white/30' />
        <p className='px-3 text-xs'>or Continue with</p>
        <div className=' my-auto h-px w-12 bg-black/30 dark:bg-white/30' />
      </div>
      {providers?.google && (
        <button
          aria-label='Sign in with Google'
          className='Anim flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md bg-red-500/80 px-2 py-1 text-white dark:bg-white/20 dark:hover:bg-red-500'
          onClick={() => signIn(providers.google.id)}
          type='button'
        >
          <FaGoogle className='w-4' size='xs' />
          <p>Sign in with Google</p>
        </button>
      )}
      {providers?.facebook && (
        <button
          aria-label='Sign in with Facebook'
          className='Anim flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md bg-blue-500/80 px-2 py-1 text-white dark:bg-white/20 dark:hover:bg-blue-500'
          onClick={() => signIn(providers.facebook.id)}
          type='button'
        >
          <FaFacebookF className='w-2.5' size='xs' />
          <p>Sign in with Facebook</p>
        </button>
      )}
      {providers?.github && (
        <button
          aria-label='Sign in with Github'
          className='Anim flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md bg-gray-800/80 px-2 py-1 text-white dark:bg-white/20 dark:hover:bg-gray-800'
          onClick={() => signIn(providers.github.id)}
          type='button'
        >
          <FaGithub className='w-2.5' size='xs' />
          <p>Sign in with Github</p>
        </button>
      )}
    </div>
  )
}

export { SignInProviders }
