import type { IAppState } from './appState'
import { create } from 'zustand'

/** Global store is here **/

export const useAppState = create<IAppState>((set) => ({
  something: undefined,
  setSomething: (s) => set({ something: s }, false),
  onAppInit: async () => {
    // Initialize
  },
}))
