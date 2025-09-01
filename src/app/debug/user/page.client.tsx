'use client'

import trpc from '@trpc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ChangeEmailModal } from './ChangeEmailModal'

export const Client = ({ session }: { session: Session }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const { mutate: updateUserEmail } =
    trpc.user.profile.updateUserEmail.useMutation({
      onSuccess: async (data) => {
        if (!data.success) {
          toast.error(data.message, { toastId: 'UPDATE_ERROR' })
          return
        }
        if (data.success && data.email) {
          toast.success('Change email successfully', {
            toastId: 'UPDATE_SUCCESS',
          })
          setOpenModal(false)
          await signOut()
          return
        }
        toast.warn('Error occurred, please try again', {
          toastId: 'UNKNOWN_ERROR',
        })
        setOpenModal(false)
        return
      },
      onError: () => {
        toast.error('Error while updating', { toastId: 'UPDATE_ERROR' })
        setOpenModal(false)
        return
      },
    })

  const username = session.user.email

  const onSubmitEmail = (email: string) => {
    if (email === username) {
      toast.warn(`Same value: ${email}`, { toastId: 'SAME_VALUE' })
      setOpenModal(false)
      return
    }
    updateUserEmail({ email })
  }

  return (
    <>
      <div className='h-dvh w-dvw bg-primary p-6'>
        <div className='w-full rounded-2xl border-black/10 bg-white/20 p-6 shadow-xl'>
          <h2 className='font-bold text-white'>Email</h2>
          <p className='text-4xl'>{username}</p>
          <button
            className='mt-2 mt-6 flex w-full items-center justify-center gap-1 rounded-md border border-white p-2 text-white'
            onClick={() => setOpenModal(true)}
          >
            <p>change email</p>
          </button>
          <button
            className='mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-red-500 p-2 text-white'
            onClick={() => signOut().then(() => router.push('/'))}
          >
            <p>sign out</p>
          </button>
        </div>
        <div className='w-full pt-4 text-center text-sm underline'>
          <Link className='' href='/'>
            home
          </Link>
        </div>
      </div>
      {openModal && (
        <ChangeEmailModal
          onClose={() => setOpenModal(false)}
          onSubmitEmail={onSubmitEmail}
        />
      )}
    </>
  )
}
