import { create } from 'zustand'
import { IUser } from '../types'

interface IUserState {
  user: IUser | object | null
  setUser: (user: IUser) => void
}

export const useUserStore = create<IUserState>(set => ({
  user: null,
  setUser: user => {
    set({ user })
  },
}))
