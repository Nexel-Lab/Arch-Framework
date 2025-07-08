'use client'

import { invalidationRules } from '@config/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@trpc'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { useState } from 'react'
import superjson from 'superjson'
import { getBaseUrl } from '#core/utils/url'

export const TrpcProvider = (p: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onSuccess: async () => {
              try {
                await queryClient.invalidateQueries({
                  predicate: (query) => {
                    const [root, procedure] = query.queryKey as [string, string]
                    const rules = invalidationRules[root]
                    if (!rules) return false
                    if (rules.invalidateAll) return true
                    if (rules.exclude?.includes(procedure)) return false
                    if (rules.includeOnly?.length) {
                      return rules.includeOnly.includes(procedure)
                    }
                    return true
                  },
                })

                if (process.env.NODE_ENV === 'development') {
                  const currentQueries = queryClient.getQueryCache().getAll()
                  // Log queries that are being refetch
                  const refetching = currentQueries
                    .filter((q) => q.state.fetchStatus === 'fetching')
                    .map((q) => ({
                      key: q.queryKey,
                      status: q.state.status,
                      fetchStatus: q.state.fetchStatus,
                    }))
                  console.log('Queries being refetch:', refetching)
                  // Log all affected queries
                  const allAffected = currentQueries
                    .filter((q) => q.state.fetchStatus !== 'idle')
                    .map((q) => ({
                      key: q.queryKey,
                      status: q.state.status,
                      fetchStatus: q.state.fetchStatus,
                    }))
                  console.log('All affected queries:', allAffected)
                }
              } catch (error) {
                console.error('Error during cache invalidation:', error)
              }
            },
            // Optional: Add global mutation error handling
            onError: (error) => {
              console.error('Mutation error:', error)
            },
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl(8989)}/api/trpc/`,
          transformer: superjson,
          headers: () => {
            return {
              celestia: 'cosmos',
            }
          },
          fetch: (url, options) => {
            const { body, ...rest } = options ?? {}

            return fetch(url, {
              ...rest,
              body: body as BodyInit,
              credentials: 'include',
              headers: {
                ...options?.headers,
              },
            })
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
