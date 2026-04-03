import Link from 'next/link'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'
import { Zap, Hammer, Flame, Brain, Users, Bot, Shield, Coins, GraduationCap, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ForgingApps -- Custom App Development & AI Consulting | Sofia, Bulgaria',
  description: 'Custom mobile and web applications built by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing. Based in Sofia, serving Europe.',
  alternates: {
    canonical: 'https://forgingapps.com',
  },
  openGraph: {
    title: 'ForgingApps -- Custom App Development & AI Consulting',
    description: 'Apps built to last. Senior developers, AI-powered delivery, startup-friendly pricing.',
    url: 'https://forgingapps.com',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps' }],
  },
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        headline="Custom AI & Software Built Fast, Without the Price Tag"
        subheadline="Senior developers building production-ready mobile apps, web platforms, and AI integrations for growing businesses in Sofia and across Europe."
        primaryCTA={{ text: 'See It In Action', href: '/demo/veloura-support' }}
        secondaryCTA={{ text: 'Get Started', href: '/contact' }}
        trustBadge="Umlaut Verified Partner"
      />

      {/* What We Forge */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">What We Forge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <ServiceCard
              icon={<Zap size={40} />}
              title="Landing Pages & Simple Sites"
              tier="The Spark"
              outcome="Launch in 2 weeks"
              description="Landing pages and simple sites for businesses that need to get online fast. Mobile-responsive, SEO-optimized, ready to ship."
              regularPrice="€400 - €1,100"
              launchPrice="From €300"
              href="/services#spark"
            />
            <ServiceCard
              icon={<Hammer size={40} />}
              title="Standard Web & Mobile Apps"
              tier="The Anvil"
              outcome="Ship in 4-8 weeks"
              description="Custom web and mobile applications built to your spec. Cross-platform, scalable, with a 30-day bug-fix warranty."
              regularPrice="€4,000 - €11,000"
              launchPrice="From €3,000"
              badge="Most Popular"
              href="/services#anvil"
            />
            <ServiceCard
              icon={<Flame size={40} />}
              title="Complex Apps & Full MVPs"
              tier="The Forge"
              outcome="Production-ready in 8-16 weeks"
              description="Full MVPs, complex web platforms, and multi-service systems. Enterprise-grade architecture without the enterprise price."
              regularPrice="€11,000 - €27,000"
              launchPrice="From €8,000"
              href="/services#forge"
            />
          </div>

          {/* AI Consulting Link */}
          <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-3">Ready for custom AI?</p>
            <Link href="/ai-consulting" className="text-forge-gold hover:text-forge-ember transition font-semibold">
              Explore AI Consulting Services →
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="btn-primary">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Teaser */}
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="bg-forge-dark border border-forge-ember/30 rounded-xl p-8 md:p-12 text-center">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-forge-gold mb-4">
              See Custom AI in Action
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              The Veloura demo shows how custom AI handles real customer conversations with context and intelligence. This is live, working software running right now — not a mockup or a video. Try it yourself and see what's possible for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/demo/veloura-support" className="btn-primary">
                Try the Demo
              </Link>
              <Link href="/ai-consulting" className="btn-secondary">
                Learn about AI Consulting
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <Brain size={24} className="text-forge-gold" />
                <span className="text-sm text-gray-400">Real-time problem solving</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Bot size={24} className="text-forge-gold" />
                <span className="text-sm text-gray-400">Context-aware conversations</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap size={24} className="text-forge-gold" />
                <span className="text-sm text-gray-400">Immediately deployable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">The ForgingApps Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center">
              <div className="text-forge-gold mb-4 flex justify-center"><Users size={36} /></div>
              <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">Direct Access to Founders</h3>
              <p className="text-gray-400 text-sm">Two senior developers. You work directly with the people building your app -- no project managers, no hand-offs.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center">
              <div className="text-forge-gold mb-4 flex justify-center"><Zap size={36} /></div>
              <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">Average 2-3 Week Delivery</h3>
              <p className="text-gray-400 text-sm">AI-assisted development cuts timelines in half. Most projects ship within 2-8 weeks -- not months.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center">
              <div className="text-forge-gold mb-4 flex justify-center"><DollarSign size={36} /></div>
              <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">40% Less Than Agencies</h3>
              <p className="text-gray-400 text-sm">No bloated teams or overhead. Senior work at €60/hr AI consulting and fixed-price projects starting at €300.</p>
            </div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center">
              <div className="text-forge-gold mb-4 flex justify-center"><Shield size={36} /></div>
              <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">umlaut Secure App Award</h3>
              <p className="text-gray-400 text-sm">Two years running. Your data and your users' data are safe -- privacy and security built in by design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
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
                name: 'Launch & Warranty',
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
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Proven & Verified</h2>
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
      <section className="section-py section-fluent-merge bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Ready to build your next app?</h2>
          <p className="text-lg mb-8 text-forge-dark/80">Free consultation. Transparent pricing. No middlemen.</p>
          <Link href="/contact" className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  )
}
