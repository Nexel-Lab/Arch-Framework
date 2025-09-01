import { Progress } from '#core/view/bprogress'
import { Toast } from '#core/view/toast'
// import { Modal } from './modal'

export const GlobalComponent = () => {
  return (
    <>
      <Progress color={{ light: '#8a50c4', dark: '#8a50c4' }} />
      <Toast />
      {/* <Modal /> */}
    </>
  )
}
