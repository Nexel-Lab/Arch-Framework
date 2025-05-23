/* eslint-disable @typescript-eslint/no-explicit-any */

export {}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
  /**
   * @see https://stackoverflow.com/a/59774743
   */
  type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
    ...args: any
  ) => Promise<infer R>
    ? R
    : any

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

  type MixedObject = Record<string, any>
  type BaseEntity = { id: number | string } & MixedObject

  type CustomFile = {
    id?: number
    url: string
    previewUrl?: string
    onLoad?: () => void
    name?: string
    meta?: Record<string, unknown> | null
    file?: File
    height?: number | null
    width?: number | null
    hash?: string
    tags?: Array<{ id: number; name: string; isCategory: boolean }>
    // navigation properties
    uuid?: string
    status?: 'processing' | 'uploading' | 'complete' | 'blocked' | 'error'
    blockedFor?: string[]
    message?: string
  }

  type DeepNonNullable<T> = {
    [P in keyof T]-?: NonNullable<T[P]>
  } & NonNullable<T>

  // eslint-disable-next-line no-var, vars-on-top
  var navigation: { currentEntry: { index: number } }

  type TrackedFile = {
    file: File
    progress: number
    uploaded: number
    size: number
    speed: number
    timeRemaining: number
    name: string
    status:
      | 'pending'
      | 'error'
      | 'success'
      | 'uploading'
      | 'aborted'
      | 'blocked'
    abort: () => void
    uuid: string
    meta?: Record<string, unknown>
    id?: number
  }

  type ImageFormat = 'optimized' | 'metadata'

  type TypeCategory = {
    id: number
    name: string
    priority: number
    adminOnly: boolean
  }

  type UploadResult = { url: string; id: string }

  type ImageUploadResponse =
    | { id: string; uploadURL: string }
    | { error: string }
}