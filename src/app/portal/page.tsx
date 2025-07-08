import { authOptions } from '@backend/auth'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'
import { Client } from './page.client'

const Page = async () => {
  const providers = await getProviders()
  const session = await getServerSession(authOptions)

  return <Client providers={providers} session={session} />
}

export default Page
