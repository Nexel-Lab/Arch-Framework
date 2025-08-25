'use client'

import { trpc } from '@trpc'
import type { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Client(p: { session: Session | null }) {
  const clientQuery = trpc.debugger.testQuery.useQuery({ text: 'ARCH' })
  const clientMutation = trpc.debugger.testMutation.useMutation({
    onSuccess: (data) => {
      if (data?.success && data.message) {
        toast.success(`Success: ${data.message}`)
        return
      }
      toast.warn('No data recieved')
    },
    onError: () => {
      toast.error('Error occurred during mutation')
    },
  })
  const { data: secretMessage } = trpc.debugger.session.useQuery(
    undefined, // no input
    { enabled: p.session?.user !== undefined },
  )
  const [trpcServerData, setTrpcServerData] = useState<string | null>(null)

  useEffect(() => {
    const testTrpcServer = () => {
      fetch('/api/debug/trpc')
        .then((res) => {
          console.log({ res })
          setTrpcServerData('Server caller is working')
        })
        .catch((_e) => setTrpcServerData('Failed to fetch api'))
    }
    if (!trpcServerData) {
      testTrpcServer()
    }
  }, [trpcServerData])

  const onTestMutation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clientMutation.mutate({ text: e.currentTarget.text.value })
  }

  return (
    <>
      <h6 className='mb-2 text-xl'>Client:</h6>
      <div className='w-full space-y-1 rounded-md bg-foreground/5 p-4 text-center'>
        {clientQuery.isLoading ? (
          <p>Loading..</p>
        ) : clientQuery.data ? (
          <p>
            Client query is{' '}
            <span className='bg-green-500/10 px-2 text-green-500'>working</span>
          </p>
        ) : (
          <p>
            Client query{' '}
            <span className='bg-red-500/10 px-2 text-red-500'>not working</span>
          </p>
        )}

        <form onSubmit={onTestMutation}>
          <input
            className='rounded-md bg-foreground/5 px-2 py-1 text-center'
            name='text'
            placeholder='Test mutation'
            type='text'
          />
        </form>
        {secretMessage ? <p>{secretMessage}</p> : <p>No session</p>}
      </div>
      <h6 className='mt-6 mb-2 text-xl'>Server:</h6>
      <div className='w-full space-y-1 rounded-md bg-foreground/5 p-4 text-center'>
        <p>
          {trpcServerData ? (
            <p>
              Server caller is{' '}
              <span className='bg-green-500/10 px-2 text-green-500'>
                working
              </span>
            </p>
          ) : (
            'Loading..'
          )}
        </p>
      </div>
    </>
  )
}

export { Client }
