'use client'

import { AnimatePresence, motion, type Variants } from 'motion/react'
import { cn } from '#core/utils/styles'

interface FlipTextProps {
  word: string
  duration?: number
  delayMultiple?: number
  framerProps?: Variants
  className?: string
}

export function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}: FlipTextProps) {
  return (
    <div className='flex justify-center space-x-2'>
      <AnimatePresence mode='wait'>
        {word.split('').map((char, i) => (
          <motion.span
            animate='visible'
            className={cn('origin-center drop-shadow-xs', className)}
            exit='hidden'
            initial='hidden'
            key={i}
            transition={{ duration, delay: i * delayMultiple }}
            variants={framerProps}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
