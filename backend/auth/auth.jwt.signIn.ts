// import { v4 as uuidv4 } from 'uuid'
import { prisma } from '#core/database/prisma'

const archSignIn = async (credentials: Record<'email', string> | undefined) => {
  if (!credentials || !credentials.email) {
    return null
  }

  try {
    const isUser = await prisma.user.findUnique({
      where: { email: credentials.email.toLowerCase() },
    })
    if (isUser) {
      return isUser
    }

    const newUser = await prisma.user.create({
      data: {
        email: credentials.email.toLowerCase(),
      },
    })

    if (!newUser) {
      console.log('Create user data failed')
      return null
    }

    return newUser
  } catch (err) {
    console.error(err)
    return null
  }
}

export { archSignIn }
