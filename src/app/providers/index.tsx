'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query.providers'
import { SnackbarProvider } from 'notistack'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </QueryProvider>
  )
}
