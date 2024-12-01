import { Toast } from '@arch/core/view/toast'
import { CreateProgress } from '@arch/core/view/nprogress'
import { theme } from '@config'
// import { Modal } from './modal'

export const GlobalComponent = () => {
  return (
    <>
      <CreateProgress color={theme.color.primary} />
      <Toast />
      {/* <Modal /> */}
    </>
  )
}
