import type { Context } from '@backend/trpc/trpc.context'
import { trpcResponse } from '#core/utils/server/trpc'
import { WEB } from '../_h'
import type { dropEmailInput } from './schema'

export const dropEmail = async ({
  ctx,
  input,
}: {
  ctx: Context
  input: dropEmailInput
}) => {
  try {
    const subscribeList: any = await ctx.prisma.app.findUnique({
      where: { key: WEB.NEWS_LETTER },
    })

    if (subscribeList) {
      if (subscribeList.content) {
        await ctx.prisma.app.update({
          where: { key: WEB.NEWS_LETTER },
          data: {
            value: {
              users: [...subscribeList.content.users, input],
            },
          },
        })
      }
    } else {
      await ctx.prisma.app.create({
        data: {
          key: WEB.NEWS_LETTER,
          value: {
            users: [input],
          },
        },
      })
    }
    return trpcResponse.success('Drop email success')
  } catch (_e) {
    throw new Error("Database/Aurora/Newsletter: Can't add user email")
  }
}
