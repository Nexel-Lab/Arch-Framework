// import { v4 as uuidv4 } from 'uuid'

import { compare, hash } from 'bcryptjs'
import { prisma } from '#core/database/prisma'

const archSignIn = async (
  credentials: Record<'email' | 'password', string> | undefined,
) => {
  if (!credentials || !credentials.email || !credentials.password) {
    return null
  }

  try {
    const { email, password } = credentials

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (user) {
      if (!user.password) {
        console.error(`[AUTH] User has no password: ${email}`)
        return null
      }
      const isPasswordValid = await compare(password, user.password)
      if (!isPasswordValid) {
        console.error(`[AUTH] Password not matched: ${email}`)
        return null
      }
      return user
    }

    const hashedPassword = await hash(password, 10).catch(() => {
      console.error(`[AUTH] Hash password failed: ${email}`)
      return null
    })

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    if (!newUser) {
      console.error(`[AUTH] Create new user failed: ${email}`)
      return null
    }

    return newUser
  } catch (err) {
    console.error(err)
    return null
  }
}

export { archSignIn }
