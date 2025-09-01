export interface IUser {
  email: string
}

export interface IUserState {
  user: IUser | undefined
  setUser: (u: IUser) => boolean
  getUser: () => IUser | undefined
  resetData: () => void
  resetCookies: () => Promise<void>
}
