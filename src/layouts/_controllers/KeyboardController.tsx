'use client'

import { useEffect } from 'react'
import { MODAL, useUiStore } from '@/store'

export const KeyboardController = () => {
  const onToggleModal = useUiStore((st) => st.onToggleModal)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 'Example'
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onToggleModal({
          modal: MODAL.EXAMPLE,
          data: {
            id: '00',
            title: 'Example modal',
            onConfirm: () => {},
            onSuccess: () => {},
          },
        })
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onToggleModal])
  return null
}
