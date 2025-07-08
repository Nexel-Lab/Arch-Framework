'use client'

import { trpc } from '@backend/trpc/client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast as t } from 'react-toastify'
import { validateEmail, validatePassword } from '#core/utils/validator'
import type { TForm } from '../functions'
import { formHandler } from '../functions'

const SignUpEmail = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync } = trpc.user.portal.signup.useMutation({
    onSuccess(data) {
      if (data && !data.success && data.message) {
        t.error(`Error: ${data.message}`)
        setIsLoading(false)
        return
      }
      t.success('Sign up successfully, please login')
      // router.refresh()
      router.push('/portal')
    },
    onError: () => {
      t.error('Error: Connection failed')
      setIsLoading(false)
      return
    },
  })

  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)

  const { handleChange, executeForm } = formHandler({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) =>
    executeForm(e, async (f: TForm) => {
      setIsLoading(true)
      try {
        if (!validateEmail(f.email).isValid) {
          t.warn('Please enter a valid E-mail')
          setIsLoading(false)
          return
        }

        if (f.password !== confirmPassword) {
          t.warn('Passwords need to match!')
          setIsLoading(false)
          return
        }

        const passwordValidated = validatePassword(f.password)

        if (!passwordValidated.isValid) {
          t.warn(passwordValidated.error)
          setIsLoading(false)
          return
        }

        await mutateAsync(f)
      } catch (_e) {
        setIsLoading(false)
        t.error("Error: Can't sign up")
        throw new Error('AUTH: Sign up failed')
      }
    })

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className='relative'
      exit={{ opacity: 0, x: 50 }}
      initial={{ opacity: 0, x: 50 }}
    >
      <h6 className='font-semibold uppercase'>Register</h6>
      <form className='flex flex-col space-y-2 pt-4' onSubmit={handleSubmit}>
        <label className={clsx('flex flex-col', isLoading && 'opacity-40')}>
          <input
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
            className={clsx(
              'rounded-sm bg-black/5 px-2 py-1 dark:bg-white/10',
              isLoading && 'opacity-40',
            )}
            disabled={isLoading}
            name='email'
            onChange={handleChange}
            placeholder='E-mail'
            required={true}
            type='email'
          />
        </label>
        <label className={clsx('flex flex-col', isLoading && 'opacity-40')}>
          <input
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
            className={clsx(
              'rounded-sm bg-black/5 px-2 py-1 dark:bg-white/10',
              isLoading && 'opacity-40',
            )}
            disabled={isLoading}
            name='password'
            onChange={handleChange}
            placeholder='Password'
            required={true}
            type='password'
          />
        </label>
        <label className={clsx('flex flex-col', isLoading && 'opacity-40')}>
          <input
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
            className={clsx(
              'rounded-sm bg-black/5 px-2 py-1 dark:bg-white/10',
              isLoading && 'opacity-40',
            )}
            disabled={isLoading}
            name='confirm_password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            placeholder='Confirm Password'
            required={true}
            type='password'
          />
        </label>
        <button
          className={clsx(
            'Anim AnimOpacity-60 mt-5 rounded-md bg-white/60 py-1 hover:bg-white/100 dark:bg-slate-800/80 dark:hover:bg-slate-600/100',
            isLoading && 'opacity-40',
          )}
          disabled={isLoading}
          type='submit'
        >
          Register
        </button>
      </form>
    </motion.div>
  )
}

export { SignUpEmail }
