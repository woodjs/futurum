'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query.providers'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>
}
