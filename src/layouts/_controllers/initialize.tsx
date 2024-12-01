'use client'

import { useEffect } from 'react'
import { useAppState } from '@/store'
import Console from './initialize.console'

export const Initialize = () => {
  const _onAppInit = useAppState((st) => st.onAppInit)

  useEffect(() => {
    console.log(Console)
  }, [])

  useEffect(() => {
    _onAppInit()
  }, [_onAppInit])

  return null
}
