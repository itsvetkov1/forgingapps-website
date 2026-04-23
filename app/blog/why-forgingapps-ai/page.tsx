import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why ForgingApps for AI Consulting | ForgingApps Blog',
  description: 'Who we are, how we work, what we actually build, and why clients choose a small senior team over bloated process and vague AI promises.',
  alternates: {
    canonical: 'https://forgingapps.com/blog/why-forgingapps-ai',
  },
  openGraph: {
    title: 'Why ForgingApps for AI Consulting | ForgingApps Blog',
    description: 'Who we are, how we work, what we actually build, and why clients choose a small senior team over bloated process and vague AI promises.',
    url: 'https://forgingapps.com/blog/why-forgingapps-ai',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Why ForgingApps for AI Consulting' }],
  },
}

export default function BlogPost() {
  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        <div className="mb-12">
          <Link href="/blog" className="text-forge-gold hover:text-forge-ember transition mb-4 inline-block">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-semibold text-forge-ember bg-forge-ember/10 px-2 py-1 rounded">AI</span>
            <span className="text-sm text-gray-400">Apr 5, 2026</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">5 min read</span>
          </div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">Why ForgingApps for AI Consulting</h1>
          <p className="text-xl text-gray-400">We&apos;ve told you what AI consulting is, how to judge if you need it, and how to choose a partner. Here&apos;s who we are, without the corporate varnish.</p>
          <p className="text-sm text-gray-500 mt-4">By Ivaylo Tsvetkov, Co-Founder</p>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              ForgingApps is a boutique development studio built by senior people who prefer shipping working systems over talking endlessly about them.
            </p>

            <p>
              We are based in Sofia, Bulgaria, and we work with businesses across Europe that want practical AI, clean delivery, and honest advice. That combination matters more now than ever, because the AI market is crowded with people who can demo a tool but cannot build a durable solution around it.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">Who We Are</h2>

            <p>
              We are a small studio founded by two senior developers with more than a decade of experience each. That means you are not buying access to a logo and then getting handed to junior staff. You talk to the people who scope the work, and those same people build it.
            </p>

            <p>
              We build AI solutions, but we also build traditional software. That is a strength, not a distraction. It means we understand where AI fits inside a real product stack instead of treating it like a magic layer that floats above reality.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What We Actually Do</h2>

            <p>
              We start with AI feasibility assessments. For businesses that need clarity before committing, we look at the operation, identify the most promising use cases, and tell you what is worth automating and what is not. That starts at EUR 500.
            </p>

            <p>
              We build custom chatbots and AI agents for customer support, lead qualification, and internal use. Typical projects land in the EUR 1,000 to EUR 3,000 range depending on scope.
            </p>

            <p>
              We also build process automation. If your team is still moving data manually between tools, sending the same follow-ups, or assembling repetitive reports, that is usually fixable. Those projects typically start around EUR 800 and scale with complexity.
            </p>

            <p>
              And for businesses that need a roadmap before implementation, we offer AI strategy work at EUR 60 per hour. That is useful when the right answer is not obvious yet and you need a senior technical opinion before building.
            </p>

            <p>
              If you want to see the kind of thing we mean, our live Veloura support demo is a good place to start. It shows AI support in a format that feels like software, not theatre.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">Why Clients Work With Us</h2>

            <p>
              Transparent pricing is part of it. We publish ranges because hiding numbers behind a vague discovery call wastes everyone&apos;s time.
            </p>

            <p>
              We also say no when AI is not the answer. That is not virtue-signalling. It is just better business. A bad-fit AI project creates bad outcomes, bad trust, and future cleanup work nobody wants.
            </p>

            <p>
              We keep the team senior. No outsourcing chains. No giant account-management layer. No surprise handoff from salesperson to someone who saw your brief for the first time that morning.
            </p>

            <p>
              Delivery speed matters too. We prefer working prototypes in days, not vague progress in months. Buyers learn faster from something real than from three more planning sessions.
            </p>

            <p>
              And yes, we maintain what we build. Shipping is the midpoint, not the end.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">Our Approach</h2>

            <p>
              Step one is a free 30-minute discovery call. We understand the business, the friction, and the outcome you actually care about.
            </p>

            <p>
              Step two is the feasibility assessment. We identify the highest-impact opportunities and estimate what it would take to implement them responsibly.
            </p>

            <p>
              Step three is the prototype. We build something real that proves the idea before you commit to broader rollout.
            </p>

            <p>
              Step four is iteration and shipping. We refine the system based on real feedback, then harden it into something useful.
            </p>

            <p>
              Step five is ongoing support. We stay close enough to keep the system healthy instead of disappearing as soon as the invoice clears.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">A Few Things We&apos;ve Built</h2>

            <p>
              We&apos;ve built AI support systems for e-commerce, invoice-processing pipelines, AI-assisted content workflows, and custom agents for business operations. The details vary, but the pattern stays the same: remove friction, improve responsiveness, and keep the solution grounded in how the business actually works.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">The Bottom Line</h2>

            <p>
              If you want enterprise theatre, we are not the right shop. If you want senior people, honest answers, practical pricing, and working software, that is where we are strongest.
            </p>

            <p>
              AI consulting should feel useful from the first conversation. We built our process around that idea.
            </p>
          </div>
        </div>

        <div className="bg-forge-stone border border-forge-ember/40 rounded-lg p-8 text-center">
          <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Ready to see what AI can do for your business?</h3>
          <p className="text-gray-400 mb-6">Book a free discovery call or see the Veloura support demo in action before we talk specifics.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Book a Free Discovery Call
            </Link>
            <Link href="/demo/veloura-support" className="btn-secondary">
              See AI in Action
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
