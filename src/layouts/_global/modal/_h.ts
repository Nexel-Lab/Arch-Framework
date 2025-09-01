import type { TModal } from '@/store'

export interface IModalProps<T extends TModal['data']> {
  $ref: React.RefObject<HTMLDivElement | null>
  onClearModal: () => void
  modalData: T
}
