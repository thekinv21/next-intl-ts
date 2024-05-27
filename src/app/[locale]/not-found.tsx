'use client'

import { Metadata } from 'next'

import { CustomNotFound } from '@/screens/error/notfound'

export const metadata: Metadata = {
	title: '404 - Not Found',
	description: ''
}

export default function NotFound() {
	return <CustomNotFound />
}
