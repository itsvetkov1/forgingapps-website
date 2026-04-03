import Link from 'next/link'
import { User, Linkedin } from 'lucide-react'
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

function AvatarPlaceholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div className="bg-gradient-to-b from-forge-ember/30 to-transparent h-48 flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-forge-stone border-2 border-forge-ember/40 flex items-center justify-center">
          <span className="font-cinzel text-3xl font-bold text-forge-gold">{initials}</span>
        </div>
      </div>
    </div>
  )
}

function LinkedInButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-forge-gold hover:text-forge-ember transition-colors text-sm font-semibold"
    >
      <Linkedin size={16} />
      {label}
    </a>
  )
}

export default function About() {
  return (
    <>
      {/* Why ForgingApps -- Origin Story */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Why ForgingApps</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              We spent years working inside large companies with large budgets and layers of process between a good idea and a shipped product.
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
              We use AI not as a buzzword, but as a tool that makes us faster without making us careless. It lets us deliver enterprise-quality work at prices that don't require enterprise budgets.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We believe software should work for you, not drain you. That's why every project starts with listening, ships with a warranty, and keeps you in control the whole way through.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Ivaylo */}
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg overflow-hidden">
              <AvatarPlaceholder initials="IT" name="Ivaylo Tsvetkov" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-cinzel text-2xl font-bold text-forge-gold">Ivaylo Tsvetkov</h2>
                  <LinkedInButton
                    href="https://www.linkedin.com/in/ivaylo-tsvetkov"
                    label="Profile"
                  />
                </div>
                <p className="text-forge-gold font-semibold mb-4">AI & Product</p>
                <p className="text-gray-400 mb-6">
                  The bridge between what AI can do and what your business needs. 10+ years in tech, with deep expertise in AI integration, product strategy, and quality engineering. Leads the technical vision, designs AI solutions, and ensures every product ships with the security and polish clients deserve.
                </p>
                <p className="text-gray-400 mb-6 text-sm">
                  Before ForgingApps, Ivaylo led a 22-person technical team building enterprise software. He's an AI systems architect who has built autonomous agents running in production, and a two-time recipient of the umlaut Secure App Award. He spends his time figuring out how to make AI actually useful for real businesses, not just impressive in demos.
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

            {/* Radoslav */}
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg overflow-hidden">
              <AvatarPlaceholder initials="RL" name="Radoslav Lambrev" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-cinzel text-2xl font-bold text-forge-gold">Radoslav Lambrev</h2>
                  <LinkedInButton
                    href="https://www.linkedin.com/in/radoslav-lambrev"
                    label="Profile"
                  />
                </div>
                <p className="text-forge-gold font-semibold mb-4">Backend & Mobile</p>
                <p className="text-gray-400 mb-6">
                  Senior Kotlin and Java developer with years of experience building production-grade mobile and backend systems. Deep expertise in Android native development, server architecture, and performance optimization. The hands that build your product.
                </p>
                <p className="text-gray-400 mb-6 text-sm">
                  Radoslav has spent his career focused on the stuff that has to just work: backend systems that handle real traffic, mobile apps that don't crash, and architectures that scale without requiring a complete rewrite. He's the reason our apps feel solid when they ship. He has a particular talent for taking complex requirements and turning them into clean, maintainable code.
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
                      <span>Cross-platform mobile specialist (Flutter, Android)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Backend architecture expert</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                      <span>Performance optimization specialist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values -- condensed, not duplicating homepage */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 text-center">
              <div className="text-forge-gold mb-4 flex justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">Quality You Can Verify</h3>
              <p className="text-gray-400 text-sm">Our umlaut Secure App Award isn't a marketing badge. It's proof that we build things that hold up under scrutiny.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 text-center">
              <div className="text-forge-gold mb-4 flex justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">Direct Access. Always.</h3>
              <p className="text-gray-400 text-sm">No account managers. No layers. You talk to the people writing your code. Questions get answered in hours, not days.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 text-center">
              <div className="text-forge-gold mb-4 flex justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">No Surprises</h3>
              <p className="text-gray-400 text-sm">Fixed pricing. Clear scope. You know what you're paying before we write a single line of code. Transparent all the way through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py section-fluent-merge bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Ready to work with us?</h2>
          <p className="text-lg mb-8 text-forge-dark/80">Let's talk about your project. Free consultation, no commitment.</p>
          <Link href="/contact" className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  )
}
