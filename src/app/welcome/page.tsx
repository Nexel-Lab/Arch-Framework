'use client'

import { app } from '@config'
import { Check, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { RootLayout } from '@/layouts'
import { cn } from '@/libs'

const technologies = [
  {
    title: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Next.js',
    link: 'https://nextjs.org/',
    color: 'from-gray-800 to-black',
  },
  {
    title: 'Tailwind',
    link: 'https://tailwindcss.com/',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Auth.js',
    link: 'https://authjs.dev/',
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'tRPC',
    link: 'https://trpc.io/',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Prisma',
    link: 'https://www.prisma.io/',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'MongoDB',
    link: 'https://www.mongodb.com/',
    color: 'from-green-600 to-green-700',
  },
  {
    title: 'Redis',
    link: 'https://redis.io/',
    color: 'from-red-500 to-red-600',
  },
  {
    title: 'AWS S3',
    link: 'https://aws.amazon.com/s3/',
    color: 'from-orange-500 to-amber-600',
  },
]

const folderStructure = [
  { name: 'src', description: 'Source project' },
  { name: 'backend', description: 'tRPC, api, and authentication' },
  { name: 'global', description: 'Global config, constants, and environments' },
  { name: 'arch', description: 'Core package, plug-ins, and extensions' },
  { name: 'scripts', description: 'Utility scripts for app' },
  { name: 'prod', description: 'CI/CD, Docker, and production deployment' },
]

enum MANAGER_NAME {
  PNPM = 'pnpm',
  NPM = 'npm',
  YARN = 'yarn',
  BUN = 'bun',
}

const packageManagers: Record<MANAGER_NAME, string> = {
  [MANAGER_NAME.PNPM]: 'pnpm dlx create-arch-app my-project',
  [MANAGER_NAME.NPM]: 'npx create-arch-app my-project',
  [MANAGER_NAME.YARN]: 'yarn create-arch-app my-project',
  [MANAGER_NAME.BUN]: 'bunx create-arch-app my-project',
}

const Page = () => {
  const $cursor = useRef<HTMLDivElement | null>(null)
  const [selectedManager, setSelectedManager] = useState<MANAGER_NAME>(
    MANAGER_NAME.PNPM,
  )
  const [copied, setCopied] = useState(false)

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event
    const cursor = $cursor.current
    if (cursor)
      cursor.style.transform = `translate3d(${clientX - 192}px, ${clientY - 192}px, 0px)`
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: prevent unnecessary Re-renders
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onMouseMove(event)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <RootLayout>
      <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-12 text-white md:pt-0'>
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-200/100 blur-3xl duration-100'
            ref={$cursor}
          />
        </div>
        <div className='relative z-10 flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center px-6 md:px-12'>
          <div className='mb-4 text-center'>
            <div className='mb-8'>
              <ArchLogo />
            </div>
            <h1 className='mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text font-black text-5xl text-transparent md:text-7xl'>
              ARCH Framework
            </h1>
            <p className='mb-8 max-w-2xl text-gray-300 text-xl'>
              <span className='text-purple-300'>Scalability</span> |{' '}
              <span className='text-pink-300'>Modularity</span> |{' '}
              <span className='text-cyan-300'>Full-stack Type Safety</span>
            </p>
            <div className='mb-8 flex flex-wrap items-center justify-center gap-2 text-sm'>
              <span className='text-gray-400'>Powered by</span>
              {technologies.map((tech) => (
                <TechBadge key={tech.title} tech={tech} />
              ))}
            </div>
          </div>
          <div className='mb-6 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm'>
            <h2 className='mb-3 text-center font-bold text-2xl'>
              Ready to Start?
            </h2>
            <div className='mb-1 flex justify-center'>
              <div className='flex rounded-lg bg-black/20 p-1'>
                {Object.values(MANAGER_NAME).map((manager) => (
                  <button
                    className={`rounded-md px-3 py-1 font-medium text-xs transition-all ${
                      selectedManager === manager
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:bg-white/10 hover:text-white'
                    }`}
                    key={manager}
                    onClick={() => setSelectedManager(manager)}
                  >
                    {manager}
                  </button>
                ))}
              </div>
            </div>
            <div className='relative mx-auto max-w-lg rounded-lg bg-black/30 p-4 text-center text-purple-300'>
              <code>{packageManagers[selectedManager]}</code>
              <button
                className='-translate-y-1/2 absolute top-1/2 right-3 transform rounded p-1 transition-colors hover:bg-white/10'
                onClick={() => {
                  navigator.clipboard.writeText(
                    packageManagers[selectedManager],
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                title='Copy to clipboard'
              >
                {copied ? (
                  <Check className='h-4 w-4 text-green-400' />
                ) : (
                  <Copy className='h-4 w-4 text-purple-300 hover:text-white' />
                )}
              </button>
            </div>
          </div>

          <div className='grid w-full max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {folderStructure.map((folder) => (
              <div
                className='rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50 hover:bg-white/10'
                key={folder.name}
              >
                <div className='flex items-center space-x-3'>
                  <div className='h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400' />
                  <code className='font-mono text-purple-300 text-sm'>
                    {folder.name}
                  </code>
                </div>
                <p className='mt-2 text-gray-400 text-xs'>
                  {folder.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </RootLayout>
  )
}

const TechBadge = ({ tech }: { tech: (typeof technologies)[number] }) => (
  <a
    className='group'
    href={tech.link}
    rel='noopener noreferrer'
    target='_blank'
  >
    <span
      className={cn(
        'inline-block cursor-pointer rounded-md bg-gradient-to-r px-2 py-1 font-medium text-white text-xs transition-transform hover:scale-105',
        tech.color,
      )}
    >
      {tech.title}
    </span>
  </a>
)

const ArchLogo = () => (
  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500'>
    <svg
      className='h-12 w-12 text-white'
      fill='currentColor'
      viewBox='0 0 512 512'
    >
      <path d='M345.5,212.31l-125.44,212.36c-18.16,30.76-51.23,49.64-86.96,49.64H10.62c-8.2,0-13.29-8.89-9.15-15.96L245.46,42.38c3.66-6.24,12.68-6.26,16.35-.01l83.72,142.32c5.01,8.53,5.01,19.11-.03,27.63Z' />
      <path d='M501.94,474.31h-118.37c-59.26,0-95.1-65.52-63.11-115.42l60.55-94.45c3.83-5.98,12.61-5.78,16.17.34l113.43,194.45c3.91,6.69-.92,15.09-8.67,15.09Z' />
    </svg>
  </div>
)

const Footer = () => {
  return (
    <footer className='relative bottom-0 left-0 mt-12 flex h-24 w-full items-center border-white/10 border-t bg-black/20 backdrop-blur-sm md:mt-0 md:h-12'>
      <div className='mx-auto w-full max-w-4xl px-6'>
        <div className='flex flex-col items-center justify-between space-y-1 md:flex-row md:space-y-0'>
          <div className='flex items-center space-x-2 text-sm'>
            <span className='text-gray-400'>Developed by</span>
            <Link
              className='flex items-center space-x-1 text-purple-300 transition-colors hover:text-purple-200'
              href='https://theiceji.com'
            >
              <span>TheIceJi</span>
              <ExternalLink className='size-3' />
            </Link>
          </div>

          <div className='flex items-center space-x-2 text-sm'>
            <span className='text-gray-400'>Associate with</span>
            <Link
              className='flex items-center space-x-1 text-purple-300 transition-colors hover:text-purple-200'
              href='https://nexellab.com/'
            >
              <span>Nexel</span>
              <ExternalLink className='size-3' />
            </Link>
          </div>

          <div className='flex items-center space-x-2 text-sm'>
            <span className='text-gray-400'>Version</span>
            <Link
              className='flex items-center space-x-1 text-purple-300 transition-colors hover:text-purple-200'
              href='https://github.com/Nexel-Lab/Arch-Framework'
            >
              <span>{app.VERSION}</span>
              <ExternalLink className='size-3' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Page
