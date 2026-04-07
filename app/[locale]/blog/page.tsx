import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogContent from '@/app/blog/BlogContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].blog
  return { title: `${data.heading} | ForgingApps`, description: data.subheadline, alternates: buildLocaleAlternates(locale, '/blog'), openGraph: buildOg(`/${locale}/blog`, `${data.heading} | ForgingApps`, data.subheadline) }
}

export default async function LocaleBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <BlogContent />
}
