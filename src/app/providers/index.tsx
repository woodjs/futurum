'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query.providers'
import { SnackbarProvider } from 'notistack'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
        {children}
      </SnackbarProvider>
    </QueryProvider>
  )
}
