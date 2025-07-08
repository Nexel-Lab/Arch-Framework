import type { Context } from '@backend/trpc/trpc.context'
import type { exampleInput } from './schema'

export const example = ({
  ctx: _ctx,
  input,
}: {
  ctx: Context
  input: exampleInput
}) => {
  return {
    greeting: `Hello, I'm ${input.text}`,
  }
}
