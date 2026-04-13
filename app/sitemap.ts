import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const blogSlugs = [
  'ai-security-is-now-a-buying-issue',
  'voice-agents-just-got-useful',
  'why-forgingapps-ai',
  'how-to-choose-ai-consultant',
  'does-my-business-need-ai',
  'what-is-ai-consulting',
  'umlaut-secure-app-award',
  'why-we-started-forgingapps',
  'ai-for-small-business',
  'what-does-app-cost',
]

const blogPostDates: Record<string, string> = {
  'ai-security-is-now-a-buying-issue': '2026-04-13',
  'voice-agents-just-got-useful': '2026-04-06',
  'why-forgingapps-ai': '2026-04-05',
  'how-to-choose-ai-consultant': '2026-03-29',
  'does-my-business-need-ai': '2026-03-22',
  'what-is-ai-consulting': '2026-03-15',
  'umlaut-secure-app-award': '2026-02-27',
  'why-we-started-forgingapps': '2026-02-22',
  'ai-for-small-business': '2026-02-15',
  'what-does-app-cost': '2026-02-08',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString().split('T')[0]
  const base = 'https://forgingapps.com'

  const corePages = [
    { url: `${base}/`, lastModified: lastmod, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/en/`, lastModified: lastmod, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/bg/`, lastModified: lastmod, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/en/services`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/bg/services`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/en/ai-consulting`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/bg/ai-consulting`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/en/about`, lastModified: lastmod, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/bg/about`, lastModified: lastmod, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/en/contact`, lastModified: lastmod, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/bg/contact`, lastModified: lastmod, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/en/privacy`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/bg/privacy`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/en/terms`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/bg/terms`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/en/blog`, lastModified: lastmod, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/bg/blog`, lastModified: lastmod, priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  const blogEntries = blogSlugs.flatMap((slug) => [
    { url: `${base}/en/blog/${slug}`, lastModified: blogPostDates[slug] ?? lastmod, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/bg/blog/${slug}`, lastModified: blogPostDates[slug] ?? lastmod, priority: 0.6, changeFrequency: 'monthly' as const },
  ])

  return [...corePages, ...blogEntries]
}
