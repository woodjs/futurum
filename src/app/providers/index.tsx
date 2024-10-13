'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query.providers'
import { SnackbarProvider } from 'notistack'
import AuthProvider from '../../shared/auth/auth-provider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <SnackbarProvider />
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  )
}
