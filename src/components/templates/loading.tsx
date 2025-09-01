'use client'

import { AnimatePresence, animate, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Loading = ({
  duration = 7,
  description = 'Loading your experience',
}: {
  duration?: number
  description?: string
}) => {
  const [progress, setProgress] = useState('0')
  const [_isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate(value: number) {
        setProgress(value.toFixed(0))
      },
    })
    return () => controls.stop()
  }, [duration])

  setTimeout(() => setIsLoaded(true), duration * 100)

  return (
    <div className='relative flex h-dvh w-dvw flex-col items-center justify-center bg-background'>
      <div className='relative w-80'>
        <Image alt='Logo' height={210} src='/logo.svg' width={538.8} />
        {/* <h1 className='mt-6 font-bold text-white'>Loading</h1> */}
        <ProgressBlock
          description={description}
          duration={duration}
          progress={progress}
        />
      </div>
    </div>
  )
}

const ProgressBlock = ({
  progress,
  description,
  duration,
}: {
  progress: string
  description: string
  duration: number
}) => (
  <>
    <AnimatePresence>
      <motion.div
        animate={{ scale: 1 }}
        className='w-full'
        exit={{ scale: 0 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.1 }}
      >
        <h6 className='mt-6 w-full text-center font-semibold text-2xl'>
          {progress}%
        </h6>
        <div className='mt-5 mb-3 h-[10px] w-full rounded-md border border-foreground/30 bg-foreground/10 p-0.5'>
          <motion.div
            animate={{ width: '100%' }}
            className='h-full rounded-md bg-primary'
            initial={{ width: 0 }}
            transition={{
              duration: duration,
              ease: [0.33, 1, 0.68, 1],
            }}
          />
        </div>
        <p className='w-full text-center text-xs'>{description}</p>
      </motion.div>
    </AnimatePresence>
  </>
)

export { Loading }
