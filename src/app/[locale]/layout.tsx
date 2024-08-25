import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'FUTURUM',
	description: 'Futurum - платформа для инвестирования в будущее',
};

export default function RootLayout({
	children, 
	params: { locale } 
}: Readonly<{
	children: React.ReactNode;
	params: object,
}>) {
	const messages = useMessages();
	return (
		<html lang={locale}>
			<head>
				{/* favicon */}
				<link rel="icon" href="/images/favicon.ico" />
			</head>
			<body className={inter.className}>
			  <NextIntlClientProvider locale={locale} messages={messages}>
				{children}
				</NextIntlClientProvider>
				</body>
		</html>
	);
}
