import { Controllers } from './_controllers'
import { GlobalComponent } from './_global'
import { Providers } from './Providers'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      {children}
      <GlobalComponent />
      <Controllers />
    </Providers>
  )
}

export { Wrapper }
