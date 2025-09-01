'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { useOnClickOutside } from '#core/hooks/events'
import { useLockedBody } from '#core/hooks/layouts'
import { useUiStore } from '@/store'
import { renderModal } from './renderModal'

export const Modal = () => {
  const [modal, onClearModal] = useUiStore(
    useShallow((st) => [st.modal, st.onClearModal]),
  )

  const $modal = useRef<HTMLDivElement | null>(null)
  useOnClickOutside<HTMLDivElement>($modal, () => onClearModal())

  const [_locked, setLocked] = useLockedBody()
  useEffect(() => {
    setLocked(modal !== undefined)
  }, [modal, setLocked])

  return (
    <AnimatePresence>
      {modal !== undefined && (
        <motion.div
          animate={{ opacity: 1 }}
          className='fixed top-0 left-0 z-100 flex h-dvh w-dvw items-center justify-center bg-background/60 backdrop-blur-lg'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={modal.modal}
        >
          {renderModal(modal, $modal, onClearModal)}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
