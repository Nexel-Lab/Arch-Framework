'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store'
import Console from './Initialize.console'

export const Initialize = () => {
  const _onAppInit = useAppStore((st) => st.onAppInit)

  useEffect(() => {
    console.log(Console)
  }, [])

  useEffect(() => {
    _onAppInit()
  }, [_onAppInit])

  return null
}
