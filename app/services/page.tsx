import Link from 'next/link'
import { Zap, Hammer, Flame, Brain, Gem, Clock, AlertCircle, LayoutList } from 'lucide-react'
import React from 'react'
import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Packages -- App Development Pricing | ForgingApps',
  description: 'From €300 landing pages to €20K full MVPs. Transparent pricing with a 25% launch discount. Flutter, Kotlin, React, AI integration.',
  alternates: {
    canonical: 'https://forgingapps.com/services',
  },
  openGraph: {
    title: 'Service Packages -- App Development Pricing | ForgingApps',
    description: 'From €300 landing pages to €20K full MVPs. Transparent pricing with a 25% launch discount.',
    url: 'https://forgingapps.com/services',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Service Packages' }],
  },
}

export default function Services() {
  const packages = [
    {
      id: 'spark',
      icon: 'zap',
      name: 'The Spark',
      tagline: 'Landing Pages & Simple Sites',
      regularPrice: '€400 - €1,100',
      launchPrice: '€300 - €800',
      description: 'Your business online in two weeks. Custom-designed, responsive, and built to convert visitors into clients.',
      included: [
        'Custom-designed responsive landing page (1-5 pages)',
        'Mobile-friendly, modern design following brand guidelines',
        'Contact form integration',
        'Basic SEO setup (meta tags, Open Graph, sitemap)',
        'Hosting setup guidance',
      ],
      addons: [
        'Additional pages: €80-120/page',
        'Blog setup: €150',
        'Bilingual (EN/BG) toggle: €150',
        'Animations and interactions: €100-200',
      ],
      delivery: '1-2 weeks',
      cta: 'Get Started',
    },
    {
      id: 'anvil',
      icon: 'hammer',
      name: 'The Anvil',
      tagline: 'Standard Web & Mobile Application',
      badge: 'Most Popular',
      regularPrice: '€4,000 - €11,000',
      launchPrice: '€3,000 - €8,000',
      description: 'A production-ready cross-platform app or custom web application. Authentication, backend, database -- everything you need to launch.',
      included: [
        'Cross-platform mobile app (Flutter, iOS + Android) OR custom web application',
        'Up to 10 core screens/pages',
        'User authentication (email, Google, Apple)',
        'Backend/API integration',
        'Database setup and management',
        'Push notifications (mobile)',
        '1 round of revisions after delivery',
        '30-day bug fix warranty post-launch',
      ],
      builtFor: [
        'Business directory apps',
        'Event management platforms',
        'Simple e-commerce storefronts',
        'Internal tools and dashboards',
        'Portfolio and showcase apps',
      ],
      delivery: '4-8 weeks',
      cta: 'Get Started',
    },
    {
      id: 'forge',
      icon: 'flame',
      name: 'The Forge',
      tagline: 'Complex Application / Full MVP',
      regularPrice: '€11,000 - €27,000',
      launchPrice: '€8,000 - €20,000',
      description: 'Full-scale product builds with real-time features, payments, admin panels, and advanced architecture. This is where ideas become products.',
      included: [
        'Full cross-platform mobile app OR complex web application',
        '10+ screens and features',
        'Real-time functionality (chat, notifications, live updates)',
        'Payment integration (Stripe, Apple Pay, Google Pay)',
        'Admin dashboard and moderation tools',
        'User management system',
        'Bilingual support (EN/BG)',
        'Advanced backend architecture',
        '2 rounds of revisions',
        '60-day bug fix warranty post-launch',
        'Basic analytics integration',
      ],
      builtFor: [
        'Marketplace platforms with buyer/seller flows',
        'SaaS product MVPs',
        'Social platforms with messaging',
        'Booking and scheduling systems',
        'Community apps with payments and matching',
      ],
      delivery: '8-16 weeks',
      cta: 'Get Started',
    },
    {
      id: 'oracle',
      icon: 'brain',
      name: 'The Oracle',
      tagline: 'AI Consulting & Integration',
      regularPrice: '€80/hr | €500 - €5,000 (project)',
      launchPrice: '€60/hr',
      description: "Not sure what AI can do for your business? We'll show you. From a free discovery call to full AI integration — accessible expertise without enterprise pricing.",
      consulting: [
        'AI strategy sessions & feasibility assessments',
        'Chatbot and AI agent design and deployment',
        'Workflow automation and process optimization',
        'Integration with your existing systems and tools',
      ],
      cta: 'Explore AI Consulting',
      ctaLink: '/ai-consulting',
    },
    {
      id: 'hearthstone',
      icon: 'gem',
      name: 'The Hearthstone',
      tagline: 'Ongoing Support & Retainer',
      regularPrice: '€400 - €2,000/month',
      launchPrice: '€300 - €1,500/month',
      description: 'Your app is live. Now keep it running, secure, and evolving. Monthly support retainers with guaranteed response times.',
      retainerTiers: [
        { name: 'Bronze', hours: '5 hrs', response: '48 hours', regular: '€400', launch: '€300' },
        { name: 'Silver', hours: '12 hrs', response: '24 hours', regular: '€950', launch: '€700' },
        { name: 'Gold', hours: '25 hrs', response: 'Same day', regular: '€2,000', launch: '€1,500' },
      ],
      includes: [
        'Bug fixes and maintenance',
        'Minor feature additions',
        'Performance monitoring',
        'Security updates',
        'Priority support',
        'Monthly status report',
      ],
      cta: 'Get Started',
    },
  ]

  return (
    <>
      <Hero
        headline="Service Packages"
        subheadline="From a quick landing page to a full MVP. Choose the package that fits your scale."
        size="small"
        badge="Launch Discount: 25% off all packages"
      />

      {/* Scarcity Banner */}
      <section className="bg-forge-dark border-t border-amber-700/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-center gap-3 text-amber-400 text-sm font-semibold">
            <Clock size={16} />
            <span>Launch Pricing Available Through Q3 2026 — <span className="text-amber-300">First 20 clients</span></span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-3xl font-bold text-center mb-8">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-forge-ember/30">
                  <th className="text-left py-3 px-4 text-gray-400 font-normal text-sm"></th>
                  <th className="text-center py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={20} className="text-forge-gold" />
                      <span className="font-cinzel text-forge-gold font-bold">Spark</span>
                      <span className="text-xs text-gray-500">Landing Pages</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <Hammer size={20} className="text-forge-gold" />
                      <span className="font-cinzel text-forge-gold font-bold">Anvil</span>
                      <span className="text-xs text-gray-500">Standard Apps</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <Flame size={20} className="text-forge-gold" />
                      <span className="font-cinzel text-forge-gold font-bold">Forge</span>
                      <span className="text-xs text-gray-500">Full MVPs</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forge-ember/20">
                {[
                  { label: 'Price Range', spark: '€300 - €800', anvil: '€3,000 - €8,000', forge: '€8,000 - €20,000' },
                  { label: 'Delivery', spark: '1-2 weeks', anvil: '4-8 weeks', forge: '8-16 weeks' },
                  { label: 'Platform', spark: 'Web only', anvil: 'Mobile OR Web', forge: 'Mobile + Web', forgeFull: true },
                  { label: 'Pages / Screens', spark: '1-5 pages', anvil: 'Up to 10', forge: '10+' },
                  { label: 'User Authentication', spark: false, anvil: true, forge: true },
                  { label: 'Backend / Database', spark: false, anvil: true, forge: true },
                  { label: 'Payment Integration', spark: false, anvil: false, forge: true },
                  { label: 'Real-time Features', spark: false, anvil: false, forge: true },
                  { label: 'Bilingual (EN/BG)', spark: false, anvil: false, forge: true, forgeFull: true },
                  { label: 'Admin Dashboard', spark: false, anvil: false, forge: true },
                  { label: 'Revisions Included', spark: '1 round', anvil: '1 round', forge: '2 rounds' },
                  { label: 'Bug Fix Warranty', spark: '30 days', anvil: '30 days', forge: '60 days' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-forge-stone/50 transition-colors">
                    <td className="py-3 px-4 text-gray-400 text-sm">{row.label}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      {typeof row.spark === 'boolean' ? (
                        row.spark ? <span className="text-forge-gold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-gray-300">{row.spark}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {typeof row.anvil === 'boolean' ? (
                        row.anvil ? <span className="text-forge-gold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-gray-300">{row.anvil}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {typeof row.forge === 'boolean' ? (
                        row.forge ? <span className="text-forge-gold">✓</span> : <span className="text-gray-600">—</span>
                      ) : (
                        <span className="text-gray-300">{row.forge}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">Need AI capabilities? <Link href="/ai-consulting" className="text-forge-gold hover:text-forge-ember transition">Explore AI Consulting →</Link></p>
          </div>
        </div>
      </section>

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="space-y-8">
            {packages.map((pkg) => (
              <div key={pkg.id} id={pkg.id} className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <div className="flex flex-col md:flex-row items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-forge-gold">{pkg.icon === 'zap' ? <Zap size={40} /> : pkg.icon === 'hammer' ? <Hammer size={40} /> : pkg.icon === 'flame' ? <Flame size={40} /> : pkg.icon === 'brain' ? <Brain size={40} /> : <Gem size={40} />}</span>
                      <div>
                        <h2 className="font-cinzel text-3xl font-bold text-forge-gold">{pkg.name}</h2>
                        <p className="text-gray-400">{pkg.tagline}</p>
                      </div>
                    </div>
                    {pkg.badge && (
                      <div className="mt-2">
                        <span className="inline-block bg-forge-ember/20 text-forge-ember px-3 py-1 rounded text-sm font-semibold">
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-gray-400 line-through text-sm">{pkg.regularPrice}</div>
                    <div className="text-3xl font-bold text-forge-gold">{pkg.launchPrice}</div>
                    <div className="text-xs text-forge-ember font-semibold mt-1">Launch Discount</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{pkg.description}</p>

                {pkg.included && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">What's Included:</h3>
                    <ul className="space-y-2">
                      {pkg.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.builtFor && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Built for:</h3>
                    <ul className="space-y-2">
                      {pkg.builtFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="text-forge-gold mt-1 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.consulting && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Hourly Consulting Covers:</h3>
                    <ul className="space-y-2">
                      {pkg.consulting.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.retainerTiers && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Support Tiers:</h3>
                    <div className="space-y-3">
                      {pkg.retainerTiers.map((tier, i) => (
                        <div key={i} className="bg-forge-dark rounded p-4 border border-forge-ember/20">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-forge-gold mb-2">{tier.name}</h4>
                              <div className="text-sm text-gray-400 space-y-1">
                                <div>{tier.hours}/month</div>
                                <div>Response: {tier.response}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-400 line-through text-xs">{tier.regular}</div>
                              <div className="text-forge-gold font-semibold">{tier.launch}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.includes && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Every Tier Includes:</h3>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.addons && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Add-ons:</h3>
                    <ul className="space-y-2">
                      {pkg.addons.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <span className="text-forge-gold mt-1 flex-shrink-0">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-6 border-t border-forge-ember/20 gap-4">
                  <div className="text-sm text-gray-400">
                    Delivery: <span className="text-forge-gold font-semibold">{pkg.delivery}</span>
                  </div>
                  <Link
                    href={pkg.ctaLink || '/contact'}
                    className="btn-primary"
                  >
                    {pkg.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Terms */}
          <div className="mt-12 bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Payment Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-white mb-2">Fixed-Price Projects</h3>
                <p className="text-gray-400 text-sm">40% upfront | 30% at midpoint | 30% on delivery</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Hourly Consulting</h3>
                <p className="text-gray-400 text-sm">Billed monthly, net 14 days</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Retainers</h3>
                <p className="text-gray-400 text-sm">Monthly prepaid, auto-renew</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Payment Methods</h3>
                <p className="text-gray-400 text-sm">Bank transfer (EUR/BGN), PayPal, Revolut</p>
              </div>
            </div>
          </div>

          {/* What's Not Included */}
          <div className="mt-8 bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">What's Not Included</h2>
            <p className="text-gray-400 mb-4">Transparency matters. These are not included in any package price:</p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>Hosting costs (we help you set up; you pay the provider directly)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>App Store developer account fees (€25 Google Play, $99/yr Apple)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>Third-party service costs (Stripe fees, push notification services, API subscriptions)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>Content creation (copywriting, photography, video production)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>Ongoing content management (unless on a Hearthstone retainer)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-forge-gold flex-shrink-0">•</span>
                <span>Marketing and SEO campaigns (unless specifically scoped as an add-on)</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: "How much does a custom app actually cost?",
                  a: "It depends on complexity. Landing pages start at €300. Standard apps typically run €3,000-€8,000. Full MVPs range €8,000-€20,000. Every project is scoped individually — we give you a fixed price before any code is written.",
                },
                {
                  q: "What's the typical timeline from idea to launch?",
                  a: "Spark (landing pages) ship in 1-2 weeks. Anvil (standard apps) take 4-8 weeks. Forge (full MVPs) run 8-16 weeks. Most projects are live within two months of signing.",
                },
                {
                  q: "What exactly is included in the price?",
                  a: "Design, development, one round of revisions, and a 30-60 day bug fix warranty depending on package. Hosting setup is included — you pay the hosting provider directly. See the full What's Not Included list above.",
                },
                {
                  q: "I have a non-technical background. Can I still work with you?",
                  a: "Absolutely. Most of our clients are non-technical founders and business owners. We handle the technical complexity — you stay in control through weekly demos and feedback rounds. No jargon in our conversations.",
                },
                {
                  q: "What if I need changes mid-project?",
                  a: "Small adjustments are part of every package. For larger scope changes, we scope them out, give you a clear cost, and get your approval before proceeding. No surprises — every change is quoted separately.",
                },
                {
                  q: "What happens after my app goes live?",
                  a: "Every project includes a 30-60 day bug fix warranty. After that, you can add a Hearthstone support retainer for ongoing maintenance, updates, and priority response. Or handle maintenance yourself — the code is yours.",
                },
                {
                  q: "We need something live urgently. Can you fast-track?",
                  a: "Yes. Rush timelines are possible for an additional fee depending on availability. Tell us your deadline and we'll tell you what's achievable and at what cost — no judgment.",
                },
              ].map((item, i) => (
                <details key={i} className="group border border-forge-ember/20 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-300 font-semibold hover:text-forge-gold hover:bg-forge-stone/50 transition-colors list-none">
                    {item.q}
                    <span className="text-forge-gold group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-forge-ember/10 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-forge-ember/20">
              <p className="text-gray-400 text-sm text-center">
                Still have questions?{" "}
                <Link href="/contact" className="text-forge-gold hover:text-forge-ember transition">
                  Talk to us directly →
                </Link>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Not sure which package fits?</h2>
            <p className="text-gray-400 mb-6">Every project starts with a free consultation. Tell us what you need, and we'll recommend the right forge.</p>
            <Link href="/contact" className="btn-primary">
              Let's Talk →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
