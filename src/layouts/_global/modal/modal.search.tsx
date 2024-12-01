import type { RefObject } from 'react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAppState } from '@/store'

export const SearchModal = ({
  $ref,
  // _onClearModal,
}: {
  $ref: RefObject<any>
  // _onClearModal: () => void
}) => {
  const [searchInput, setSearchInput] = useState('')
  const _searchDataIndex = useAppState((state) => state.searchDataIndex)

  const $input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    $input.current?.focus()
  }, [])

  return (
    <div className='w-[350px] xl:w-[650px]' ref={$ref}>
      <input
        ref={$input}
        className='w-full rounded-xl bg-background/80 px-4 py-2 text-2xl xl:text-4xl'
        type='text'
        placeholder='Search..'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className='mt-4 h-[250px] w-full space-y-1 overflow-scroll rounded-xl bg-background/60 p-2'>
        {_searchDataIndex &&
          _searchDataIndex
            .filter((item) =>
              item.title.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((item) => searchItem(item))}
      </div>
    </div>
  )
}

interface SearchItemProps {
  title: string
  path: string
}

const searchItem: React.FC<SearchItemProps> = ({ title, path }) => {
  return (
    <>
      <Link
        href={path}
        className='Anim flex w-full cursor-pointer justify-between rounded-md bg-foreground/5 px-4 py-2 hover:bg-foreground/10'
        key={title}
      >
        <p className='truncate'>{title}</p>
        <button className='rounded-md bg-background/80 px-2 py-1 text-xs'>
          {path}
        </button>
      </Link>
    </>
  )
}
