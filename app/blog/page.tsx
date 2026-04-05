import Link from 'next/link'
import { BookOpen, Bot, TrendingUp, Shield, Brain, Zap } from 'lucide-react'
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
      slug: 'why-forgingapps-ai',
      title: 'Why ForgingApps for AI Consulting',
      excerpt: 'Who we are, how we work, what we actually build, and why clients choose a small senior team over bloated process and vague AI promises.',
      date: 'Apr 5, 2026',
      readTime: '5 min',
      category: 'AI',
      image: 'zap',
      author: 'Ivaylo Tsvetkov',
      authorRole: 'Co-Founder',
    },
    {
      slug: 'how-to-choose-ai-consultant',
      title: 'How to Choose an AI Consulting Partner (Without Getting Burned)',
      excerpt: 'The AI consulting market is full of noise. Here is how to separate people who build useful systems from people who just sell the idea of AI.',
      date: 'Mar 29, 2026',
      readTime: '7 min',
      category: 'AI',
      image: 'shield',
      author: 'Ivaylo Tsvetkov',
      authorRole: 'Co-Founder',
    },
    {
      slug: 'does-my-business-need-ai',
      title: 'Does My Business Need AI? An Honest Checklist',
      excerpt: 'Not every business needs AI. Some need a better process. Some need a spreadsheet. Some are leaving serious leverage on the table.',
      date: 'Mar 22, 2026',
      readTime: '6 min',
      category: 'AI',
      image: 'trending',
      author: 'Ivaylo Tsvetkov',
      authorRole: 'Co-Founder',
    },
    {
      slug: 'what-is-ai-consulting',
      title: 'What Is AI Consulting? (And What It Isn\'t)',
      excerpt: 'Most people hear AI consulting and picture overpriced slide decks or a chatbot with a logo on it. The reality is more useful than either.',
      date: 'Mar 15, 2026',
      readTime: '5 min',
      category: 'AI',
      image: 'brain',
      author: 'Ivaylo Tsvetkov',
      authorRole: 'Co-Founder',
    },
    {
      slug: 'umlaut-secure-app-award',
      title: 'How We Won the umlaut Secure App Award -- Twice',
      excerpt: "What it takes to pass umlaut's security certification, why most apps fail, and what it means when your developer has done it twice.",
      date: 'Feb 27, 2026',
      readTime: '5 min',
      category: 'Security',
      image: 'shield',
      author: 'Radoslav Stanev',
      authorRole: 'Founder & Lead Developer',
    },
    {
      slug: 'why-we-started-forgingapps',
      title: 'Why We Started ForgingApps',
      excerpt: "Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.",
      date: 'Feb 22, 2026',
      readTime: '4 min',
      category: 'Business',
      image: 'bookopen',
      author: 'Radoslav Stanev',
      authorRole: 'Founder & Lead Developer',
    },
    {
      slug: 'ai-for-small-business',
      title: 'AI for Small Business: Where to Start in 2026',
      excerpt: "You've heard the hype. Here's what AI actually does for businesses your size -- and what to try first.",
      date: 'Feb 15, 2026',
      readTime: '6 min',
      category: 'AI',
      image: 'bot',
      author: 'Radoslav Stanev',
      authorRole: 'Founder & Lead Developer',
    },
    {
      slug: 'what-does-app-cost',
      title: 'What Does an App Really Cost in 2026?',
      excerpt: 'The real numbers. No fluff. A transparent breakdown of app development pricing in Bulgaria and beyond.',
      date: 'Feb 8, 2026',
      readTime: '7 min',
      category: 'Business',
      image: 'trending',
      author: 'Radoslav Stanev',
      authorRole: 'Founder & Lead Developer',
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

          {/* Email Capture */}
          <div className="bg-gradient-to-r from-forge-ember/20 to-forge-gold/10 border border-forge-ember/40 rounded-lg p-8 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">Stay in the loop</h2>
              <p className="text-gray-400 mb-6">Get new articles on AI, app development, and building products that last. No spam. Unsubscribe anytime.</p>
              <form
                className="flex flex-col sm:flex-row gap-4 justify-center"
                action="#"
                method="POST"
              >
                <input
                  type="email"
                  placeholder="your.name@company.com"
                  required
                  className="flex-1 sm:max-w-sm bg-forge-dark border border-forge-ember/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forge-gold transition placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-500 text-xs mt-3">
                {/* TODO: Hook up to email provider when ready */}
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden card-hover transition-all h-full flex flex-col">
                  {/* Featured Image */}
                  <div className="bg-gradient-to-b from-forge-ember/20 to-transparent h-40 flex items-center justify-center group-hover:from-forge-ember/40 transition text-forge-gold">
                    {post.image === 'brain' ? <Brain size={60} /> : post.image === 'zap' ? <Zap size={60} /> : post.image === 'bookopen' ? <BookOpen size={60} /> : post.image === 'bot' ? <Bot size={60} /> : post.image === 'shield' ? <Shield size={60} /> : <TrendingUp size={60} />}
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

                    {/* Author */}
                    <div className="pt-4 border-t border-forge-ember/20">
                      <p className="text-xs text-gray-500 mb-1">By {post.author}, {post.authorRole}</p>
                    </div>

                    {/* Read Time & Link */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{post.readTime} read</span>
                      <span className="text-forge-gold group-hover:text-forge-ember transition">Read →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
