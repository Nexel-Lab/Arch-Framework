export interface User {
  email: string
}

export interface UserState {
  user: User | undefined
  setUser: (u: User) => boolean
  getUser: () => User | undefined
  resetData: () => void
  resetCookies: () => Promise<void>
}
