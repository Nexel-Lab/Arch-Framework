'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ILogMeta, TLogLevel } from '@/libs/logger/_h'
import { useLogger } from '@/libs/logger/client/axiom/client'

export const Axiom = () => {
  const [metadata, setMetadata] = useState<ILogMeta>({
    scope: 'TEST',
    component: 'client',
    operation: 'axiomLogInfo',
    contextId: 'contextId',
    description: 'description',
  })
  const [logLevel, setLogLevel] = useState<TLogLevel>('INFO')
  const log = useLogger()

  return (
    <div className='space-y-2'>
      <h3 className='font-bold text-lg'>Axiom</h3>
      <input
        className='w-full rounded-md bg-foreground/5 px-2 py-1'
        onChange={(e) =>
          setMetadata((prev) => ({ ...prev, contextId: e.target.value }))
        }
        placeholder='contextId'
        type='text'
        value={metadata.contextId}
      />
      <input
        className='w-full rounded-md bg-foreground/5 px-2 py-1'
        onChange={(e) =>
          setMetadata((prev) => ({
            ...prev,
            description: `${e.target.value} from Arch Framework`,
          }))
        }
        placeholder='description'
        type='text'
        value={metadata.description}
      />
      <Select onValueChange={(v: TLogLevel) => setLogLevel(v)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select log level' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='INFO'>INFO</SelectItem>
            <SelectItem value='WARN'>WARN</SelectItem>
            <SelectItem value='DEBUG'>DEBUG</SelectItem>
            <SelectItem value='ERROR'>ERROR</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='*border-foreground/10 flex gap-x-2 *:w-1/2 *:rounded-md *:py-2 *:duration-300 *:hover:duration-200'>
        <button
          className='bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
          onClick={() => {
            log(logLevel, { ...metadata, operation: `axiomLog${logLevel}` })
            toast.success('[AXIOM] Successfully sent test log from client')
          }}
        >
          Send Client log
        </button>
        <button
          className='bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
          onClick={async () => {
            const res = await fetch('/api/debug/axiom', {
              method: 'POST',
              body: JSON.stringify({ logLevel, metadata }),
            })
            if (!res.ok) {
              toast.error(
                '[AXIOM] Error occurred during send test log from Server',
              )
              console.log(res)
              return
            }
            toast.success('[AXIOM] Successfully sent test log from Server')
          }}
        >
          Send Server log
        </button>
      </div>
    </div>
  )
}
