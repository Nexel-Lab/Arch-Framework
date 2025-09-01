export interface IAppState {
  something: string | undefined
  setSomething: (s: string | undefined) => void
  onAppInit: () => Promise<void>
}
