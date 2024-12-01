'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShallow } from 'zustand/shallow'
import { useUiState, MODAL } from '@/store'
import { useOnClickOutside } from '@arch/core/hooks/events'
import { useLockedBody } from '@arch/core/hooks/layouts'
import { AppInfoModal } from './modal.appInfo'
import { SearchModal } from './modal.search'
// import { SomethingModal } from './modal.something'

export const Modal = () => {
  const [_modal, _onClearModal] = useUiState(
    useShallow((st) => [st.modal, st.onClearModal]),
  )

  const $modal = useRef(null)
  useOnClickOutside($modal, () => _onClearModal())

  const [locked, setLocked] = useLockedBody()
  useEffect(() => {
    setLocked(_modal !== undefined)
  }, [_modal, setLocked])
  return (
    <>
      <AnimatePresence>
        {_modal !== undefined && (
          <>
            <motion.div
              className='fixed left-0 top-0 z-100 flex h-dvh w-dvw items-center justify-center bg-background/60 backdrop-blur-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {_modal === MODAL.APP_INFO && (
                <AppInfoModal $ref={$modal} _onClearModal={_onClearModal} />
              )}
              {_modal === MODAL.SEARCH && (
                <SearchModal $ref={$modal} /* _onClearModal={_onClearModal}*/ />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
