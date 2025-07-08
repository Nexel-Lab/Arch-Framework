export enum MODAL {
  SEARCH = 'SEARCH',
  APP_INFO = 'APP_INFO',
  SETTINGS = 'SETTINGS',
  SOMETHING = 'SOMETHING',
}

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
  dark: boolean
  setDark: (dark: boolean) => void
  onToggleDark: () => void
  lang: LANG
  setLang: (lang: LANG) => void
  modal: MODAL | undefined
  onToggleModal: (modal: MODAL) => void
  onClearModal: () => void
  cursor: undefined | CURSOR
  setCursor: (cursor: undefined | CURSOR) => void
  showNav: boolean
  setShowNav: (show: boolean) => void
  showFooter: boolean
  setShowFooter: (show: boolean) => void
}
