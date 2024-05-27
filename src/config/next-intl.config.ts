import { Pathnames } from 'next-intl/navigation'

export const port = process.env.PORT || 3000
export const host = process.env.VERCEL_URL || `http://localhost:${port}`

export const defaultLocale = 'en' as const
export const locales = ['en', 'tr'] as const

export const pathnames = {
	'/': '/',
	'/about': {
		en: '/about',
		tr: '/hakkimizda'
	},
	'/contact': {
		en: '/contact',
		tr: '/iletisim'
	}
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
