/* eslint-disable prettier/prettier */

import { getSession } from '@backend/auth'
import { env } from '@env'
import { GoogleTagManager } from '@next/third-parties/google'
import type { AppProps } from 'next/app'
import { Inter, Prompt } from 'next/font/google'
import { Wrapper } from '@/layouts/wrapper'
import { cn } from '@/libs/styles'
import { App } from './layout.app'

import './global.scss'

export { metadata, viewport } from '@config'

const fInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fPrompt = Prompt({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '600'],
  display: 'swap',
  variable: '--font-prompt',
})

type AppPropsWithLayout = AppProps & {
  children: React.ReactNode
}

const Layout = async ({ children }: AppPropsWithLayout) => {
  const session = await getSession()
  console.log({ session })
  return (
    <html
      className={cn(fInter.className, `${fInter.variable} ${fPrompt.variable}`)}
      lang='en'
    >
      <body suppressHydrationWarning={true}>
        <Wrapper>
          <App session={session}>{children}</App>
        </Wrapper>
        {env.NEXT_PUBLIC_GTM !== '' && (
          <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM} />
        )}
      </body>
    </html>
  )
}

export default Layout
