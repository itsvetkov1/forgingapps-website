import type { MetadataRoute } from 'next'
import { blogPostsEn } from '@/lib/i18n/blog-posts-en'
import { blogPostsBg } from '@/lib/i18n/blog-posts-bg'

export const dynamic = 'force-static'

// English month abbreviations/names -> month number
const MONTHS_EN: Record<string, string> = {
  jan: '01', january: '01',
  feb: '02', february: '02',
  mar: '03', march: '03',
  apr: '04', april: '04',
  may: '05',
  jun: '06', june: '06',
  jul: '07', july: '07',
  aug: '08', august: '08',
  sep: '09', sept: '09', september: '09',
  oct: '10', october: '10',
  nov: '11', november: '11',
  dec: '12', december: '12',
}

// Bulgarian month names (full and short) -> month number
const MONTHS_BG: Record<string, string> = {
  'януари': '01', 'ян': '01',
  'февруари': '02', 'февр': '02',
  'март': '03',
  'април': '04', 'апр': '04',
  'май': '05',
  'юни': '06',
  'юли': '07',
  'август': '08',
  'септември': '09', 'септ': '09',
  'октомври': '10', 'окт': '10',
  'ноември': '11', 'ноем': '11',
  'декември': '12', 'дек': '12',
}

/**
 * Accepts any of:
 *   "Apr 13, 2026" / "April 13, 2026"
 *   "13 април 2026" / "13 апр. 2026"
 * Returns ISO date string ("YYYY-MM-DD") or null on failure.
 */
function toIsoDate(input: string | undefined | null): string | null {
  if (!input) return null
  const raw = input.trim().replace(/\./g, '').toLowerCase()

  // English: "apr 13, 2026"
  const en = /^([a-z]+)\s+(\d{1,2}),?\s+(\d{4})$/.exec(raw)
  if (en) {
    const [, monthName, day, year] = en
    if (monthName && day && year) {
      const m = MONTHS_EN[monthName]
      if (m) return `${year}-${m}-${day.padStart(2, '0')}`
    }
  }

  // Bulgarian: "13 април 2026"
  const bg = /^(\d{1,2})\s+([а-яё]+)\s+(\d{4})$/u.exec(raw)
  if (bg) {
    const [, day, monthName, year] = bg
    if (monthName && day && year) {
      const m = MONTHS_BG[monthName]
      if (m) return `${year}-${m}-${day.padStart(2, '0')}`
    }
  }

  return null
}

function resolveDate(slug: string, fallback: string): string {
  const en = blogPostsEn[slug]?.date
  const bg = blogPostsBg[slug]?.date
  return toIsoDate(en) ?? toIsoDate(bg) ?? fallback
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString().split('T')[0] ?? '1970-01-01'
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

  const enSlugs = Object.keys(blogPostsEn)
  const bgSlugs = Object.keys(blogPostsBg)

  const enBlogEntries = enSlugs.map((slug) => ({
    url: `${base}/en/blog/${slug}`,
    lastModified: resolveDate(slug, lastmod),
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const bgBlogEntries = bgSlugs.map((slug) => ({
    url: `${base}/bg/blog/${slug}`,
    lastModified: resolveDate(slug, lastmod),
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [...corePages, ...enBlogEntries, ...bgBlogEntries]
}
