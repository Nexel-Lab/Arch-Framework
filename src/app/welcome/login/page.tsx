'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from '@/store'

type FormData = {
  email: string
  password: string
}

const Page = () => {
  const router = useRouter()
  const setUser = useUserStore((st) => st.setUser)

  const [loading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      setUser({
        ...formData,
      })
      await signIn('app-login', {
        email: formData.email.toLowerCase(),
        password: formData.password,
      })
      router.push('/')
    } catch (_e) {
      setIsLoading(false)
      toast.error('Error: Failed to register', {
        toastId: 'register-error',
      })
    }
  }

  return (
    <div className='flex h-dvh w-dvw items-center justify-center'>
      <form
        className={clsx(
          'flex w-full flex-col items-center justify-between px-2 text-center md:text-2xl',
          loading && 'pointer-events-none opacity-20',
        )}
        onSubmit={handleSubmit}
      >
        <div className='w-full space-y-2'>
          <p>Email</p>
          <input
            className='w-2/3 max-w-xl rounded-lg bg-white px-3 py-1 text-primary'
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.toLocaleLowerCase(),
              })
            }
            required
            title='email'
            type='email'
            value={formData.email}
          />
          <p>Password</p>
          <input
            className='w-2/3 max-w-xl rounded-lg bg-white px-3 py-1 text-primary'
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
            title='password'
            type='password'
            value={formData.password}
          />
        </div>
        <button
          className='mt-4 rounded-xl bg-primary px-3 py-1 text-white md:px-20 md:py-3 md:text-xl'
          title='submit'
          type='submit'
        >
          {loading ? 'loading..' : 'submit'}
        </button>
      </form>
    </div>
  )
}

export default Page
