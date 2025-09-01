'use client'

import type { TModal } from '@/store'
import { MODAL } from '@/store'
import type { IModalProps } from './_h'
import { ExampleModal } from './example'

type TModalComponentMap = {
  [K in TModal['modal']]:
    | React.FC<IModalProps<Extract<TModal, { modal: K }>['data']>>
    | React.ComponentType<IModalProps<Extract<TModal, { modal: K }>['data']>>
}

const BLOCK_COMPONENTS: TModalComponentMap = {
  [MODAL.EXAMPLE]: ExampleModal,
} as const

export const renderModal = (
  modal: TModal,
  $ref: React.RefObject<HTMLDivElement | null>,
  onClearModal: () => void,
) => {
  const Modal = BLOCK_COMPONENTS[modal.modal] as React.FC<
    IModalProps<typeof modal.data>
  >

  if (!Modal) {
    return null
  }

  return (
    <Modal $ref={$ref} modalData={modal.data} onClearModal={onClearModal} />
  )
}
