import type { TModal } from './uiState.modal'

export enum CURSOR {
  LOGO = 'logo',
  POINTER = 'pointer',
  GO = 'go',
  EXPANSE = 'expanse',
  LENS = 'lens',
}

export enum LANG {
  EN = 'EN',
  TH = 'TH',
  CN = 'CN',
}

export interface IUiState {
  isDark: boolean
  setIsDark: (dark: boolean) => void
  onToggleIsDark: () => void
  lang: LANG
  setLang: (lang: LANG) => void
  modal: TModal | undefined
  onToggleModal: (modal: TModal | undefined) => void
  onClearModal: () => void
  pauseOnClearModal: boolean
  setPauseOnClearModal: (pause: boolean) => void
  triggerPauseOnClearModal: () => void
  cursor: undefined | CURSOR
  setCursor: (cursor: undefined | CURSOR) => void
  showNav: boolean
  setShowNav: (show: boolean) => void
  showFooter: boolean
  setShowFooter: (show: boolean) => void
}
