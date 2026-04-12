'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function ServicesContent() {
  const { language, localePath } = useLanguage()
  const data = translations[language].services

  const projectPackages = [
    { id: 'spark', data: data.spark, href: localePath('/services#spark') },
    { id: 'ember', data: data.ember, href: localePath('/services#ember') },
    { id: 'anvil', data: data.anvil, href: localePath('/services#anvil') },
    { id: 'forge', data: data.forge, href: localePath('/services#forge') },
    { id: 'oracle', data: data.oracle, href: localePath('/ai-consulting#the-oracle') },
  ]

  const comparisonRows = [
    ['priceRange', data.spark.launchPrice, data.ember.launchPrice, data.anvil.launchPrice, data.forge.launchPrice],
    ['delivery', data.spark.delivery, data.ember.delivery, data.anvil.delivery, data.forge.delivery],
    ['platform', data.comparison.webOnly, data.comparison.webOnly, data.comparison.mobileOrWeb, data.comparison.mobilePlusWeb],
    ['pagesScreens', data.comparison.oneToFive, data.comparison.upTo10, data.comparison.tenPlus, data.comparison.tenPlus],
    ['userAuth', '—', 'Optional', '✓', '✓'],
    ['backendDb', '—', 'Optional', '✓', '✓'],
    ['paymentIntegration', '—', 'Optional', 'Optional', '✓'],
    ['realtimeFeatures', '—', '—', 'Optional', '✓'],
    ['bilingualEnBg', 'Optional', 'Optional', 'Optional', '✓'],
    ['adminDashboard', '—', 'Optional', 'Optional', '✓'],
    ['revisionsIncluded', data.comparison.oneRound, data.comparison.oneRound, data.comparison.twoRounds, data.comparison.twoRounds],
    ['bugFixWarranty', data.comparison.thirtyDays, data.comparison.thirtyDays, data.comparison.sixtyDays, data.comparison.sixtyDays],
  ]

  const retainers = [data.hearthstone.maintenance, data.hearthstone.growth, data.hearthstone.partner]
  const faqItems = [data.faq.q1, data.faq.q2, data.faq.q3, data.faq.q4, data.faq.q5, data.faq.q6, data.faq.q7]

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl text-center">
          <div className="mb-4 inline-block">
            <span className="price-discount text-forge-gold bg-forge-gold/10 px-3 py-1">{data.launchBadge}</span>
          </div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.heading}</h1>
          <p className="text-xl text-gray-300 mb-3">{data.subheading}</p>
          <p className="text-sm text-forge-gold">{data.launchNotice}</p>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8 text-center">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">{data.agencyPositioning.heading}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{data.agencyPositioning.body}</p>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom overflow-x-auto">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.comparison.heading}</h2>
          <table className="w-full min-w-[980px] border border-forge-ember/20 text-sm">
            <thead>
              <tr className="bg-forge-stone">
                <th className="p-4 text-left text-forge-gold">Feature</th>
                <th className="p-4 text-left text-forge-gold">{data.spark.name}</th>
                <th className="p-4 text-left text-forge-gold">{data.ember.name}</th>
                <th className="p-4 text-left text-forge-gold">{data.anvil.name}</th>
                <th className="p-4 text-left text-forge-gold">{data.forge.name}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, spark, ember, anvil, forge]) => (
                <tr key={String(label)} className="border-t border-forge-ember/10">
                  <td className="p-4 text-gray-300">{data.comparison[label as string]}</td>
                  <td className="p-4 text-gray-400">{spark}</td>
                  <td className="p-4 text-gray-400">{ember}</td>
                  <td className="p-4 text-gray-400">{anvil}</td>
                  <td className="p-4 text-gray-400">{forge}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-8">
            <p className="text-gray-300 mb-3">{data.comparison.needAi}</p>
            <Link href={localePath('/ai-consulting')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{data.comparison.exploreAi} →</Link>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectPackages.map(({ id, data: pkg, href }) => (
            <div key={id} id={id} className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8 scroll-mt-20">
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{pkg.name}</h2>
              <p className="text-forge-ember font-semibold mb-2">{pkg.subtitle}</p>
              <p className="text-2xl font-bold text-white mb-2">{pkg.launchPrice}</p>
              {'paymentTerms' in pkg && pkg.paymentTerms ? <p className="text-xs text-gray-500 mb-2">{pkg.paymentTerms}</p> : null}
              {'delivery' in pkg ? <p className="text-sm text-gray-400 mb-4">{data.comparison.delivery}: {pkg.delivery}</p> : null}
              <p className="text-gray-300 mb-6">{pkg.description}</p>

              {'whatsIncluded' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.whatsIncluded}</h3>
                  <ul className="space-y-2 text-gray-400 mb-5">
                    {Object.keys(pkg).filter((key) => key.startsWith('included')).map((key) => <li key={key}>• {pkg[key]}</li>)}
                  </ul>
                </>
              ) : null}

              {'covers' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.covers}</h3>
                  <ul className="space-y-2 text-gray-400 mb-5">
                    {Object.keys(pkg).filter((key) => key !== 'covers' && key.startsWith('cover')).map((key) => <li key={key}>• {pkg[key]}</li>)}
                  </ul>
                </>
              ) : null}

              {'priceNote' in pkg && pkg.priceNote ? <p className="text-sm text-gray-500 mb-5">{pkg.priceNote}</p> : null}
              {'hearthstoneUpsell' in pkg && pkg.hearthstoneUpsell ? <p className="text-sm text-forge-gold mb-5">{pkg.hearthstoneUpsell}</p> : null}

              <Link href={href} className="btn-primary">{pkg.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8 md:p-10">
            <div className="max-w-3xl mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-3">{data.discoveryWorkshop.heading}</h2>
              <p className="text-forge-ember font-semibold mb-2">{data.discoveryWorkshop.subheading}</p>
              <p className="text-2xl font-bold text-white mb-4">{data.discoveryWorkshop.price}</p>
              <p className="text-gray-300">{data.discoveryWorkshop.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-400">
              {[data.discoveryWorkshop.deliverable1, data.discoveryWorkshop.deliverable2, data.discoveryWorkshop.deliverable3, data.discoveryWorkshop.deliverable4].map((item) => (
                <div key={item} className="rounded-lg border border-forge-ember/20 bg-forge-dark p-4">• {item}</div>
              ))}
            </div>
            <p className="text-sm text-forge-gold mb-6">{data.discoveryWorkshop.creditNote}</p>
            <Link href={localePath('/contact')} className="btn-primary">{data.discoveryWorkshop.cta}</Link>
          </div>
        </div>
      </section>

      <section id="hearthstone" className="section-py border-b border-forge-ember/20 scroll-mt-20">
        <div className="container-custom max-w-6xl">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8 md:p-10">
            <div className="max-w-3xl mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-3">{data.hearthstone.name}</h2>
              <p className="text-forge-ember font-semibold mb-2">{data.hearthstone.subtitle}</p>
              <p className="text-2xl font-bold text-white mb-4">{data.hearthstone.launchPrice}</p>
              {data.hearthstone.paymentTerms && <p className="text-xs text-gray-500 mb-3">{data.hearthstone.paymentTerms}</p>}
              <p className="text-gray-300">{data.hearthstone.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {retainers.map((tier: any) => (
                <div key={tier.name} className="rounded-xl border border-forge-ember/20 bg-forge-dark p-6">
                  <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">{tier.name}</h3>
                  <p className="text-xl font-semibold text-white mb-3">{tier.price}</p>
                  <p className="text-gray-300 mb-4">{tier.description}</p>
                  <ul className="space-y-2 text-gray-400">
                    {Object.keys(tier).filter((key) => key.startsWith('includes')).map((key) => <li key={key}>• {tier[key]}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-forge-gold mb-2">{data.hearthstone.annualNote}</p>
            <p className="text-sm text-gray-400 mb-6">{data.hearthstone.switchNote}</p>
            <Link href={localePath('/contact')} className="btn-primary">{data.hearthstone.cta}</Link>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-6">{data.payment.heading}</h2>
            {[data.payment.fixedPrice, data.payment.hourly, data.payment.retainers, data.payment.methods].map((item: any) => (
              <div key={item.title} className="mb-4">
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">{data.notIncluded.heading}</h2>
            <p className="text-gray-300 mb-4">{data.notIncluded.subheading}</p>
            <ul className="space-y-2 text-gray-400">{['item1','item2','item3','item4','item5','item6'].map((key) => <li key={key}>• {data.notIncluded[key]}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.faq.heading}</h2>
          <div className="space-y-6">{faqItems.map((faq: any) => <div key={faq.q} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6"><h3 className="font-semibold text-white mb-2">{faq.q}</h3><p className="text-gray-400">{faq.a}</p></div>)}</div>
          <div className="text-center mt-8"><p className="text-gray-300 mb-3">{data.faq.stillHaveQuestions}</p><Link href={localePath('/contact')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{data.faq.talkToUs} →</Link></div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.footerCta.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{data.footerCta.subheading}</p>
          <Link href={localePath('/contact')} className="btn-primary">{data.footerCta.button}</Link>
        </div>
      </section>
    </div>
  )
}
