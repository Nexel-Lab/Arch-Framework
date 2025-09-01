import { cn } from '#core/utils'
import { Spinner } from '#core/view'

interface IActionButtonProps {
  onSubmit: () => void
  onClearModal: () => void
  isSending: boolean
  isSuccess: boolean
  submitText?: string
  className?: {
    container?: string
  }
}

export const ActionButton = ({
  onSubmit,
  onClearModal,
  isSending,
  isSuccess,
  submitText = 'Submit',
  className,
}: IActionButtonProps) => {
  return (
    <div
      className={cn(
        'mt-4 flex items-center justify-end gap-2 *:rounded-md *:px-3 *:py-1',
        className?.container,
      )}
    >
      <button
        className={cn(
          'flex items-center gap-1',
          isSuccess ? 'bg-green-600 text-black' : 'border bg-foreground/10',
          isSending && 'pointer-events-none',
        )}
        disabled={isSending || isSuccess}
        onClick={onSubmit}
        title='update user permissions'
      >
        {isSending ? (
          <>
            <div className='size-4'>
              <Spinner />
            </div>
            Updating...
          </>
        ) : isSuccess ? (
          'Done'
        ) : (
          submitText
        )}
      </button>
      <button
        className={cn(
          'anim-config border border-red-500 bg-red-500/30 hover:bg-red-500 hover:text-white',
          isSending && 'pointer-events-none cursor-not-allowed opacity-40',
        )}
        disabled={isSending}
        onClick={onClearModal}
        title='cancel'
      >
        {isSuccess ? 'Close' : 'Cancel'}
      </button>
    </div>
  )
}
