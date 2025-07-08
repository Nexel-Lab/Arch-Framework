import { getSession } from '@backend/auth'
import { env } from '@env'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import { Client } from './page.client'

interface TPageProps {
  searchParams: Promise<{
    token: string | undefined
  }>
}

const Page = async ({ searchParams }: TPageProps) => {
  const { token } = await searchParams
  const session = await getSession()
  if (!token) {
    return redirect('/welcome')
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(env.NEXTAUTH_SECRET),
    )
    if (!payload.email) {
      return <p>Sorry, you are not authorized to access this page</p>
    }
    return <Client email={payload.email as string} session={session} />
  } catch (error) {
    console.error('JWT verification failed:', error)
    return <p>Something went wrong, can't verify your token</p>
  }
}

export default Page
