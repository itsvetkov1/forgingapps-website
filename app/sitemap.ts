import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString().split('T')[0]
  const base = 'https://forgingapps.com'

  return [
    { url: `${base}/`, lastModified: lastmod, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/services`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/ai-consulting`, lastModified: lastmod, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/about`, lastModified: lastmod, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/contact`, lastModified: lastmod, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/privacy`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/terms`, lastModified: lastmod, priority: 0.3, changeFrequency: 'yearly' },
  ]
}