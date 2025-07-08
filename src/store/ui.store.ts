import type { IUiState } from './uiState'
import { create } from 'zustand'
import { LANG } from './uiState'

/** Global store is here **/
export const useUiState = create<IUiState>((set, get) => ({
  dark: true,
  setDark: (dark) => set(() => ({ dark: dark })),
  onToggleDark: () => set({ dark: !get().dark }),
  lang: LANG.TH,
  setLang: (lang) => set({ lang: lang }),
  modal: undefined,
  onToggleModal: (modal) =>
    set({
      modal: get().modal === modal ? undefined : modal,
    }),
  onClearModal: () => set({ modal: undefined }),
  cursor: undefined,
  setCursor: (cursor) => set(() => ({ cursor: cursor })),
  showNav: true,
  setShowNav: (show) => set(() => ({ showNav: show })),
  showFooter: true,
  setShowFooter: (show) => set(() => ({ showFooter: show })),
}))
