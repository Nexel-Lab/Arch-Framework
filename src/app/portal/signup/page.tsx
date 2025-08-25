import { getSession } from '@server/plugins/auth'
import { getProviders } from 'next-auth/react'
import { SignInProviders, SignUpArch } from '../components'

const Page = async () => {
  const providers = await getProviders()
  const session = await getSession()

  return (
    <SignUpArch>
      <SignInProviders providers={providers} session={session} />
    </SignUpArch>
  )
}

export default Page
