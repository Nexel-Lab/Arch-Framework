import type { IModalExample } from '@/store'
import type { IModalProps } from '../_h'
import { ActionButton, ModalBody, ModalHeader } from '../components'

export const ExampleModal = ({
  $ref,
  onClearModal,
  modalData,
}: IModalProps<IModalExample>) => {
  const { onConfirm } = modalData
  return (
    <div
      className='w-[350px] rounded-md border border-foreground/5 bg-background shadow-md'
      ref={$ref}
    >
      <ModalHeader onClose={onClearModal} title='Update user' />
      <ModalBody className='w-full'>
        <h2 className='pt-4 text-xl'>
          Are you sure, you want to update user profile?
        </h2>
        <p className='pb-4 text-foreground/50 text-sm'>
          This action cannot be undone.
        </p>
        <div>
          <ActionButton
            {...{
              onSubmit: onConfirm,
              onClearModal,
              isSending: true,
              isSuccess: true,
              submitText: 'Send',
            }}
          />
        </div>
      </ModalBody>
    </div>
  )
}
