import { getSession } from '@backend/auth'
import { Client } from './page.client'

const Page = async () => {
  const session = await getSession()
  return (
    <>
      <Client session={session} />
    </>
  )
}

export default Page
