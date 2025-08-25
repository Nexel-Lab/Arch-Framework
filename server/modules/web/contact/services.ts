import type { TContext } from '@server/plugins/trpc'
import { trpcResponse } from '#core/utils/server/trpc'
import { WEB } from '../_h'
import type { dropEmailInput } from './schema'
import { getErrorMessage } from '#arch/core/utils/server/error'

export const dropEmail = async ({
  ctx,
  input,
}: {
  ctx: TContext
  input: dropEmailInput
}) => {
  try {
    const newsletter = await ctx.prisma.app.findUnique({
      where: { key: WEB.NEWS_LETTER },
    })

    if (newsletter) {
      if (newsletter.value) {
        await ctx.prisma.app.update({
          where: { key: WEB.NEWS_LETTER },
          data: {
            value: {
              users: [
                ...(newsletter.value as { users: string[] }).users,
                input.toLowerCase(),
              ],
            },
          },
        })
      }
    } else {
      await ctx.prisma.app.create({
        data: {
          key: WEB.NEWS_LETTER,
          value: {
            users: [input.toLowerCase()],
          },
        },
      })
    }
    return trpcResponse.success<{ email: string }>('Drop email success', {
      email: input.toLowerCase(),
    })
  } catch (e) {
    const message = getErrorMessage(e)
    return trpcResponse.fail(
      `[ERR][tRPC/web] Add email to newsletter fail: ${message}`,
    )
  }
}
