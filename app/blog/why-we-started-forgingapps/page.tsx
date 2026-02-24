import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why We Started ForgingApps | ForgingApps Blog',
  description: "Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.",
  alternates: {
    canonical: 'https://forgingapps.com/blog/why-we-started-forgingapps',
  },
  openGraph: {
    title: 'Why We Started ForgingApps | ForgingApps Blog',
    description: "Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.",
    url: 'https://forgingapps.com/blog/why-we-started-forgingapps',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Why We Started ForgingApps' }],
  },
}

export default function BlogPost() {
  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="text-forge-gold hover:text-forge-ember transition mb-4 inline-block">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-semibold text-forge-ember bg-forge-ember/10 px-2 py-1 rounded">Business</span>
            <span className="text-sm text-gray-400">Feb 22, 2026</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">4 min read</span>
          </div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">Why We Started ForgingApps</h1>
          <p className="text-xl text-gray-400">Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              We spent years working inside enterprise forges -- those sprawling corporate development shops where every decision takes three meetings and every shipped feature costs someone a soul.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">The Problem We Saw</h2>

            <p>
              We watched great projects get buried under agency markups. We watched brilliant ideas become committee-approved mediocrity. We watched small business owners get quoted €50K for something that should cost €5K, simply because the market told them that was the starting price.
            </p>

            <p>
              Worse, we watched junior developers learn on real projects. We watched clients tolerate 40% revision cycles because the team rebuilding their feature for the third time was learning React on their dime.
            </p>

            <p>
              We watched companies disappear after launch. "Go live and leave" was the default playbook.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">The Insight</h2>

            <p>
              Then something clicked: AI tools aren't replacing developers. They're giving senior developers superpowers.
            </p>

            <p>
              An experienced developer with AI assistance can move at startup speed. We can scope projects in days. We can prototype in hours. We can build features in days instead of weeks. And because we've seen a thousand edge cases, our code doesn't need three revision rounds -- it needs zero.
            </p>

            <p>
              The combination of senior experience + AI assistance = enterprise-quality work at startup-friendly timelines and prices.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What We're Building</h2>

            <p>
              ForgingApps is the studio we wish existed when we were starting. Two senior developers. Direct access. No account managers. No middlemen. No juniors learning on your project.
            </p>

            <p>
              When you work with us, you work with the people writing your code. Questions get answered in hours, not days. Problems get solved by someone who's seen it before.
            </p>

            <p>
              We're charging 30% less than the market because we believe better is possible. Because we're building our portfolio. Because we want to prove that quality and affordability aren't mutually exclusive.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">The Forge Metaphor Isn't Marketing</h2>

            <p>
              It's how we actually think about our work. A forge is where raw materials are shaped through heat, pressure, and precision. It's where something ordinary becomes something that lasts.
            </p>

            <p>
              That's what we do. We don't just ship code. We ship products that hold up. We test everything twice. We measure security. We think about what happens at 100x scale before we're at 10x scale.
            </p>

            <p>
              Your app isn't shipped and forgotten. It's warrantied. It's maintained. It's evolved. We're still here when you need us.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">That's Why ForgingApps Exists</h2>

            <p>
              Not because the market needed another dev shop. But because we believed small teams deserved better than juniors and account managers. Because we believed AI could make us faster, not careless. Because we believed quality at startup prices was possible.
            </p>

            <p>
              If you've been quoted €50K for an app that should cost €5K, or if you're tired of revision cycles, or if you want to work directly with experienced developers instead of a pipeline of juniors -- let's talk.
            </p>

            <p>
              We're building our portfolio one project at a time. Your project could be next.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 text-center">
          <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">Need an app forged right?</h3>
          <p className="text-gray-400 mb-6">Free consultation. Transparent pricing. Senior developers only.</p>
          <Link href="/contact" className="btn-primary">
            Get a Free Quote →
          </Link>
        </div>
      </div>
    </article>
  )
}
