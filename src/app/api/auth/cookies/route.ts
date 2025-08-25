// import { cookies } from 'next/headers'

import { serialize } from 'cookie'
import { NextResponse } from 'next/server'
import { RESPONSE_CODE } from '#core/utils/server/response'

export const GET = () => {
  return NextResponse.json(
    { success: true },
    { status: RESPONSE_CODE.INVALID_METHOD },
  )
}

export const POST = async (request: Request) => {
  try {
    const req = await request.json()
    const { cookies, maxAge } = req
    return new NextResponse(`set cookie complete: ${cookies.key}`, {
      status: 201,
      headers: {
        'Set-Cookie': serialize(cookies.key, cookies.value, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: maxAge,
        }),
      },
    })
  } catch (_e) {
    return NextResponse.json(
      { success: false },
      { status: RESPONSE_CODE.INTERNAL_ERROR },
    )
  }
}

export const DELETE = async (request: Request) => {
  try {
    const req = await request.json()
    const { cookies } = req
    return new NextResponse(`delete cookie complete: ${cookies.key}`, {
      status: 200,
      headers: {
        'Set-Cookie': serialize(cookies.key, cookies.value, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 0,
        }),
      },
    })
  } catch (_e) {
    return NextResponse.json(
      { success: false },
      { status: RESPONSE_CODE.INTERNAL_ERROR },
    )
  }
}
