import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work -- App Development Portfolio | ForgingApps',
  description: "Security-certified mobile apps, AI agent systems, and cross-platform applications. See what we've forged.",
  alternates: {
    canonical: 'https://forgingapps.com/portfolio',
  },
  openGraph: {
    title: 'Our Work -- App Development Portfolio | ForgingApps',
    description: "Security-certified mobile apps, AI agent systems, and cross-platform applications.",
    url: 'https://forgingapps.com/portfolio',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Portfolio' }],
  },
}

export default function Portfolio() {
  const projects = [
    {
      name: 'Security-Certified Mobile Application',
      category: 'Mobile App',
      tagline: 'Enterprise mobile app -- security-first architecture',
      description: 'Built a cross-platform mobile application that passed umlaut\'s rigorous security certification two years in a row. Secure authentication, encrypted data handling, and penetration-tested infrastructure.',
      tech: ['Flutter', 'Kotlin', 'Firebase', 'REST APIs'],
      result: 'umlaut Secure App Award (2024, 2025)',
    },
    {
      name: 'Alpharius AI Agent System',
      category: 'AI / Automation',
      tagline: 'Autonomous business operations platform',
      description: 'A multi-agent AI system that manages business development, content strategy, market research, and operational tasks autonomously. Built with Node.js, multiple LLM integrations, and a self-evolving capability engine.',
      tech: ['Node.js', 'OpenAI API', 'Anthropic API', 'Custom AI Agents'],
      result: 'Autonomous daily business operations with human oversight',
    },
    {
      name: 'XtraSkill Learning Platform',
      category: 'Web & Mobile App',
      tagline: 'Interactive skills and learning platform',
      description: 'A platform designed to help users discover, develop, and track professional skills through personalized learning paths.',
      tech: ['Flutter', 'React', 'Node.js'],
      result: 'In Development',
      status: 'In Development',
    },
    {
      name: 'Singles of Sofia',
      category: 'Mobile App / Community Platform',
      tagline: 'Community app with payments, matching, and real-time chat',
      description: 'A community-driven social platform for Sofia featuring user matching, integrated payments, real-time messaging, and admin moderation tools.',
      tech: ['Flutter', 'Kotlin', 'Stripe', 'Firebase'],
      result: 'In Progress',
      status: 'In Progress',
    },
  ]

  return (
    <>
      <Hero
        headline="Our Work"
        subheadline="Every project is a piece we're proud of. Here's what we've forged."
        size="small"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="space-y-8 mb-12">
            {projects.map((project, i) => (
              <div key={i} className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden hover:border-forge-ember/60 card-hover transition-all">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold text-forge-ember mb-2">{project.category}</div>
                      <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{project.name}</h2>
                      <p className="text-gray-300 font-semibold">{project.tagline}</p>
                    </div>
                    {project.status && (
                      <div className="bg-forge-ember/20 text-forge-ember px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                        {project.status}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-forge-gold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="bg-forge-dark border border-forge-ember/30 text-forge-gold px-3 py-1 rounded-lg text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-forge-ember/20">
                    <div className="flex items-center gap-2">
                      <span className="text-forge-gold font-semibold">Result:</span>
                      <span className="text-gray-300">{project.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-py bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">Credentials & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Awards & Recognition</h3>
              <ul className="space-y-3">
                {[
                  'umlaut Secure App Award -- Certified in 2024 and 2025',
                  '10+ years combined development experience',
                  'Cross-platform specialists -- Flutter, Kotlin, React, Node.js',
                  'AI integration experts -- LLMs, chatbots, automation, agents',
                  'Full-stack coverage -- frontend, backend, DevOps, security',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-forge-gold mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Technologies</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Flutter', 'Kotlin', 'React', 'Node.js', 'Python', 'Firebase', 'AWS', 'Stripe', 'OpenAI', 'Anthropic'].map((tech, i) => (
                  <div key={i} className="bg-forge-dark border border-forge-ember/30 rounded-lg p-3 text-center font-semibold text-forge-gold">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">Impressed?</h2>
          <p className="text-gray-400 mb-8 text-lg">Let's talk about your next project. Free consultation, no commitment.</p>
          <a href="/contact" className="btn-primary">
            Get a Free Quote →
          </a>
        </div>
      </section>
    </>
  )
}
