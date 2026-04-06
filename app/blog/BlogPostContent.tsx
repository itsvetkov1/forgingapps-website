'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function BlogPostContent({ slug }: { slug: string }) {
  const { language } = useLanguage()
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
          <Link href="/blog" className="text-forge-gold hover:text-forge-ember transition mb-4 inline-block">← Back to Blog</Link>
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
      </div>
    </article>
  )
}
