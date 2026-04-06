'use client'

import Link from 'next/link'
import { Brain, Bot, Workflow, Sparkles, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function AIConsultingContent() {
  const { language } = useLanguage()
  const data = translations[language].aiConsulting

  const scenarios = [data.isThisForYou.s1, data.isThisForYou.s2, data.isThisForYou.s3, data.isThisForYou.s4]
  const steps = [data.threeSteps.step1, data.threeSteps.step2, data.threeSteps.step3]
  const capabilities = [
    { icon: <Brain size={28} className="text-forge-gold" />, block: data.whatAiCanDo.understand },
    { icon: <Workflow size={28} className="text-forge-gold" />, block: data.whatAiCanDo.automate },
    { icon: <Sparkles size={28} className="text-forge-gold" />, block: data.whatAiCanDo.scale },
    { icon: <Shield size={28} className="text-forge-gold" />, block: data.whatAiCanDo.secure },
  ]
  const fixed = [data.fixedPrice.feasibility, data.fixedPrice.chatbot, data.fixedPrice.workflow, data.fixedPrice.custom, data.fixedPrice.strategy]

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20 text-center">
        <div className="container-custom max-w-4xl">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.heroHeadline}</h1>
          <p className="text-xl text-gray-300 mb-8">{data.heroSubheadline}</p>
          <Link href="/contact" className="btn-primary">{data.heroCTA}</Link>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.servicesHeading}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
              <h3 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{data.hourlyConsulting.title}</h3>
              <p className="text-gray-500 line-through">{data.hourlyConsulting.regularPrice}</p>
              <p className="text-2xl font-bold text-white mb-4">{data.hourlyConsulting.launchPrice}</p>
              <p className="text-gray-300">{data.hourlyConsulting.description}</p>
            </div>
            <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
              <h3 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">{data.fixedPrice.heading}</h3>
              <div className="space-y-4">
                {fixed.map((item: any) => (
                  <div key={item.title} className="border border-forge-ember/20 rounded-lg p-4 bg-forge-dark">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-gray-500 line-through text-sm">{item.regularPrice}</p>
                    <p className="text-forge-gold font-semibold mb-2">{item.launchPrice}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.isThisForYou.heading}</h2>
          <div className="space-y-6">
            {scenarios.map((item: any) => (
              <div key={item.q} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom text-center max-w-4xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.demoSection.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{data.demoSection.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="btn-primary">{data.demoSection.tryDemo}</Link>
            <Link href="/contact" className="btn-secondary">{data.demoSection.orBook}</Link>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.whatAiCanDo.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {capabilities.map(({ icon, block }: any) => (
              <div key={block.title} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">{icon}<h3 className="font-semibold text-white">{block.title}</h3></div>
                <p className="text-gray-400">{block.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400">{data.whatAiCanDo.supporting}</p>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.threeSteps.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step: any, index: number) => (
              <div key={step.title} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6">
                <div className="text-4xl font-bold text-forge-gold mb-3">{index + 1}</div>
                <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.finalCta.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{data.finalCta.subheading}</p>
          <Link href="/contact" className="btn-primary">{data.finalCta.button}</Link>
        </div>
      </section>
    </div>
  )
}
