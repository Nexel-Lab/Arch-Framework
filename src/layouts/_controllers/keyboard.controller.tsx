'use client'

import { useEffect } from 'react'
import { MODAL, useUiState } from '@/store'

const KeyboardController = () => {
  const onToggleModal = useUiState((st) => st.onToggleModal)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 'Search'
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onToggleModal(MODAL.SEARCH)
      }
      // 'App Info'
      if (e.key === 'i' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onToggleModal(MODAL.APP_INFO)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onToggleModal])
  return null
}

export { KeyboardController }
