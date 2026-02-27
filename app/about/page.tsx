import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us -- The Team Behind ForgingApps',
  description: 'Two senior developers building custom apps and AI solutions. Direct access, no middlemen, enterprise quality at startup prices.',
  alternates: {
    canonical: 'https://forgingapps.com/about',
  },
  openGraph: {
    title: 'About Us -- The Team Behind ForgingApps',
    description: 'Two senior developers building custom apps and AI solutions. Direct access, no middlemen, enterprise quality at startup prices.',
    url: 'https://forgingapps.com/about',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'About ForgingApps' }],
  },
}

export default function About() {
  return (
    <>
      <Hero
        headline="The Smiths Behind the Forge"
        subheadline="Two senior developers. One vision: apps built right."
        size="small"
      />

      {/* Team */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-b from-forge-ember/30 to-transparent h-48 flex items-center justify-center text-6xl">
                👤
              </div>
              <div className="p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">Ivaylo Tsvetkov</h2>
                <p className="text-forge-gold font-semibold mb-4">AI & Product</p>
                <p className="text-gray-400 mb-6">
                  The bridge between what AI can do and what your business needs. 10+ years in tech, with deep expertise in AI integration, product strategy, and quality engineering. Leads the technical vision, designs AI solutions, and ensures every product ships with the security and polish clients deserve.
                </p>
                <div>
                  <h3 className="font-semibold text-forge-gold mb-3">Credentials</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>umlaut Secure App Award (2x)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Technical Team Lead (22-person team)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>AI systems architect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Builder of autonomous AI agents</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-b from-forge-ember/30 to-transparent h-48 flex items-center justify-center text-6xl">
                👤
              </div>
              <div className="p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">Radoslav Lambrev</h2>
                <p className="text-forge-gold font-semibold mb-4">Backend & Mobile</p>
                <p className="text-gray-400 mb-6">
                  Senior Kotlin and Java developer with years of experience building production-grade mobile and backend systems. The hands that forge the code. Deep expertise in Android native development, server architecture, and performance optimization.
                </p>
                <div>
                  <h3 className="font-semibold text-forge-gold mb-3">Credentials</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Senior Kotlin/Java Developer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Cross-platform mobile specialist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Backend architecture expert</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Production-grade system builder</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Why ForgingApps</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              We spent years working inside enterprise forges -- large companies with large budgets and layers of process between a good idea and a shipped product.
            </p>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              We watched great projects get buried under agency markups, junior developer churn, and endless revision cycles. We watched small businesses get priced out of quality software because the market told them €30K was the starting point.
            </p>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              ForgingApps exists because we believe better is possible.
            </p>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Two senior developers. Direct access. No middlemen. No account managers. No juniors learning on your project. When you work with us, you work with the people building your product.
            </p>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              We use AI not as a buzzword, but as a tool -- the same way a master smith uses a power hammer alongside traditional techniques. It makes us faster without making us careless.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              The result: enterprise-quality work at prices that don't require enterprise budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">Tempered Quality</h3>
              <p className="text-gray-400">We test everything. Twice. Our security certification isn't a marketing badge -- it's proof that we build things that hold up under pressure.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">Direct Fire</h3>
              <p className="text-gray-400">No account managers. No layers. No game of telephone. You talk to the people writing your code. Questions get answered in hours, not days.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">Fair Trade</h3>
              <p className="text-gray-400">Transparent pricing. No hidden costs. No scope creep surprises. You know what you're paying for before we write a single line of code.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">Continuous Heat</h3>
              <p className="text-gray-400">We don't disappear after launch. Every project includes a bug fix warranty, and our retainer packages keep your product maintained, secure, and evolving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py section-fluent-merge bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Ready to build something great?</h2>
          <p className="text-lg mb-8 text-forge-dark/80">Let's talk about your project. Free consultation, no commitment.</p>
          <a href="/contact" className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">
            Get a Free Quote →
          </a>
        </div>
      </section>
    </>
  )
}
