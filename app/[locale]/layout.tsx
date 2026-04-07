import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Cinzel, Inter } from 'next/font/google'
import '../globals.css'
import StructuredData from '@/components/StructuredData'
import ConditionalShell from '@/components/ConditionalShell'
import EmberChatWidget from '@/components/ember/EmberChatWidget'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { isLocale, locales } from '@/lib/i18n/routing'

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://forgingapps.com'),
  robots: 'index, follow',
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-inter">
        <LanguageProvider locale={locale}>
          <ConditionalShell>{children}</ConditionalShell>
          <EmberChatWidget />
        </LanguageProvider>
      </body>
    </html>
  )
}
