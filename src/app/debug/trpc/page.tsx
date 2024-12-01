import { Client } from './page.client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@backend/auth'

const Page = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className='flex h-dvh w-dvw flex-col items-center justify-center'>
        <div className='flex w-64 flex-col items-center text-center'>
          <Client session={session} />
        </div>
      </div>
    </>
  )
}

export default Page
