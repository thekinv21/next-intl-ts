import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export const useCustomGetTranslation = (key: string) => {
	const t = useTranslations(`${key}`)
	return useMemo(() => ({ t }), [t, key])
}
