'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { useOnClickOutside } from '#core/hooks/events'
import { useLockedBody } from '#core/hooks/layouts'
import { MODAL, useUiState } from '@/store'
import { SomethingModal } from './modal.something'
// import { SomethingModal } from './modal.something'

export const Modal = () => {
  const [modal, onClearModal] = useUiState(
    useShallow((st) => [st.modal, st.onClearModal]),
  )

  const $modal = useRef(null)
  useOnClickOutside($modal, () => onClearModal())

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
        >
          {modal === MODAL.APP_INFO && (
            <SomethingModal _onClearModal={onClearModal} $ref={$modal} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
