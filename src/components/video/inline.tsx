'use client'

import { useEffect, useRef } from 'react'
import { cn } from '#core/utils/styles'

interface VideoInlineProps {
  videoUrl: string
  posterUrl?: string
  noPause?: boolean
  loop?: boolean
  muted?: boolean
  autoPlay?: boolean
  className?: string
}

const VideoInline: React.FC<VideoInlineProps> = ({
  videoUrl,
  posterUrl,
  className,
  noPause: _noPause = true,
  loop = true,
  muted = true,
  autoPlay = true,
}) => {
  const $videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if ($videoRef.current) {
      const ref = $videoRef.current
      ref.setAttribute('download', '')
      const timeoutId = setTimeout(() => {
        ref.play()
      }, 20)

      return () => {
        clearTimeout(timeoutId)
        if (ref) {
          ref.pause()
          ref.currentTime = 0 // Reset the video position
        }
      }
    }
  }, [])

  return (
    <div className='pointer-events-none h-dvh w-dvw'>
      <video
        autoPlay={autoPlay}
        className={cn('h-full w-full', className)}
        loop={loop}
        muted={muted}
        playsInline
        poster={posterUrl}
        preload='auto'
        ref={$videoRef}
        style={{ objectFit: 'cover' }}
      >
        <source src={videoUrl} type='video/mp4' />
        {/** biome-ignore lint/performance/noImgElement: <for Video preview thumbnail> */}
        {posterUrl && <img alt='Video thumbnail' src={posterUrl} />}
      </video>
    </div>
  )
}

export { VideoInline }
