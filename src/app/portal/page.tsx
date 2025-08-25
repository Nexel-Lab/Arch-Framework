import { getSession } from '@server/plugins/auth'
import { getProviders } from 'next-auth/react'
import { SignInArch, SignInProviders } from './components'

const Page = async () => {
  const providers = await getProviders()
  const session = await getSession()

  return (
    <SignInArch>
      <SignInProviders providers={providers} session={session} />
    </SignInArch>
  )
}

export default Page
