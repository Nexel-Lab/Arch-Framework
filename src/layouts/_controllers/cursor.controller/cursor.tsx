'use client'

import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { useUiState, CURSOR } from '@/store'
import { MainCursorCSS, BigCursorCSS } from './cursor.css'

export const CursorController = () => {
  const [_cursorType] = useUiState(useShallow((st) => [st.cursor]))

  const cursor = useRef<HTMLDivElement | null>(null)
  const cursor2 = useRef<HTMLDivElement | null>(null)

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event
    if (cursor.current) {
      cursor.current.style.left = `${clientX}px`
      cursor.current.style.top = `${clientY}px`
    }
    if (cursor2.current) {
      cursor2.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onMouseMove(event)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div>
      <div className={`${MainCursorCSS} ${_cursorType}`} ref={cursor} />
      <div
        ref={cursor2}
        className={`${BigCursorCSS} ${
          _cursorType ? (_cursorType === CURSOR.LENS ? 'lens' : 'active') : ''
        }`}
      />
    </div>
  )
}
