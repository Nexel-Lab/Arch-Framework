import { TrpcProvider } from './_providers'

/** Global Provider for app is here **/

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TrpcProvider>{children}</TrpcProvider>
}
