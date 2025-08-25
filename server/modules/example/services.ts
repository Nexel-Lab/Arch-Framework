import type { TContext } from '@server/plugins/trpc'
import type { exampleInput } from './schema'

export const example = ({
  ctx: _ctx,
  input,
}: {
  ctx: TContext
  input: exampleInput
}) => {
  return {
    greeting: `Hello, I'm ${input.text}`,
  }
}
