import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Montserrat } from 'next/font/google'

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s | Next-Intl Multiple Languages',
		default: 'Next-Intl Multiple Languages'
	},
	description:
		"Next-Intl is a Next.js template that's pre-configured with multiple languages and dark mode. It's built with Tailwind CSS, TypeScript, and ESLint."
}

interface IRootLayoutProps {
	children: React.ReactNode
	params: { locale: string }
}

export default function RootLayout({
	children,
	params: { locale }
}: Readonly<IRootLayoutProps>) {
	const messages = useMessages()

	return (
		<html lang={locale}>
			<link rel='icon' href='/image/favicon.ico' sizes='any' />
			<body className={monserrat.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
