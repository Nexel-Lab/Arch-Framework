import { useState } from 'react'

interface ChangeEmailModalProps {
  onClose: () => void
  onSubmitEmail: (email: string) => void
}

export const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  onClose,
  onSubmitEmail,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='fixed top-0 left-0 flex h-dvh w-dvw items-center justify-center bg-black/20 backdrop-blur-md'>
      <form className='w-3/4 max-w-96 rounded-lg bg-white p-4 text-black'>
        <p className='mb-2 font-bold'>New email</p>
        <input
          className='w-full bg-black/10 px-4 py-2'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='new Email'
          required
          type='text'
          value={email}
        />
        <input
          className='mt-2 w-full bg-black/10 px-4 py-2'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='รหัส Staff'
          required
          type='number'
          value={password}
        />
        <div className='mt-4 grid grid-cols-2 gap-2 text-sm'>
          <button
            className='rounded-md bg-green-500 py-2'
            onClick={(e) => {
              e.preventDefault()
              onSubmitEmail(email)
            }}
            type='submit'
          >
            Confirm
          </button>
          <button className='rounded-md bg-red-500 py-2' onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
