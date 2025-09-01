'use client'

// TODO: 2.1 - Setup global UI controllers

import { Initialize } from './Initialize'
import { ThemeController } from './ThemeController'
// import { KeyboardController } from './keyboard.controller'

export const Controllers = () => {
  return (
    <>
      <Initialize />
      <ThemeController />
      {/* <KeyboardController /> */}
    </>
  )
}
