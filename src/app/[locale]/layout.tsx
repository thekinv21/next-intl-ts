import { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Montserrat } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Nextjs Multi Language Starter',
	description: 'Nextjs Multi Language Starter with Tailwind CSS and TypeScript.'
}

const monserrat = Montserrat({ subsets: ['latin'] })

interface IRootLayoutProps {
	children: React.ReactNode
	params: { locale: string }
}

export default function RootLayout({
	children,
	params: { locale }
}: Readonly<IRootLayoutProps>) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = useMessages()

	return (
		<html lang={locale}>
			<body className={monserrat.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
