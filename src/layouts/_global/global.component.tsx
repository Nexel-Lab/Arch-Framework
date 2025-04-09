import { Toast } from '@arch/core/view/toast'
import { Progress } from '@arch/core/view/bprogress'
import { theme } from '@config'
// import { Modal } from './modal'

export const GlobalComponent = () => {
  return (
    <>
      <Progress
        color={{ light: theme.color.primary, dark: theme.color.primary }}
      />
      <Toast />
      {/* <Modal /> */}
    </>
  )
}
