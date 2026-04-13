'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

function BlogCTA({ category, language, localePath }: { category: string; language: string; localePath: (path: string) => string }) {
  const ctas: Record<string, { href: string; heading: string; body: string; cta: string }> = {
    AI: {
      href: localePath('/contact'),
      heading: language === 'bg' ? 'Готови ли сте за AI?' : 'Ready to add AI to your business?',
      body: language === 'bg'
        ? 'Помагаме на компании да идентифицират, проектират и внедряват AI решения, които реално работят. Запишете безплатна консултация.'
        : "We help businesses identify, design, and deploy AI systems that actually work. Book a free discovery call and see what's possible.",
      cta: language === 'bg' ? 'Запазете безплатен разговор →' : 'Book a free call →',
    },
    Security: {
      href: localePath('/contact'),
      heading: language === 'bg' ? 'Сигурността не е опция' : 'Security is non-negotiable',
      body: language === 'bg'
        ? 'ForgingApps е два пъти носител на umlaut Secure App Award. Вижте нашите удостоверения и подхода ни към сигурността.'
        : 'ForgingApps is a two-time umlaut Secure App Award winner. See our credentials and our approach to building secure software.',
      cta: language === 'bg' ? 'Запазете безплатен разговор →' : 'Book a free call →',
    },
    Business: {
      href: localePath('/contact'),
      heading: language === 'bg' ? 'Готови да изградим нещо заедно?' : 'Ready to build something?',
      body: language === 'bg'
        ? 'От малък уебсайт до сложна платформа — имаме пакет за всяко ниво. Вземете оферта без ангажимент.'
        : 'From a simple website to a complex platform — we have a package for every stage. Get a quote with no commitment required.',
      cta: language === 'bg' ? 'Запазете безплатен разговор →' : 'Book a free call →',
    },
  }

  const config = (ctas[category] ?? ctas['Business']) as { href: string; heading: string; body: string; cta: string }

  return (
    <div className="mt-16 border border-forge-gold/30 bg-forge-gold/5 rounded-lg p-8">
      <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">{config.heading}</h3>
      <p className="text-gray-300 mb-6">{config.body}</p>
      <Link
        href={config.href}
        className="inline-block bg-forge-gold text-forge-dark font-semibold px-6 py-3 rounded hover:bg-forge-ember transition"
      >
        {config.cta}
      </Link>
    </div>
  )
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const { language, localePath } = useLanguage()
  const post = translations[language].blogPosts[slug]

  if (!post) {
    return (
      <div className="bg-forge-dark min-h-screen section-py">
        <div className="container-custom max-w-3xl">
          <p className="text-gray-300">Post not found.</p>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        <div className="mb-12">
          <Link href={localePath('/blog')} className="text-forge-gold hover:text-forge-ember transition mb-4 inline-block">← Back to Blog</Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-semibold text-forge-ember bg-forge-ember/10 px-2 py-1 rounded">{post.category}</span>
            <span className="text-sm text-gray-400">{post.date}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-400">{post.intro}</p>
          <p className="text-sm text-gray-500 mt-4">{post.author}</p>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {post.sections.map((section: any) => (
              <div key={section.heading}>
                <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-forge-ember/20 pt-8 text-sm text-gray-400">
          <p>
            {language === 'bg' ? 'Искате да обсъдим как това се отнася до Вашия бизнес?' : 'Want to discuss how this applies to your business?'}{' '}
            <Link href={localePath('/contact')} className="text-forge-gold hover:text-forge-ember transition underline underline-offset-4">
              {language === 'bg' ? 'Запазете безплатен разговор.' : 'Book a free call.'}
            </Link>
          </p>
        </div>

        <BlogCTA category={post.category} language={language} localePath={localePath} />
      </div>
    </article>
  )
}
