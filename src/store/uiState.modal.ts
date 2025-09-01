export const MODAL = {
  EXAMPLE: 'EXAMPLE',
} as const

export interface IModalExample {
  id: string
  title: string
  onConfirm: () => void | Promise<void>
  onSuccess: () => void | Promise<void>
}

export type TModalKey = keyof typeof MODAL
export type TModalValue = (typeof MODAL)[TModalKey]

export type TModal = { modal: typeof MODAL.EXAMPLE; data: IModalExample }
