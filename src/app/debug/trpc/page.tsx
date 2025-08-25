import { getSession } from '@server/plugins/auth'
import { Client } from './page.client'

const Page = async () => {
  const session = await getSession()

  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center'>
      <div className='flex w-64 flex-col items-center text-center'>
        <Client session={session} />
      </div>
    </div>
  )
}

export default Page
