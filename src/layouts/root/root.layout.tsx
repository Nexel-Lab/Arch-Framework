// import { Nav } from './nav'

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      {/* <Nav /> */}
    </>
  )
}
