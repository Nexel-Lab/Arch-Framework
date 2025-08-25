import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { Image } from '#core/view/ui'
import { ThemeSwitcher } from './ThemeSwitcher'

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='absolute h-dvh w-dvw'>
      </div>
      <div className='absolute flex h-dvh w-dvw items-center justify-center bg-background'>
        <div className='flex md:h-[410px]'>
          <div className='relative hidden h-full w-96 overflow-hidden rounded-lg shadow-black/30 shadow-xl md:block'>
            <Image
              alt='Logo'
              fill
              objectFit='cover'
              quality={80}
              src='/og.jpg'
            />
          </div>
          <div className='mt-2 h-[calc(100%-1rem)] rounded-lg bg-background-deep/50 backdrop-blur-md md:rounded-r-lg'>
            {children}
          </div>
        </div>
      </div>
      <Link
        className='anim-config anim-opacity-60 absolute top-4 left-4 flex items-center space-x-2 text-foreground'
        href='/'
      >
        <div className='h-4 w-4'>
          <IoArrowBack />
        </div>
        <p>HOME</p>
      </Link>
      <ThemeSwitcher />
    </>
  )
}

export default Page
