'use client'

import { useShallow } from 'zustand/shallow'
import { Moon, Sun } from '#core/assets/icons'
import { useUiStore } from '@/store'

const Nav = () => {
  const [isDark, setIsDark] = useUiStore(
    useShallow((st) => [st.isDark, st.setIsDark]),
  )
  return (
    <button
      className='Anim fixed top-4 right-4 z-100 h-10 w-10 cursor-pointer rounded-md p-2 shadow-sm hover:scale-110'
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <Sun className='h-full w-full' />
      ) : (
        <Moon className='h-full w-full' />
      )}
    </button>
  )
}

export { Nav }
