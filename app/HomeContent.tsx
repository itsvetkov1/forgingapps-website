'use client'

import Link from 'next/link'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'
import { Zap, Hammer, Flame, Globe, Brain, Users, Bot, Shield, DollarSign } from 'lucide-react'

export default function HomeContent() {
  const { language, localePath } = useLanguage()
  const data = translations[language].home
  const common = translations[language].common
  const blog = translations[language].blog

  const latestPosts = [
    { slug: 'local-studio-vs-freelancer', date: 'Apr 10, 2026', category: 'business', postKey: 'localStudioVsFreelancer' },
    { slug: 'custom-software-vs-off-the-shelf', date: 'Apr 8, 2026', category: 'business', postKey: 'customVsOffTheShelf' },
    { slug: 'voice-agents-just-got-useful', date: 'Apr 6, 2026', category: 'ai', postKey: 'voiceAgents' },
  ]

  const steps = [data.process.step1, data.process.step2, data.process.step3, data.process.step4]
  const credentials = [data.credentials.cred1, data.credentials.cred2, data.credentials.cred3, data.credentials.cred4]
  const techStack = ['Flutter', 'Kotlin', 'React', 'Node.js', 'Python', 'Firebase', 'AWS', 'OpenAI', 'Anthropic', 'Stripe']

  return (
    <>
      <Hero
        headline={data.headline}
        subheadline={data.subheadline}
        primaryCTA={{ text: data.primaryCTA, href: localePath('/demo') }}
        secondaryCTA={{ text: data.secondaryCTA, href: localePath('/contact') }}
        trustBadge={data.trustBadge}
      />

      <section className="py-12 md:py-16 bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.whatWeForge}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <ServiceCard icon={<Zap size={40} />} title={data.spark.title} tier={data.spark.tier} outcome={data.spark.outcome} description={data.spark.description} launchPrice={data.spark.launchPrice} ctaLabel={common.learnMore + ' →'} href={localePath('/services#spark')} />
            <ServiceCard icon={<Globe size={40} />} title={data.blaze.title} tier={data.blaze.tier} outcome={data.blaze.outcome} description={data.blaze.description} launchPrice={data.blaze.launchPrice} ctaLabel={common.learnMore + ' →'} href={localePath('/services#blaze')} />
            <ServiceCard icon={<Hammer size={40} />} title={data.anvil.title} tier={data.anvil.tier} outcome={data.anvil.outcome} description={data.anvil.description} launchPrice={data.anvil.launchPrice} badge={data.anvil.badge} ctaLabel={common.learnMore + ' →'} href={localePath('/services#anvil')} />
            <ServiceCard icon={<Flame size={40} />} title={data.forge.title} tier={data.forge.tier} outcome={data.forge.outcome} description={data.forge.description} launchPrice={data.forge.launchPrice} ctaLabel={common.learnMore + ' →'} href={localePath('/services#forge')} />
          </div>

          <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-3">{data.readyForCustomAi}</p>
            <Link href={localePath('/ai-consulting')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{data.exploreAiConsulting} →</Link>
          </div>

          <div className="text-center mt-6">
            <Link href={localePath('/services')} className="btn-primary">{data.viewAllPackages} →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="bg-forge-dark border border-forge-ember/30 rounded-xl p-8 md:p-10 text-center">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-forge-gold mb-4">{data.demoTeaser.heading}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4 text-lg">{data.demoTeaser.description}</p>
            {(data.demoTeaser as any).emberPrompt ? (
              <p className="max-w-2xl mx-auto mb-8 text-sm text-forge-gold/90">
                <span aria-hidden="true" className="mr-1">→</span>
                {(data.demoTeaser as any).emberPrompt}
              </p>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href={localePath('/demo')} className="btn-primary">{data.demoTeaser.tryDemo}</Link>
              <Link href={localePath('/ai-consulting')} className="btn-secondary">{data.demoTeaser.learnAboutAi}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2"><Brain size={24} className="text-forge-gold" /><span className="text-sm text-gray-400">{data.demoTeaser.realTime}</span></div>
              <div className="flex flex-col items-center gap-2"><Bot size={24} className="text-forge-gold" /><span className="text-sm text-gray-400">{data.demoTeaser.contextAware}</span></div>
              <div className="flex flex-col items-center gap-2"><Zap size={24} className="text-forge-gold" /><span className="text-sm text-gray-400">{data.demoTeaser.deployable}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.difference.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center"><div className="text-forge-gold mb-4 flex justify-center"><Users size={36} /></div><h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">{data.difference.directAccess.title}</h3><p className="text-gray-400 text-sm">{data.difference.directAccess.description}</p></div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center"><div className="text-forge-gold mb-4 flex justify-center"><Zap size={36} /></div><h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">{data.difference.fastDelivery.title}</h3><p className="text-gray-400 text-sm">{data.difference.fastDelivery.description}</p></div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center"><div className="text-forge-gold mb-4 flex justify-center"><DollarSign size={36} /></div><h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">{data.difference.affordable.title}</h3><p className="text-gray-400 text-sm">{data.difference.affordable.description}</p></div>
            <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-6 text-center"><div className="text-forge-gold mb-4 flex justify-center"><Shield size={36} /></div><h3 className="font-cinzel text-lg font-bold text-forge-gold mb-2">{data.difference.secure.title}</h3><p className="text-gray-400 text-sm">{data.difference.secure.description}</p></div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.process.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((step: any, i: number) => (
              <div key={i} className="relative">
                <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6">
                  <div className="text-4xl font-bold text-forge-gold mb-3">{i + 1}</div>
                  <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-3">{step.name}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-forge-gold text-2xl">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-forge-stone border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.credentials.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">{data.credentials.credentialsTitle}</h3>
              <ul className="space-y-3 text-gray-400">
                {credentials.map((item: string) => (
                  <li key={item} className="flex items-start gap-3"><span className="text-forge-gold mt-1">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">{data.credentials.techStack}</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div key={tech} className="bg-forge-dark border border-forge-ember/30 rounded-lg p-3 text-center text-sm font-semibold text-forge-gold">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.latestFromBlog.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {latestPosts.map((post) => {
              const postMeta = (blog.posts as Record<string, any>)[post.postKey]
              return (
                <Link key={post.slug} href={localePath(`/blog/${post.slug}`)} className="group bg-forge-stone border border-forge-ember/20 rounded-xl p-6 hover:border-forge-gold/40 transition block">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="px-2 py-1 rounded bg-forge-ember/10 text-forge-ember">{blog.categories[post.category as keyof typeof blog.categories]}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3 group-hover:text-forge-ember transition">{postMeta?.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{postMeta?.description}</p>
                  <span className="text-forge-gold text-sm font-semibold">{common.readMore} →</span>
                </Link>
              )
            })}
          </div>
          <div className="text-center">
            <Link href={localePath('/blog')} className="btn-secondary">{data.latestFromBlog.viewAll}</Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 section-fluent-merge bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">{data.cta.heading}</h2>
          <p className="text-lg mb-8 text-forge-dark/80">{data.cta.subheading}</p>
          <Link href={localePath('/contact')} className="btn-primary bg-forge-dark text-forge-gold hover:bg-forge-stone">{data.cta.button} →</Link>
        </div>
      </section>
    </>
  )
}
