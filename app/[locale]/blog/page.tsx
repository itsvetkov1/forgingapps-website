import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogContent from '@/app/blog/BlogContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].blog
  const title = `${data.heading} | ForgingApps`
    const description = data.subheadline
    return { title, description, alternates: buildLocaleAlternates(locale, '/blog'), openGraph: buildOg(`/${locale}/blog`, `${data.heading} | ForgingApps`, data.subheadline), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <BlogContent />
}
