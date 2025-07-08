import { getSession } from '@backend/auth'
import { Client } from './page.client'

const Page = async () => {
  const session = await getSession()
  if (!session) {
    return (
      <div>
        <p>เกิดข้อผิดพลาด</p>
      </div>
    )
  }
  return <Client session={session} />
}

export default Page
