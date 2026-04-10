'use client'

import Link from 'next/link'
import { BookOpen, Bot, TrendingUp, Shield, Brain, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

const postKeyMap: Record<string, string> = {
  'voice-agents-just-got-useful': 'voiceAgents',
  'why-forgingapps-ai': 'whyForgingappsAi',
  'how-to-choose-ai-consultant': 'chooseConsultant',
  'does-my-business-need-ai': 'doesMyBusiness',
  'what-is-ai-consulting': 'whatIsAiConsulting',
  'umlaut-secure-app-award': 'umlautAward',
  'why-we-started-forgingapps': 'whyWeStarted',
  'ai-for-small-business': 'aiSmallBusiness',
  'what-does-app-cost': 'appCost',
  'local-studio-vs-freelancer': 'localStudioVsFreelancer',
  'custom-software-vs-off-the-shelf': 'customVsOffTheShelf',
}

const posts = [
  { slug: 'local-studio-vs-freelancer', date: 'Apr 10, 2026', readTime: '6 min', category: 'business', image: 'bookopen', authorKey: 'authorRadoslav' },
  { slug: 'custom-software-vs-off-the-shelf', date: 'Apr 8, 2026', readTime: '7 min', category: 'business', image: 'trending', authorKey: 'authorIvaylo' },
  { slug: 'voice-agents-just-got-useful', date: 'Apr 6, 2026', readTime: '6 min', category: 'ai', image: 'bot', authorKey: 'authorIvaylo' },
  { slug: 'why-forgingapps-ai', date: 'Apr 5, 2026', readTime: '5 min', category: 'ai', image: 'zap', authorKey: 'authorIvaylo' },
  { slug: 'how-to-choose-ai-consultant', date: 'Mar 29, 2026', readTime: '7 min', category: 'ai', image: 'shield', authorKey: 'authorIvaylo' },
  { slug: 'does-my-business-need-ai', date: 'Mar 22, 2026', readTime: '6 min', category: 'ai', image: 'trending', authorKey: 'authorIvaylo' },
  { slug: 'what-is-ai-consulting', date: 'Mar 15, 2026', readTime: '5 min', category: 'ai', image: 'brain', authorKey: 'authorIvaylo' },
  { slug: 'umlaut-secure-app-award', date: 'Feb 27, 2026', readTime: '5 min', category: 'security', image: 'shield', authorKey: 'authorRadoslav' },
  { slug: 'why-we-started-forgingapps', date: 'Feb 22, 2026', readTime: '4 min', category: 'business', image: 'bookopen', authorKey: 'authorRadoslav' },
  { slug: 'ai-for-small-business', date: 'Feb 15, 2026', readTime: '6 min', category: 'ai', image: 'bot', authorKey: 'authorRadoslav' },
  { slug: 'what-does-app-cost', date: 'Feb 8, 2026', readTime: '7 min', category: 'business', image: 'trending', authorKey: 'authorRadoslav' },
]

function renderIcon(image: string) {
  if (image === 'brain') return <Brain size={60} />
  if (image === 'zap') return <Zap size={60} />
  if (image === 'bookopen') return <BookOpen size={60} />
  if (image === 'bot') return <Bot size={60} />
  if (image === 'shield') return <Shield size={60} />
  return <TrendingUp size={60} />
}

export default function BlogContent() {
  const { language, localePath } = useLanguage()
  const blog = translations[language].blog
  const blogPosts = translations[language].blogPosts
  const blogPostMeta = (blog.posts as Record<string, any>)

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-3xl text-center">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{blog.heading}</h1>
          <p className="text-xl text-gray-300">{blog.subheadline}</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const postData = blogPosts[post.slug]
              const postMeta = blogPostMeta[(postKeyMap as Record<string,string>)[post.slug] ?? '']
              return (
                <Link key={post.slug} href={localePath(`/blog/${post.slug}`)} className="group bg-forge-stone border border-forge-ember/20 rounded-xl overflow-hidden hover:border-forge-gold/40 transition block">
                  <div className="h-40 bg-forge-dark text-forge-gold flex items-center justify-center">{renderIcon(post.image)}</div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="px-2 py-1 rounded bg-forge-ember/10 text-forge-ember">{blog.categories[post.category]}</span>
                      <span>{postData.date}</span>
                      <span>•</span>
                      <span>{postData.readTime}</span>
                    </div>
                    <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-3 group-hover:text-forge-ember transition">{postData.title}</h2>
                    <p className="text-gray-400 mb-4">{postMeta?.description}</p>
                    <p className="text-sm text-gray-500">{blog[post.authorKey]}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
