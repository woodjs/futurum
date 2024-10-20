import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import '../../globals.css'
import { AppProvider } from '../../../providers'
import { getMessages } from 'next-intl/server'
import { Container } from '@/shared/ui'
import Footer from '@/screens/main/footer'
import Menu from '@/screens/main/header/Menu'
import { Header } from '@/widgets/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FUTURUM',
  description: 'Futurum - платформа для инвестирования в будущее',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()
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
          <Menu />
          <Header />
          <Container className='min-h-screen'>{children}</Container>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
