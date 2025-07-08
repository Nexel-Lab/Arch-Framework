import { Toast } from '#core/view/toast'
import { Progress } from '#core/view/bprogress'
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
