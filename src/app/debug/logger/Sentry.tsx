'use client'

import { diagnoseSdkConnectivity, startSpan } from '@sentry/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

class SentryExampleFrontendError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

export function Sentry() {
  const [hasSentError, setHasSentError] = useState(false)
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    async function checkConnectivity() {
      const result = await diagnoseSdkConnectivity()
      setIsConnected(result !== 'sentry-unreachable')
    }
    checkConnectivity()
  }, [])

  useEffect(() => {
    if (hasSentError) {
      toast.success('[SENTRY] Error sent to Sentry')
    }
  }, [hasSentError])

  useEffect(() => {
    if (!isConnected) {
      toast.error(
        '[SENTRY] It looks like network requests to Sentry are being blocked, which will prevent errors from being captured. Try disabling your ad-blocker to complete the test.',
      )
    }
  }, [isConnected])

  return (
    <div className='relative space-y-2'>
      <h3 className='font-bold text-lg'>Sentry</h3>
      <button
        className='w-full rounded-md bg-pink-500/10 py-2 text-pink-500 duration-300 hover:bg-pink-500/20 hover:duration-200'
        disabled={!isConnected}
        onClick={async () => {
          await startSpan(
            {
              name: 'Example Frontend/Backend Span',
              op: 'test',
            },
            async () => {
              const res = await fetch('/api/debug/sentry')
              if (!res.ok) {
                setHasSentError(true)
              }
            },
          )
          throw new SentryExampleFrontendError(
            `[TEST] client/sentryExampleFrontendError: Throw error from Arch Framework`,
          )
        }}
        type='button'
      >
        <span>Throw Error Client/API</span>
      </button>
      <div className='flex space-x-2 *:underline *:opacity-60 *:hover:opacity-100'>
        <Link href='https://username.sentry.io/issues/?project=#'>
          Issues Page
        </Link>
        <Link href='https://docs.sentry.io/platforms/javascript/guides/nextjs/'>
          Docs
        </Link>
      </div>
    </div>
  )
}
