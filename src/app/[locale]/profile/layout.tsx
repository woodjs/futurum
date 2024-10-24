import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import './../globals.css'
import { Sidebar } from '@/widgets/sidebar'
import { Container } from '@/shared/ui'
import Menu from '@/screens/main/header/Menu'
import Footer from '@/screens/main/footer'
import { Header } from '@/widgets/header'
import AuthProvider from '../../../shared/auth/auth-provider'

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
          <AuthProvider>
            <Menu />
            <Header />
            <Container className='flex'>
              <div className='hidden xl:block'>
                <Sidebar />
              </div>
              <div className='w-full'>{children}</div>
            </Container>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
