import Link from 'next/link'
import { BookOpen, Bot, TrendingUp } from 'lucide-react'
import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'From the Forge -- AI & App Development Blog | ForgingApps',
  description: 'Insights on AI for business, app development costs, and building products that last. By the team at ForgingApps.',
  alternates: {
    canonical: 'https://forgingapps.com/blog',
  },
  openGraph: {
    title: 'From the Forge -- AI & App Development Blog | ForgingApps',
    description: 'Insights on AI for business, app development costs, and building products that last.',
    url: 'https://forgingapps.com/blog',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Blog' }],
  },
}

export default function Blog() {
  const posts = [
    {
      slug: 'why-we-started-forgingapps',
      title: 'Why We Started ForgingApps',
      excerpt: 'Two senior developers walk out of the enterprise forge. This is why -- and what we\'re building instead.',
      date: 'Feb 22, 2026',
      readTime: '4 min',
      category: 'Business',
      image: 'bookopen',
    },
    {
      slug: 'ai-for-small-business',
      title: 'AI for Small Business: Where to Start in 2026',
      excerpt: 'You\'ve heard the hype. Here\'s what AI actually does for businesses your size -- and what to try first.',
      date: 'Feb 15, 2026',
      readTime: '6 min',
      category: 'AI',
      image: 'bot',
    },
    {
      slug: 'what-does-app-cost',
      title: 'What Does an App Really Cost in 2026?',
      excerpt: 'The real numbers. No fluff. A transparent breakdown of app development pricing in Bulgaria and beyond.',
      date: 'Feb 8, 2026',
      readTime: '7 min',
      category: 'Business',
      image: 'trending',
    },
  ]

  return (
    <>
      <Hero
        headline="From the Forge"
        subheadline="Insights on AI, app development, and building products that last."
        size="small"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden card-hover transition-all h-full flex flex-col">
                  {/* Featured Image */}
                  <div className="bg-gradient-to-b from-forge-ember/20 to-transparent h-40 flex items-center justify-center group-hover:from-forge-ember/40 transition text-forge-gold">
                    {post.image === 'bookopen' ? <BookOpen size={60} /> : post.image === 'bot' ? <Bot size={60} /> : <TrendingUp size={60} />}
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-forge-ember bg-forge-ember/10 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-cinzel text-xl font-bold text-forge-gold mb-3 group-hover:text-forge-ember transition">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Read Time & Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-forge-ember/20">
                      <span className="text-xs text-gray-500">{post.readTime} read</span>
                      <span className="text-forge-gold group-hover:text-forge-ember transition">Read →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="text-center">
            <p className="text-gray-400 text-lg">More articles coming soon. Check back for insights on app development, AI, and building products that last.</p>
          </div>
        </div>
      </section>
    </>
  )
}
