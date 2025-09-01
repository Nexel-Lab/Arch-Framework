import { cn } from '#core/utils'

interface IModalBodyProps {
  children: React.ReactNode
  className?: string
}

export const ModalBody = ({ children, className }: IModalBodyProps) => {
  return <div className={cn('px-5 py-3 text-sm', className)}>{children}</div>
}
