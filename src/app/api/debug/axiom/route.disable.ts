import { log, withAxiom } from '@/libs/logger'
import { LOG_LEVEL } from '@/libs/logger/_h'

export const POST = withAxiom(async (req) => {
  const body = await req.json()
  if (!body) return new Response('no body', { status: 400 })

  const { logLevel, metadata } = body
  if (!logLevel || !metadata)
    return new Response('no logLevel or metadata', { status: 400 })

  if (!Object.values(LOG_LEVEL).includes(logLevel))
    return new Response('invalid logLevel', { status: 400 })

  log(logLevel, {
    scope: 'TEST',
    component: 'api',
    operation: `axiomLog${logLevel}`,
    contextId: metadata.contextId,
    description: metadata.description
      ? metadata.description
      : 'hello from "Arch Framework" API',
  })
  return new Response('Test logger Sended', { status: 201 })
})
