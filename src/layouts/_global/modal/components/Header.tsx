import { IoCloseOutline } from 'react-icons/io5'
import { cn } from '#core/utils'

interface IModalHeaderProps {
  title: string
  onClose: () => void
  isLoading?: boolean
}

export const ModalHeader = ({
  title,
  onClose,
  isLoading = false,
}: IModalHeaderProps) => {
  return (
    <div className='flex items-center justify-between border-b bg-foreground/5 px-5 py-1'>
      <h2 className='font-semibold text-lg'>{title}</h2>
      <button
        className={cn(
          'size-4 rounded-full bg-red-600 p-px text-sm',
          isLoading && 'pointer-events-none cursor-not-allowed saturate-0',
        )}
        disabled={isLoading}
        onClick={onClose}
        title='Close modal'
      >
        <IoCloseOutline className='size-full text-white' />
      </button>
    </div>
  )
}
