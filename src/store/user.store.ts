import { create } from 'zustand'
import type { IUserState } from './userState'

export const useUserStore = create<IUserState>((set) => ({
  user: undefined,
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
      set(() => ({ user }))
      return true
    }
    return false
  },
  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (!user) {
        return undefined
      }
      return JSON.parse(user)
    }
    return undefined
  },
  resetData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('result')
      localStorage.removeItem('user')
    }
    return undefined
  },
  resetCookies: async () => {
    await fetch('/api/clear-auth', {
      method: 'POST',
    })
  },
}))
