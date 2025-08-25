import { create } from 'zustand'
import type { IUiState } from './uiState'
import { LANG } from './uiState'

/** Global store is here **/
export const useUiStore = create<IUiState>((set, get) => ({
  isDark: true,
  setIsDark: (dark) => set(() => ({ isDark: dark })),
  onToggleIsDark: () => set({ isDark: !get().isDark }),
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
