import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/app/blog/BlogPostContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale, locales } from '@/lib/i18n/routing'

const slugs = Object.keys(translations.en.blogPosts)

export function generateStaticParams() {
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = translations[locale].blogPosts[slug]
  if (!post) return {}
  return {
    title: `${post.title} | ForgingApps Blog`,
    description: post.metaDescription ?? post.intro,
    alternates: buildLocaleAlternates(locale, `/blog/${slug}`),
    openGraph: buildOg(`/${locale}/blog/${slug}`, `${post.title} | ForgingApps Blog`, post.metaDescription ?? post.intro),
    twitter: buildTwitterCard(`${post.title} | ForgingApps Blog`, post.metaDescription ?? post.intro),
  }
}

export default async function LocaleBlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !translations.en.blogPosts[slug]) notFound()

  const post = translations[locale].blogPosts[slug]
  const canonicalPost = translations.en.blogPosts[slug]
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription ?? post.intro,
    datePublished: new Date(canonicalPost.date).toISOString(),
    author: {
      '@type': 'Person',
      name: String(post.author).split(',')[0],
    },
    publisher: {
      '@type': 'Organization',
      name: 'ForgingApps',
      logo: {
        '@type': 'ImageObject',
        url: 'https://forgingapps.com/logo.svg',
      },
    },
    mainEntityOfPage: `https://forgingapps.com/${locale}/blog/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostContent slug={slug} />
    </>
  )
}
