import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

import { localePrefix, locales, pathnames } from './config/next-intl.config'

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createLocalizedPathnamesNavigation({
		locales,
		pathnames,
		localePrefix
	})
