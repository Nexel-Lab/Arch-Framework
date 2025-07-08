'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useUiState } from '@/store'

export const ThemeController = () => {
  const [isDark, setIsaDark] = useUiState(
    useShallow((st) => [st.isDark, st.setIsDark]),
  )

  useEffect(() => {
    function InitState() {
      if (
        !('theme' in localStorage)
        // && window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setIsaDark(true)
      } else {
        setIsaDark(false)
      }
    }
    InitState()
  }, [setIsaDark])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return null
}
