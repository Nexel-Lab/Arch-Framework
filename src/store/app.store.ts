import { create } from 'zustand'
import type { IAppState } from './appState'

/** Global store is here **/

export const useAppState = create<IAppState>((set) => ({
  something: undefined,
  setSomething: (s) => set({ something: s }, false),
  onAppInit: async () => {
    // Initialize
  },
}))
