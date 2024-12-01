'use client'

import type { RefObject } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { app } from '@config'
// import { MODAL } from '@/store'
import { IceJiLogo } from '@components/logo/IceJi'
import { RealMotionLogo } from '@components/logo/RealMotion'
import { IceJiTriangleLogo } from '@components/logo/IceJiTriangle'
import { ArtScapeLogo } from '@components/logo/ArtScape'

export const AppInfoModal = ({
  $ref,
  _onClearModal,
}: {
  $ref: RefObject<any>
  _onClearModal: () => void
}) => {
  const transitionConfig = (d: number) => ({
    duration: d,
    ease: [0.6, 0.05, 0.01, 0.9],
  })

  return (
    <>
      <motion.div
        ref={$ref}
        initial={{ y: '80%' }}
        animate={{
          y: 0,
        }}
        exit={{ y: '80%' }}
        transition={transitionConfig(0.8)}
        className='flex h-[182px] w-[339px] overflow-hidden rounded-lg bg-white p-2 drop-shadow-xl dark:bg-[#171717] md:h-[500px] md:w-[750px] md:p-4'
      >
        <div className='flex h-full flex-grow flex-col items-start justify-between p-1 md:p-4'>
          <div className='flex h-9 w-full items-center md:h-[57px]'>
            <div className='mr-2 h-full w-[38px] rounded-lg bg-primary p-1 md:w-[57px] md:p-2.5'>
              <IceJiLogo />
            </div>
            <div>
              <h2 className='text-xs font-semibold md:text-xl'>
                TheIceJi Cosmos
              </h2>
              <p className='text-2xs font-light md:text-xs'>
                Ver {app.VERSION} | {app.UPDATE_DATE}
              </p>
            </div>
          </div>
          <div className='text-2xs font-light md:text-base'>
            <p className='font-medium'>Engine:</p>
            <p className='opacity-60'>
              Celestia Network {app.Dependencies.Celestia}
              <br />
              React {app.Dependencies.React} | NextJs {app.Dependencies.NextJs}
              <br />
              Copyright&#169;TheIceJI.com <br />
              All rights reserved
              <br />
              <Link
                href='https://constella.theiceji.com/changelog'
                className='cursor-pointer text-2xs font-light opacity-60 hover:opacity-100 md:text-base'
                onClick={() => _onClearModal()}
              >
                changelog
              </Link>
              {' | '}
              <Link
                href='https://nebula.theiceji.com'
                className='cursor-pointer text-2xs font-light opacity-60 hover:opacity-100 md:text-base'
                onClick={() => _onClearModal()}
              >
                status
              </Link>
            </p>
          </div>
          <div className='flex h-3 w-[90px] space-x-2 md:h-6 md:w-[180px]'>
            <Link
              href='https://realmotion.co/'
              className='h-full w-full fill-black dark:fill-white'
            >
              <RealMotionLogo />
            </Link>
            <Link
              href='https://theiceji.com/'
              className='h-full w-full fill-black dark:fill-white'
            >
              <IceJiTriangleLogo />
            </Link>
            <Link
              href='https://artscape.day/'
              className='h-full w-full fill-black dark:fill-white'
            >
              <ArtScapeLogo />
            </Link>
          </div>
        </div>
        <div className='relative h-full w-[150px] overflow-hidden rounded-lg md:w-[415px]'>
          <Image
            src='/layout/appInfo-0.jpg'
            alt='TheIceJi Splash Screen'
            // width={1500}
            // height={3000}
            placeholder='blur'
            blurDataURL={
              'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
            }
            objectFit='cover'
            fill
            className='h-full duration-300 hover:scale-110 hover:duration-150'
          />
        </div>
      </motion.div>
    </>
  )
}
