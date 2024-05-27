import { useLocale } from 'next-intl'

import { locales } from '@/config/next-intl.config'

import { useCustomGetTranslation } from '@/hooks/useCustomGetTranslation'

import { LocaleSwitcherSelect } from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
	const { t } = useCustomGetTranslation('Index_page')

	const locale = useLocale()

	return (
		<section className='flex items-center gap-1'>
			<LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
				{locales.map(cur => (
					<option className='bg-gray-700' key={cur} value={cur}>
						{cur.toUpperCase()}
					</option>
				))}
			</LocaleSwitcherSelect>
		</section>
	)
}
