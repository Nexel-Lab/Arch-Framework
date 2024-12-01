'use client'

// TODO: 2.1 - Setup global UI controllers

import { Initialize } from './initialize'
import { ThemeController } from './theme.controller'
// import { CursorController } from './cursor.controller'
// import { KeyboardController } from './keyboard.controller'

export const Controllers = () => {
  return (
    <>
      <Initialize />
      <ThemeController />
      {/* <CursorController /> */}
      {/* <KeyboardController /> */}
    </>
  )
}
