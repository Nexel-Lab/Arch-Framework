'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'
import { cn } from '#core/utils/styles'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-foreground/10'>
      <SliderPrimitive.Range className='absolute h-full bg-foreground/60' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block size-4 rounded-md border-2 border-primary bg-foreground ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
