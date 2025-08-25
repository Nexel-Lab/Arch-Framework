/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { trpc } from '@trpc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from '#core/hooks/events'
import { cn } from '#core/utils'
import { validateEmail, validatePassword } from '#core/utils/validator'

export const SignUpArch = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  // const log = clientLog()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mutateAsync } = trpc.portal.signup.useMutation({
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess(data) {
      if (data && !data.success && data.message) {
        toast.error(`Error: ${data.message}`)
        setIsLoading(false)
        return
      }
      toast.success('Sign up successfully, please login')
      router.refresh()
      // router.push('/dashboard')
    },
    onError: () => {
      setIsLoading(false)
      toast.error(`Error: Connection failed`)
      return
    },
  })

  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const { handleChange, handleSubmit } = useForm({
    initialData: {
      email: '',
      password: '',
    },
    onSubmit: async (f) => {
      setIsLoading(true)
      if (!validateEmail(f.email).isValid) {
        toast.warn('Please enter a valid E-mail')
        return
      }
      if (f.password !== confirmPassword) {
        toast.warn('Passwords need to match!')
        return
      }
      const passwordValidated = validatePassword(f.password)
      if (!passwordValidated.isValid) {
        toast.warn(passwordValidated.error)
        return
      }
      await mutateAsync({ email: f.email, password: f.password })
    },
    onError: () => {
      toast.error("Error: Can't sign up")
      setIsLoading(false)
      throw new Error('AUTH: Sign up failed')
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
        <h3 className='font-semibold text-3xl uppercase'>Sign up</h3>
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
            type='text'
          />
          <input
            name='password'
            onChange={handleChange}
            placeholder='Password'
            required={true}
            type='password'
          />

          <input
            name='confirm_password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            placeholder='Confirm Password'
            required={true}
            type='password'
          />
          <button
            className='anim-config anim-opacity-60 mt-4 rounded-md bg-foreground/20 py-1'
            type='submit'
          >
            {isLoading ? 'Loading...' : 'Sign up'}
          </button>
        </form>
        <div className='my-4 flex w-full justify-center'>
          <div className='my-auto h-px w-12 bg-white/30' />
          <p className='px-3 text-xs'>or Continue with</p>
          <div className='my-auto h-px w-12 bg-white/30' />
        </div>
        {children}
      </div>
      <Link className={cn(isLoading && 'pointer-events-none')} href='/portal'>
        <p className='mr-2 cursor-pointer pb-4 text-center text-xs md:mt-1 md:pb-0 md:text-right'>
          <span className='mr-1 opacity-40'>Have an Account?</span>
          <span className='anim-config anim-opacity-60 font-bold uppercase'>
            Sign In
          </span>
        </p>
      </Link>
    </>
  )
}
