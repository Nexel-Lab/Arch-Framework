'use client'

import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

export const Client = ({ session }: { session: Session | null }) => {
  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center bg-background'>
      <div className='rounded-md border border-foreground/10 bg-foreground/5 p-4'>
        <p>
          UserId:{' '}
          <span className='rounded-sm bg-foreground/10 p-1 text-xs'>
            {session?.user.email}
          </span>
        </p>
        <button
          className='mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-red-500 bg-red-500/20 p-1 text-white duration-300 hover:bg-red-500/30'
          onClick={() => signOut()}
        >
          <p>sign out</p>
        </button>
      </div>
    </div>
  )
}
