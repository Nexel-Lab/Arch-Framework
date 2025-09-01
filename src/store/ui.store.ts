import { create } from 'zustand'
import type { IUiState } from './uiState'
import { LANG } from './uiState'

let pauseOnClearModalTimeout: ReturnType<typeof setTimeout> | null = null

/** Global store is here **/
export const useUiStore = create<IUiState>((set, get) => ({
  isDark: true,
  setIsDark: (dark) => set(() => ({ isDark: dark })),
  onToggleIsDark: () => set({ isDark: !get().isDark }),
  lang: LANG.TH,
  setLang: (lang) => set({ lang: lang }),
  modal: undefined,
  onToggleModal: (modal) =>
    set(({ modal: prevModal }) => ({
      modal: prevModal?.modal === modal?.modal ? undefined : modal,
    })),
  onClearModal: () => {
    set(({ pauseOnClearModal }) => {
      if (pauseOnClearModal) return {}
      return { modal: undefined }
    })
  },
  pauseOnClearModal: false,
  setPauseOnClearModal: (pause) => set({ pauseOnClearModal: pause }),
  triggerPauseOnClearModal: () => {
    if (pauseOnClearModalTimeout) {
      clearTimeout(pauseOnClearModalTimeout)
    }
    set({ pauseOnClearModal: true })
    pauseOnClearModalTimeout = setTimeout(() => {
      set({ pauseOnClearModal: false })
      pauseOnClearModalTimeout = null
    }, 300)
  },
  cursor: undefined,
  setCursor: (cursor) => set(() => ({ cursor: cursor })),
  showNav: true,
  setShowNav: (show) => set(() => ({ showNav: show })),
  showFooter: true,
  setShowFooter: (show) => set(() => ({ showFooter: show })),
}))
