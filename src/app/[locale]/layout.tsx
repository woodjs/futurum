import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { getTranslations } from 'next-intl/server'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import './globals.css'
import { AppProvider } from '../providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FUTURUM',
  description: 'Futurum - платформа для инвестирования в будущее',
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()
  return (
    <html lang={params?.locale || 'en'}>
      <head>
        {/* favicon */}
        <link rel='icon' href='/images/favicon.ico' />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider
          locale={params?.locale || 'en'}
          messages={messages}
        >
          <AppProvider>{children}</AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
