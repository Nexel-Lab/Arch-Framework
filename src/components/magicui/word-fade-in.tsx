'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '#core/utils/styles'

interface WordFadeInProps {
  words: string
  className?: string
  delay?: number
  variants?: Variants
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(' ')

  return (
    <motion.h1
      animate='visible'
      className={cn(
        'font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-xs md:text-7xl md:leading-[5rem] dark:text-white',
        className,
      )}
      initial='hidden'
      variants={variants}
    >
      {_words.map((word, i) => (
        <motion.span custom={i} key={word} variants={variants}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  )
}
