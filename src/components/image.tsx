import type { CSSProperties, HTMLAttributes } from 'react'
import NextImage from 'next/image'

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
type ObjectPosition = string | `${number}% ${number}%`

interface BaseImageProps
  extends Pick<
    HTMLAttributes<HTMLImageElement>,
    'onClick' | 'onLoad' | 'onError'
  > {
  src: string
  alt: string // Making alt required for accessibility
  className?: string
  objectFit?: ObjectFit
  objectPosition?: ObjectPosition
  quality?: number
  priority?: boolean
}

interface UnoptimizedImageProps extends BaseImageProps {
  unoptimized: true
  width?: number
  height?: number
}

interface OptimizedImageProps extends BaseImageProps {
  unoptimized?: false
  fill?: boolean
  width?: number
  height?: number
  blurDataURL?: string
  loading?: 'lazy' | 'eager'
}

type ImageProps = UnoptimizedImageProps | OptimizedImageProps

const DEFAULT_BLUR_DATA_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
const DEFAULT_QUALITY = 90

export const Image = ({
  unoptimized,
  src,
  alt,
  className,
  objectFit = 'cover',
  objectPosition = '50% 50%',
  quality = DEFAULT_QUALITY,
  ...props
}: ImageProps) => {
  const imageStyle = {
    objectFit,
    objectPosition,
  }

  if (unoptimized) {
    const { width, height } = props
    const style =
      width && height
        ? imageStyle
        : {
            ...imageStyle,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style as CSSProperties}
        width={width}
        height={height}
        {...props}
      />
    )
  }

  const optimizedProps = props as OptimizedImageProps

  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      style={imageStyle}
      quality={quality}
      placeholder='blur'
      blurDataURL={optimizedProps.blurDataURL ?? DEFAULT_BLUR_DATA_URL}
      {...props}
    />
  )
}
