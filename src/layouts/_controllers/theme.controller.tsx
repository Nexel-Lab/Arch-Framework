'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useUiStore } from '@/store'

function _InitState(setIsDark: (isDark: boolean) => void) {
  if (
    !('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    setIsDark(true)
  } else {
    setIsDark(false)
  }
}

export const ThemeController = () => {
  const [isDark, setIsDark] = useUiStore(
    useShallow((st) => [st.isDark, st.setIsDark]),
  )

  useEffect(() => {
    // InitState(setIsDark)
    setIsDark(true)
  }, [setIsDark])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return null
}
