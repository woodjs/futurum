'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query.providers'
import AuthProvider from '../../shared/auth/auth-provider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  )
}
