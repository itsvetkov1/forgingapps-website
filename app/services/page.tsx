import Link from 'next/link'
import { Zap, Hammer, Flame, Brain, Gem, LayoutList } from 'lucide-react'
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
      regularPrice: '€80/hr | €670 - €6,700 (project)',
      launchPrice: '€60/hr | €500 - €5,000 (project)',
      description: 'Not sure what AI can do for your business? We\'ll show you. From strategy sessions to full integration -- accessible AI expertise without enterprise pricing.',
      consulting: [
        'AI strategy sessions',
        'Tool selection and evaluation',
        'Workflow automation audits',
        'AI integration architecture',
        'Chatbot and agent design',
        'Proof-of-concept development',
      ],
      projects: [
        { name: 'AI Feasibility Assessment', regular: '€670 - €1,070', launch: '€500 - €800' },
        { name: 'Chatbot / AI Agent Setup', regular: '€1,340 - €4,000', launch: '€1,000 - €3,000' },
        { name: 'Workflow Automation (1 process)', regular: '€1,070 - €2,670', launch: '€800 - €2,000' },
        { name: 'Custom AI Integration', regular: '€2,670 - €6,700', launch: '€2,000 - €5,000' },
        { name: 'AI Strategy & Roadmap', regular: '€1,340 - €2,670', launch: '€1,000 - €2,000' },
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
        subheadline="From a quick landing page to a full MVP. Choose the forge that fits your scale."
        size="small"
        badge="Launch Discount: 25% off all packages"
      />

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

                {pkg.projects && (
                  <div className="mb-6">
                    <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Fixed-Price AI Projects:</h3>
                    <div className="space-y-3">
                      {pkg.projects.map((project, i) => (
                        <div key={i} className="bg-forge-dark rounded p-4 border border-forge-ember/20">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{project.name}</span>
                            <div className="text-right">
                              <div className="text-gray-400 line-through text-xs">{project.regular}</div>
                              <div className="text-forge-gold font-semibold">{project.launch}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
