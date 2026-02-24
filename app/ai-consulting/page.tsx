import Link from 'next/link'
import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Consulting for Business -- The Oracle | ForgingApps',
  description: 'Practical AI consulting starting at €60/hr. Strategy, chatbots, automation, integration. No enterprise pricing. Based in Sofia, serving Europe.',
  alternates: {
    canonical: 'https://forgingapps.com/ai-consulting',
  },
  openGraph: {
    title: 'AI Consulting for Business -- The Oracle | ForgingApps',
    description: 'Practical AI consulting starting at €60/hr. Strategy, chatbots, automation, integration. No enterprise pricing.',
    url: 'https://forgingapps.com/ai-consulting',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps AI Consulting' }],
  },
}

export default function AiConsulting() {
  return (
    <>
      <Hero
        headline="The Oracle -- AI Consulting"
        subheadline="Not sure what AI can do for your business? We'll show you. No jargon. No hype. Just practical AI that saves you time and money."
        primaryCTA={{ text: 'Book a Free Discovery Call', href: '/contact' }}
        size="small"
      />

      {/* What We Offer */}
      <section className="section-py bg-forge-dark">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">AI Expertise, Accessible</h2>

          <div className="mb-12">
            <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Hourly Consulting</h3>
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="line-through text-gray-400">€80/hr</span>
                <span className="text-3xl font-bold text-forge-gold">€60/hr</span>
                <span className="text-sm text-forge-ember font-semibold bg-forge-ember/10 px-2 py-1 rounded">Launch Discount</span>
              </div>
              <p className="text-gray-400">One-on-one sessions with an AI specialist. Strategy, evaluation, architecture, or hands-on building -- whatever you need.</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Fixed-Price AI Projects</h3>
            <div className="space-y-4">
              {[
                {
                  name: 'AI Feasibility Assessment',
                  regular: '€670 - €1,070',
                  launch: '€500 - €800',
                  desc: '1-2 sessions. We analyze your business, identify AI opportunities, and tell you what\'s worth building -- and what isn\'t.',
                },
                {
                  name: 'Chatbot / AI Agent',
                  regular: '€1,340 - €4,000',
                  launch: '€1,000 - €3,000',
                  desc: 'A working chatbot or AI agent for your business. Customer support, internal Q&A, lead qualification -- deployed and ready.',
                },
                {
                  name: 'Workflow Automation',
                  regular: '€1,070 - €2,670',
                  launch: '€800 - €2,000',
                  desc: 'We take one manual process and automate it with AI. Data entry, report generation, email triage -- pick your bottleneck.',
                },
                {
                  name: 'Custom AI Integration',
                  regular: '€2,670 - €6,700',
                  launch: '€2,000 - €5,000',
                  desc: 'AI features added to your existing app or system. Recommendations, content generation, smart search, predictive analytics.',
                },
                {
                  name: 'AI Strategy & Roadmap',
                  regular: '€1,340 - €2,670',
                  launch: '€1,000 - €2,000',
                  desc: 'A comprehensive document: where AI fits in your business, what to build first, estimated costs, and a 6-12 month implementation plan.',
                },
              ].map((project, i) => (
                <div key={i} className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
                    <h4 className="font-cinzel text-lg font-bold text-forge-gold">{project.name}</h4>
                    <div className="text-right">
                      <div className="text-gray-400 line-through text-xs">{project.regular}</div>
                      <div className="text-forge-gold font-semibold">{project.launch}</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-py bg-forge-stone">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Is This for You?</h2>
          <div className="space-y-8">
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">
                "I'm curious about AI but don't know where to start."
              </h3>
              <p className="text-gray-400">
                Most businesses are. That's exactly why The Oracle exists. We start with a free discovery call. No commitment, no sales pitch -- just an honest conversation about what AI can and can't do for your specific business.
              </p>
            </div>

            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">
                "I have an app and want to add AI features."
              </h3>
              <p className="text-gray-400">
                Smart search, recommendations, content generation, chatbots -- we integrate AI into existing systems without rebuilding from scratch.
              </p>
            </div>

            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">
                "My team wastes hours on tasks AI could automate."
              </h3>
              <p className="text-gray-400">
                Data entry, report generation, email sorting, scheduling, content drafting. If a human does it repeatedly, AI can probably do it faster.
              </p>
            </div>

            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">
                "I want an AI strategy before investing."
              </h3>
              <p className="text-gray-400">
                A €1,000 strategy document can save you €50,000 in bad decisions. We map the opportunities, estimate the costs, and prioritize what to build first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our AI Expertise */}
      <section className="section-py bg-forge-dark">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">What We Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-4">Large Language Models (LLMs)</h3>
              <p className="text-gray-400">GPT-4, Claude, Gemini, Llama -- we work with all major models and know which one fits your use case and budget.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-4">Chatbots & AI Agents</h3>
              <p className="text-gray-400">Conversational agents for customer support, internal Q&A, lead qualification, and business operations. We built an AI agent system that manages business operations autonomously -- it's the system powering parts of this very company.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-4">Workflow Automation</h3>
              <p className="text-gray-400">Connect AI to your existing tools. Automate repetitive processes, reduce errors, and free your team to do work that matters.</p>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-4">Integration Architecture</h3>
              <p className="text-gray-400">We don't just bolt AI onto your system. We design integrations that are maintainable, scalable, and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-py bg-forge-stone">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Three Steps from Curious to Capable</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
                <div className="text-4xl font-bold text-forge-gold mb-4">1</div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Free Discovery Call (30 min)</h3>
                <p className="text-gray-400">Tell us about your business. We'll ask the right questions and give you an honest assessment of where AI fits -- and where it doesn't.</p>
              </div>
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-forge-gold text-2xl">→</div>
            </div>

            <div className="relative">
              <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
                <div className="text-4xl font-bold text-forge-gold mb-4">2</div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Feasibility Assessment (€500 - €800)</h3>
                <p className="text-gray-400">If there's a real opportunity, we go deeper. A focused analysis of your specific use case with clear recommendations and cost estimates.</p>
              </div>
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-forge-gold text-2xl">→</div>
            </div>

            <div>
              <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
                <div className="text-4xl font-bold text-forge-gold mb-4">3</div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">Build or Integrate (Project-scoped)</h3>
                <p className="text-gray-400">We build the solution. Chatbot, automation, integration -- whatever the assessment recommended. Fixed price, defined scope, no surprises.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-py bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Ready to explore AI for your business?</h2>
          <p className="text-lg mb-8 text-forge-dark/80">Start with a free 30-minute discovery call. No commitment. No jargon.</p>
          <Link href="/contact" className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">
            Book a Discovery Call →
          </Link>
        </div>
      </section>
    </>
  )
}
