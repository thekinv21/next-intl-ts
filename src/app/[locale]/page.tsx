import type { Metadata } from 'next'

import { Home } from '@/screens/home'

export const metadata: Metadata = {
	title: 'Home',
	description:
		'Welcome to your new internationalized app! Get started by editing src/app/page.tsx.'
}

export default function Page() {
	return <Home />
}
