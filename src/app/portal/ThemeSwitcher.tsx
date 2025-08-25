'use client'

import { LuMoon, LuSun } from 'react-icons/lu'
import { useShallow } from 'zustand/shallow'
import { useUiStore } from '@/store'

export const ThemeSwitcher = () => {
  const [isDark, onToggleIsDark] = useUiStore(
    useShallow((st) => [st.isDark, st.onToggleIsDark]),
  )
  return (
    <button
      className='anim-config anim-opacity-60 absolute top-4 right-4 cursor-pointer fill-foreground'
      onClick={() => onToggleIsDark()}
      title='Toggle dark mode'
    >
      <div className='h-6 w-6'>{!isDark ? <LuMoon /> : <LuSun />}</div>
    </button>
  )
}
