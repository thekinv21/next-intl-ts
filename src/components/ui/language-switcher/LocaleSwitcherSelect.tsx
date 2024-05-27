'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'

import { usePathname, useRouter } from '@/navigation'

interface ILocaleSwitcherSelect {
	children: ReactNode
	defaultValue: string
	label: string
}

export function LocaleSwitcherSelect({
	children,
	defaultValue,
	label
}: ILocaleSwitcherSelect) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale }
			)
		})
	}

	return (
		<label
			className={clsx(
				'relative inline-flex cursor-pointer items-center gap-2 border-none outline-none',
				isPending && 'transition-opacity  [&:disabled]:opacity-30'
			)}
		>
			<p className='sr-only'>{label}</p>
			<select
				className='inline-flex appearance-none border-none bg-transparent py-3 pl-2 pr-6 outline-none'
				defaultValue={defaultValue}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
			<span className='pointer-events-none absolute right-2 top-[8px]'>⌄</span>
		</label>
	)
}
