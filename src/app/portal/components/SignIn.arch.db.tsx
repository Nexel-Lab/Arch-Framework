'use client'

import { trpc } from '@trpc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from '#core/hooks/events'
import { cn } from '#core/utils'

export const SignInArch = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const { mutateAsync: signIn } = trpc.portal.signin.useMutation({
    onSuccess(data) {
      if (data && !data.success && data.message) {
        toast.error(`Error: ${data.message}`)
        setIsLoading(false)
        return
      }
      toast.success('Sign in complete')
      router.refresh()
      // router.push('/dashboard')
    },
    onError: () => {
      toast.error(`Error: Connection failed`)
      setIsLoading(false)
      return
    },
  })

  const { handleChange, handleSubmit } = useForm({
    initialData: {
      email: '',
      password: '',
    },
    onSubmit: async (f) => {
      setIsLoading(true)
      f.email &&
        f.password &&
        (await signIn({
          email: f.email,
          password: f.password,
          rememberMe,
        }))
    },
    onError: () => {
      toast.error("Error: Can't set session")
      setIsLoading(false)
      throw new Error('AUTH: Set session failed')
    },
  })

  return (
    <>
      <div
        className={cn(
          'relative ml-2 h-full p-8',
          isLoading && 'pointer-events-none',
        )}
      >
        <h3 className='font-semibold text-2xl uppercase'>Sign in</h3>
        <form
          className={cn(
            'form-default flex flex-col pt-6 [&>input]:mb-2 [&>input]:rounded-md',
            isLoading && 'pointer-events-none opacity-30',
          )}
          onSubmit={handleSubmit}
        >
          <input
            name='email'
            onChange={handleChange}
            placeholder='Email'
            required={true}
            type='email'
          />
          <input
            name='password'
            onChange={handleChange}
            placeholder='Password'
            required={true}
            type='password'
          />
          <button
            className='anim-config anim-opacity-60 mt-4 rounded-md bg-foreground/20 py-1'
            type='submit'
          >
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>
          <div className='my-3'>
            <input
              checked={rememberMe}
              className='form-checkbox mr-2'
              onChange={() => setRememberMe(!rememberMe)}
              title='remember me'
              type='checkbox'
            />
            <label className='flex' htmlFor='remember me'>
              <p className='-ml-1 -mt-px text-xs'>Remember me</p>
            </label>
          </div>
        </form>
        <div className='my-4 flex w-full justify-center'>
          <div className='my-auto h-px w-12 bg-white/30' />
          <p className='px-3 text-xs'>or Continue with</p>
          <div className='my-auto h-px w-12 bg-white/30' />
        </div>
        {children}
      </div>
      <Link
        className={cn(isLoading && 'pointer-events-none')}
        href='/portal/signup'
      >
        <p className='anim-config anim-opacity-40 mr-2 cursor-pointer pb-4 text-center text-xs md:mt-1 md:pb-0 md:text-right'>
          Not have an Account?
        </p>
      </Link>
    </>
  )
}
