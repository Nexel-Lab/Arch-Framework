'use client'

import { cn } from '#core/utils'

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = '#0096ff',
  duration = '1.5s',
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-center text-white dark:bg-blue-500 dark:text-black',
        className,
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className='relative z-10'>{children}</div>
      <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-full animate-pulse rounded-lg bg-inherit' />
    </button>
  )
}
