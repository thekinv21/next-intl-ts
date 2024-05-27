# Nextjs Multi Language: next-intl

Multi-language selection with Nextjs

## Documentation

- [Go to official page](https://next-intl-docs.vercel.app/)
- [You can review the Examples here](https://next-intl-example-app-router.vercel.app/en)

## Installation

```bash
  npm install next-intl
```

```bash
  pnpm install next-intl
```

```bash
  yarn add next-intl
```

#### For app router

- [With i18n app router example](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)

- [Without i18n app router example](https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing)

#### My File Stracture

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

#### 1.STEP: create languages translate files

```bash
  1.step: create Messages folder on your root application
```

```bash
  2.step: Create JSON files of the languages you want to translate into Messages file
```

Example:

```bash
 messages:
        en.json
        tr.json
```

messages/en.json

```bash

{
	"Index_page": {
		"title": "Hello index page!",
		"tr": "Turkish",
		"en": "English",
		"label": "Language",
		"next_intl_multiple_languages": "Next.js with Internationalization and Multiple Languages",
		"next_intl_multiple_languages_description": "This is a simple example of how to use Next.js with Internationalization and Multiple Languages.",
		"learn": "Learn",
		"learn_description": "Learn how to use Next.js with Internationalization and Multiple Languages.",
		"templates": "Templates",
		"templates_description": "Use templates to create your own Next.js with Internationalization and Multiple Languages.",
		"deploy": "Deploy",
		"deploy_description": "Deploy your Next.js with Internationalization and Multiple Languages to the cloud."
	},

	"about_page": {
		"title": "Hello about page!"
	},

	"contact_page": {
		"title": "Hello contact page!"
	}
}



```

messages/tr.json

```bash

{
	"Index_page": {
		"title": "Merhaba başlangıç sayfası!",
		"tr": "Türkçe",
		"en": "İngilizce",
		"label": "Dil",
		"next_intl_multiple_languages": "NextJs ile Çoklu dil desteği",
		"next_intl_multiple_languages_description": "Bu örnek NextJs ile çoklu dil desteğini göstermektedir.",
		"learn": "Öğren",
		"learn_description": "Öğrenme kaynaklarına göz atın ve Next.js ile Çoklu dil desteği hakkında daha fazla bilgi edinin.",
		"templates": "Şablonlar",
		"templates_description": "Next.js ile Çoklu dil desteği için hazır şablonları inceleyin ve kullanmaya başlayın.",
		"deploy": "Yayınlama",
		"deploy_description": "Next.js ile Çoklu dil desteği uygulamanızı yayınlayın ve dünyanın her yerinden erişilebilir hale getirin."
	},

	"about_page": {
		"title": "Merhaba hakkımızda sayfası!"
	},

	"contact_page": {
		"title": "Merhaba iletişim sayfası!"
	}
}

```

`It is important to create custom translations for each page, operations such as collecting all translations in a single json can be done, but it is illogical.`

#### 2.STEP: Create next-intl config inside `next.config.mjs` or `next.config.js`

```bash

  import createNextIntlPlugin from 'next-intl/plugin';

  const withNextIntl = createNextIntlPlugin();

  /** @type {import('next').NextConfig} */

  const nextConfig = {};

  export default withNextIntl(nextConfig);

```

#### 3.STEP: Create `i18n.ts` folder inside src root (`İMPORTANT`)

```bash

  import {notFound} from 'next/navigation';
  import {getRequestConfig} from 'next-intl/server';

  // Can be imported from a shared config
  const locales = ['en', 'tr'];

  export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
      messages: (await import(`../messages/${locale}.json`)).default
    };
  });

```

#### 4.STEP: Create `middleware.ts` folder inside src root (`İMPORTANT`)

```bash

  import createMiddleware from 'next-intl/middleware';

  export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'tr'],

    // Used when no locale matches
    defaultLocale: 'en'
  });

  export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(tr|en)/:path*']
  };

```

#### 5.STEP: Create `app/[locale]/layout.tsx` folders (`İMPORTANT`)

app/[locale]/layout.tsx

```bash

    import { Metadata } from 'next'
    import { NextIntlClientProvider } from 'next-intl'
    import { getMessages } from 'next-intl/server'

    export const metadata: Metadata = {
      title: 'Nextjs Multi Language Starter',
      description: 'Nextjs Multi Language Starter with Tailwind CSS and TypeScript.'
    }

    export default async function LocaleLayout({
      children,
      params: { locale }
    }: {
      children: React.ReactNode
      params: { locale: string }
    }) {
      // Providing all messages to the client
      // side is the easiest way to get started
      const messages = await getMessages()

      return (
        <html lang={locale}>
          <body>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </body>
        </html>
      )
    }

```

#### 6.STEP: Create `app/[locale]/page.tsx` folder (`İMPORTANT`)

app/[locale]/page.tsx

```bash

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


```

app/layout.tsx

```bash

  import '../style/globals.css'

  export default function RootLayout({
    children
  }: Readonly<{
      children: React.ReactNode
  }>) {
    return children
  }


```

app/page.tsx

```bash

  import { redirect } from 'next/navigation'

  export default function RootPage() {
    redirect('/en')
  }



```

`We have 2 layout.tsx and 2 page.tsx folders, 1.layout.tsx and 1.page.tsx folders inside [locale] folder another 2.layout.tsx and 2.page.tsx outside [locale] folder it is very important if you don't create outside or inside this layout and page folders, translation package next-intl is not working on our project`

#### START PROJECT : `npm run dev || yarn run dev || pnpm run dev`

if you complete code correctly for documentation you will see this screens and NEXT_LOCALE variable on Cookies who will save default selected Language:

#### Overview : `if your default language is English you will see that screen: `

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

#### Overview : `if your default language is Turkish you will see that screen: `

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

#### 7.STEP : CREATE Locale Switcher Component and Custom Hook for get Translations

hooks/useCustomGetTranslation.ts

```bash

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export const useCustomGetTranslation = (key: string) => {
	const t = useTranslations(`${key}`)
	return useMemo(() => ({ t }), [t, key])
}



```

components/ui/locale-switcher/index.tsx

```bash

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


```

components/ui/locale-switcher/LocaleSwitcherSelect.tsx

```bash

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

```

#### 8.STEP : Add Custom Not Found Page `404 page`

if you wanna add custom not found page with Next-Intl first you need add `navigation.ts` and `next-intl.config.ts` inside on root src and modify your `middleware.ts` folder

/src/config/next-intl.config.ts

```bash

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


```

/src/navigation.ts

```bash

  import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

  import { localePrefix, locales, pathnames } from './config/next-intl.config'

  export const { Link, getPathname, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation({
      locales,
      pathnames,
      localePrefix
    })


```

/src/middleware.ts

```bash

  import createMiddleware from 'next-intl/middleware'

  import {
    defaultLocale,
    localePrefix,
    locales,
    pathnames
  } from './config/next-intl.config'

  export default createMiddleware({
    defaultLocale,
    locales,
    pathnames,
    localePrefix
  })

  export const config = {
    matcher: [
      // Enable a redirect to a matching locale at the root
      '/',

      // Set a cookie to remember the previous locale for
      // all requests that have a locale prefix
      '/(tr|en)/:path*',

      // Enable redirects that add missing locales
      // (e.g. `/pathnames` -> `/en/pathnames`)
      '/((?!_next|_vercel|.*\\..*).*)'
    ]
  }



```

After this steps you need add `[...rest]` folder inside `app/[locale]/[...rest]/page.tsx` file and `app/[locale]/not-found.tsx` inside [locale] folder AND `/app/_not-found.tsx` on outside [locale] folder

app/[locale]/[...rest]/page.tsx

```bash

  import { notFound } from 'next/navigation'

  export default function CatchAllPage() {
    notFound()
  }



```

/app/[locale]/not-found.tsx

```bash

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



```

/app/\_not-found.tsx

```bash

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


```

/src/screens/error/notfound.tsx

```bash

 'use client'

  export function CustomNotFound() {
    return (
      <div className='flex h-screen w-full items-center justify-center text-white'>
        <h1 className='text-4xl font-bold text-white'>404 - Not Found</h1>
      </div>
    )
  }


```

It is very important Steps for create CUSTOM Not found Page if you pass any steps your project gives SSR errors
