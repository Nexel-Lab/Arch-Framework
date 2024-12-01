import { Nav } from './nav'
import { Footer } from './footer'

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Nav />
      <Footer />
    </>
  )
}
