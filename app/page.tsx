import Link from 'next/link'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ForgingApps -- Custom App Development & AI Consulting | Sofia, Bulgaria',
  description: 'Custom mobile and web applications forged by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing. Based in Sofia, serving Europe.',
  alternates: {
    canonical: 'https://forgingapps.com',
  },
  openGraph: {
    title: 'ForgingApps -- Custom App Development & AI Consulting',
    description: 'Apps forged to last. Senior developers, AI-powered delivery, startup-friendly pricing.',
    url: 'https://forgingapps.com',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps' }],
  },
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        headline="Apps Forged to Last"
        subheadline="Custom mobile and web applications, hand-crafted by senior developers. AI-powered delivery at startup-friendly prices."
        primaryCTA={{ text: 'See Our Services', href: '/services' }}
        secondaryCTA={{ text: 'Get a Free Quote', href: '/contact' }}
      />

      {/* What We Forge */}
      <section className="section-py bg-forge-dark">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">What We Forge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ServiceCard
              icon="⚡"
              name="The Spark"
              description="Landing Pages & Simple Sites"
              regularPrice="€400 - €1,100"
              launchPrice="From €300"
              href="/services#spark"
            />
            <ServiceCard
              icon="🔨"
              name="The Anvil"
              description="Standard Web & Mobile Apps"
              regularPrice="€4,000 - €11,000"
              launchPrice="From €3,000"
              badge="Most Popular"
              href="/services#anvil"
            />
            <ServiceCard
              icon="🔥"
              name="The Forge"
              description="Complex Applications & Full MVPs"
              regularPrice="€11,000 - €27,000"
              launchPrice="From €8,000"
              href="/services#forge"
            />
            <ServiceCard
              icon="🔮"
              name="The Oracle"
              description="AI Consulting & Integration"
              regularPrice="€80/hr"
              launchPrice="€60/hr"
              href="/ai-consulting"
            />
          </div>
          <div className="text-center">
            <Link href="/services" className="btn-primary">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-py bg-forge-stone">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">The ForgingApps Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">Senior Craftsmanship</h3>
              <p className="text-gray-400">Two senior developers. No juniors. No middlemen. Every line of code is written by engineers with 10+ years in the trade.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">AI-Native Delivery</h3>
              <p className="text-gray-400">We use AI tools to cut delivery time in half -- not quality. You get enterprise-grade work at startup-friendly timelines.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">Proven Security</h3>
              <p className="text-gray-400">umlaut Secure App Award, two years running. Your data and your users' data are safe in our forge.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">Startup-Friendly Pricing</h3>
              <p className="text-gray-400">Quality you'd expect at €50K. Prices that start at €300. We're building our portfolio -- you get the best deal you'll ever find.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-py bg-forge-dark">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">From Spark to Ship</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: 1,
                name: 'The Spark',
                desc: 'Tell us your idea. Free consultation, no commitment. We listen, we ask the right questions, we scope.',
              },
              {
                num: 2,
                name: 'The Blueprint',
                desc: 'We define the scope, timeline, and price. You approve before a single line of code is written. No surprises.',
              },
              {
                num: 3,
                name: 'The Forge',
                desc: 'We build. Weekly demos keep you in the loop. You see progress, give feedback, steer the ship.',
              },
              {
                num: 4,
                name: 'The Quench',
                desc: 'Launch, test, deliver. Every project ships with a 30-60 day bug fix warranty. We don\'t disappear after launch.',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6">
                  <div className="text-4xl font-bold text-forge-gold mb-3">{step.num}</div>
                  <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">{step.name}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-forge-gold text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-py bg-forge-stone">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Tempered & Tested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Credentials</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-forge-gold mt-1">✓</span>
                  <span>umlaut Secure App Award (2024, 2025)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forge-gold mt-1">✓</span>
                  <span>10+ years combined development experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forge-gold mt-1">✓</span>
                  <span>Cross-platform expertise: Flutter, Kotlin, React, Node.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forge-gold mt-1">✓</span>
                  <span>AI integration specialists: LLMs, automation, chatbots, agents</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Flutter', 'Kotlin', 'React', 'Node.js', 'Python', 'Firebase', 'AWS', 'OpenAI', 'Anthropic', 'Stripe'].map(tech => (
                  <div key={tech} className="bg-forge-dark border border-forge-ember/30 rounded-lg p-3 text-center text-sm font-semibold text-forge-gold">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-py bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Ready to forge your next app?</h2>
          <p className="text-lg mb-8 text-forge-dark/80">Free consultation. Transparent pricing. No middlemen.</p>
          <Link href="/contact" className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  )
}
